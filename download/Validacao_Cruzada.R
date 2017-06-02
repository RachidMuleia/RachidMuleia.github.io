
#================================validacao cruzada=============================================

library(sp)
library(gstat)
data("meuse")
head(meuse)
lead_zinc.df=meuse[, c(1,2,5,6)]
head(lead_zinc.df)

choose100 <- sample(1:155, 100)
part_model <- lead_zinc.df[choose100, ]
part_valid <- lead_zinc.df[-choose100, ]

g =gstat(id="log_lead", formula = log(lead)~1, locations = ~x+y,
         data=part_model) # criar um objecto da class gstat

q=variogram(g) # calcula o semivariograma experiemntal
plot(q)  # representacao grafica do semivariograma experimental

max(q$gamma)
v.fit <- fit.variogram(q, vgm(1, "Sph", 800, 1))
v.fit1<- fit.variogram(q, model=vgm(psill=1, "Sph", 800, range = 1) ,fit.sills = TRUE,fit.ranges = TRUE)
plot(q, v.fit) # representacao do semivaiograma teorico junto ao semivariograma experimental

part_valid_pr <- krige(id="log_lead", log(lead)~1, locations=~x+y,
                       model=v.fit, data=part_model, newdata=part_valid)

#Agora que temos as estimativas da krigagem, vamos calcular 
#as diferencas entre os valores previstos e observados

difference <- log(part_valid$lead) - part_valid_pr$log_lead.pred
summary(difference)
mean(difference)
mean(difference^2)
mean(difference^2/part_valid_pr$log_lead.var)
cor(part_valid_pr$log_lead.pred,log(part_valid$lead))

windows()
plot(part_valid_pr$log_lead.pred~log(part_valid$lead), xlab="valores observados", ylab="valores previstos")


cv_pr <- krige.cv(log(lead)~1, data=lead_zinc.df, locations=~x+y,
                  model=v.fit, nfold=nrow(lead_zinc.df))

summary(cv_pr)