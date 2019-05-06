library(sp)
library(gstat)
library(lattice)
data("meuse")
head(meuse)

lead_zinc.df=meuse[, c(1,2,5,6)]
head(lead_zinc.df)
# antes de fazer krigagem precisamos de calcular algumas medidas sumarias.
stem(lead_zinc.df$lead)
boxplot(lead_zinc.df$lead)
hist(lead_zinc.df$lead)
stem(lead_zinc.df$zinc)
boxplot(lead_zinc.df$zinc)
hist(lead_zinc.df$zinc)
summary(lead_zinc.df)

# Os dados apresentam simetria a direita , é preciso transformar os dados.

log_lead <- log10(lead_zinc.df$lead)
log_zinc <- log10(lead_zinc.df$zinc)
stem(log_lead)
boxplot(log_lead)
hist(log_lead, breaks=20)
stem(log_zinc)


g <- gstat(id="log_lead", formula = log(lead)~1, locations = ~x+y,
           data =lead_zinc.df)

plot(variogram(g), main="Semivariogram da concentracao do chumbo")

#Ajustamento do variograma teorico ao variograma experimental
v.fit <- fit.variogram(variogram(g), vgm(0.5,"Sph",1000,0.1))
plot(variogram(g),v.fit)

#Para krigagar os valores de chumbo numa malha, primeiro devemos criar a malha
x.range <- as.integer(range(lead_zinc.df[,1]))
y.range <- as.integer(range(lead_zinc.df[,2]))

grd <- expand.grid(x=seq(from=x.range[1], to=x.range[2], by=50),
                   y=seq(from=y.range[1], to=y.range[2], by=50))
#Agora temos a malha criada o nosso objectivo \'e prever
#os valores de log(lead) sobre a malha
pr_ok <- krige(id="log_lead",log(lead)~1, locations=~x+y,
                 model=v.fit, data=lead_zinc.df, newdata=grd)

levelplot(pr_ok$log_lead.pred~x+y,pr_ok, aspect ="iso",
          main="Interpolacao por krigagem ordinaria")


#====================== Validação cruzda=========================================
# vamos dividir os dados em duas partes. 100 observações serão usadas para modelação 
# 55 serão usadas para previsão. 
choose100 <- sample(1:155, 100)
part_model <- lead_zinc.df[choose100, ]
part_valid <- lead_zinc.df[-choose100, ]

g=gstat(id="log_lead", formula = log(lead)~1, locations = ~x+y, data=part_model)
q=variogram(g) # calcula o semivariograma experiemntal
plot(q) # representacao grafica do semivariograma experimental

v.fit <- fit.variogram(q, vgm(1, "Sph", 800, 1))
plot(q, v.fit) # representacao do semivaiograma teorico junto ao semivariograma experimental

part_valid_pr= krige(id="log_lead",log(lead)~1, locations=~x+y,
               model=v.fit, data=part_model, newdata=part_valid[,c(1,2)])

difference <- log(part_valid$lead) - part_valid_pr$log_lead.pred
summary(difference)

mean(difference^2) #erro quadratico medio
mean(difference^2/part_valid_pr$log_lead.var) #erro quadratico medio padronizado
cor(part_valid_pr$log_lead.pred,log(part_valid$lead)) # correlacao entre valores

# Diagrama de dispersão: Valores observados versus previstos
plot(log(part_valid$lead),part_valid_pr$log_lead.pred, xlab="valores observados",
     ylab="valores previstos")


cv_pr <- krige.cv(log(lead)~1, data=lead_zinc.df, locations=~x+y,
                  model=v.fit, nfold=nrow(lead_zinc.df))
summary(cv_pr)

mean(cv_pr$residual^2)
mean(cv_pr$zscore^2)
cor(cv_pr$var1.pred, cv_pr$observed)
