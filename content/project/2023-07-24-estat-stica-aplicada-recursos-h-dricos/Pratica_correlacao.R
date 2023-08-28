install.packages('sp')
library(sp)
data("meuse")
View(meuse)
#cor(meuse$copper,meuse$zinc, method ='spearman')

plot(meuse$copper, meuse$zinc)

plot(meuse$copper,meuse$zinc)

cor(meuse$copper, meuse$zinc)

view(meuse[, c('copper', 'zinc')])

by(meuse[, c('copper', 'zinc')], meuse$soil, cor)


# valores extremos 

boxplot(meuse$copper)

extremos<-boxplot(meuse$copper)$out

meuse1<- meuse[-which(meuse$copper %in% extremos), ]

plot( meuse$dist, meuse$copper, col=meuse$soil)
cor(meuse$copper, meuse$dist)
cor(meuse$copper, meuse$dist, method = 'spearman')



# testar se a correlacao é estatisticamente significativa

cor.test(meuse$copper,meuse$zinc)

View(meuse1)

cor(meuse1$copper, meuse1$zinc)

hist(meuse$copper)
hist(meuse$zinc)

plot(meuse$copper, meuse$zinc)
cor(meuse$copper, meuse$zinc)
by(meuse[, c('copper', 'zinc')], meuse$soil, cor)


outlier <- boxplot(meuse$copper)$out 

meuse[meuse$copper,]

meuse1 <- meuse[-which(meuse$copper %in% outlier ), ]

cor(meuse1$copper, meuse1$zinc, method = 'spearman')
by(meuse1[, c('copper', 'zinc')], meuse1$soil, cor, method ='spearman')




#================================ ANALISE DE REGRESSAO =====================================================

plot( meuse$lead, meuse$copper)
cor(meuse$copper,meuse$lead)

# y= a+bx

# declive = coeficiente X sy/sx
# intercepto = mediay- declive*mediax

b<- 0.8183069* sd(meuse$copper)/sd(meuse$zinc)
b
a <- mean(meuse$copper)-b*mean(meuse$zinc)
a

valores_previsto <- a+b*meuse$zinc
valores_previsto

plot(meuse$zinc, meuse$copper)
#lines(valores_previsto
abline(a=a, b=b, col='red')


model1<-lm(meuse$copper ~ meuse$zinc)
summary(model1)

cor(meuse$copper,meuse$zinc)^2*100


plot(meuse$x,meuse$y)


plot(meuse$dist, log(meuse$copper))

model2<-lm(meuse$copper~meuse$dist)

model3<-lm(log(meuse$copper)~meuse$dist)

summary(model3)
summary(model2)


















setwd('C:/Users/Rachid/Dropbox/MESTRADO EM GEOHIDROLOGIA/ProbEstatistica/ProbEstatistica')


x <- runif(500, 0,1)
y<-x

png('relacao_funcional.png', width = 600, height = 600)
par(mfrow = c(2,2))
plot(x,y, pch=16)
y<-(x-0.5)^2
plot(x,y)

y<- 0.5*sin(2*pi*x)+0.5

plot(x,y)

y<- 1.5*exp(2*x)
plot(x,y)

dev.off()




png('relacao_estatistica.png', width = 600, height = 600)
par(mfrow = c(2,2))
y<-x+rnorm(length(x), 0.1 ,0.1)

plot(x,y, pch=16)
y<-(x-0.5)^2+rnorm(length(x), 0.1 ,0.1)
plot(x,y,pch=16)

y<- 0.5*sin(2*pi*x)+0.5+rnorm(length(x), 0.1 ,0.1)

plot(x,y,pch=16)

y<- 1.5*exp(2*x)+rnorm(length(x), 0.1 ,0.1)
plot(x,y,pch=16)

dev.off()
