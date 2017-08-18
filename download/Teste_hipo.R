
install.packages("car")
library(car)
#======================================TESTES DE HIPOTESES============================================
data(iris)
head(iris)
summary(iris)

#suponha que queira testar a hipotese de que o comprimento medio das sepalas \'e igaul 6
#O teste T para uma amostra pressupoe que a nossa amostra vem de uma populacao com distribuicao
# normal

hist(iris$Sepal.Length, breaks=20)
qqnorm(iris$Sepal.Length)
qqline(iris$Sepal.Length, col="red")
shapiro.test(iris$Sepal.Length) # teste de normalidade

t.test(iris$Sepal.Length, mu=6) # teste bilateral 
t.test(iris$Sepal.Length, mu=6, alternative = "less" )


#=======================TESTE T PARA DUAS AMOSTRAS INDEPENTES =================================
set_ver=iris[iris$Species!="virginica",]
set_ver$Species=factor(set_ver$Species)

View(set_ver)
summary(set_ver)
boxplot(set_ver$Sepal.Length~set_ver$Species)

setosa.leng=iris$Sepal.Length[iris$Species=="setosa"]
versicolor.leng=iris$Sepal.Length[iris$Species=="versicolor"]

set_ver=iris[iris$Species!="virginica",]
set_ver$Species=factor(set_ver$Species) # para nao gaurdar os factor levels anteriores

boxplot(set_ver$Sepal.Length~set_ver$Species)
hist(setosa.leng)
hist(versicolor.leng)
qqnorm(setosa.leng)
qqline(setosa.leng, col="red")

qqnorm(versicolor.leng)
qqline(versicolor.leng, col="red")
shapiro.test(setosa.leng)
shapiro.test(versicolor.leng)

leveneTest(set_ver$Sepal.Length, set_ver$Species) #Teste de homogeniedade das variancias

t.test(setosa.leng, versicolor.leng, var.equal = TRUE)

#=============================Teste T para amostras emparelhadas=================================

a = c(12.9, 13.5, 12.8, 15.6, 17.2, 19.2, 12.6, 15.3, 14.4, 11.3)
b = c(12.7, 13.6, 12.0, 15.2, 16.8, 20.0, 12.0, 15.9, 16.0, 11.1)

diff=a-b
hist(diff)
qqnorm(diff)
qqline(diff, col='red')

t.test(a,b, paired=TRUE)

t.test(a,b, paired=TRUE, alt="less")


#=====================================Comparacao de proporcoes================================

library(MASS)
data(quine)
head(quine)
table(quine$Sex)
# intervalo de confianca 
prop.test(66,dim(quine)[1], p=0.5, correct=FALSE) #teste de hipotese para a proporcao uma amostra
binom.test(66,dim(quine)[1], p=0.5)  #teste exacto para a proporcao

table(quine$Eth, quine$Sex)
prop.test(table(quine$Eth, quine$Sex), correct=FALSE) 


#=====================================ANOVA===============================================
boxplot(iris$Sepal.Length~iris$Species)

#verificar o pressuposto da normalidade
qqnorm(iris$Sepal.Length)
qqline(iris$Sepal.Length, col="red")
shapiro.test(iris$Sepal.Length)
windows()
par(mfrow=c(3,1))
qqnorm(iris$Sepal.Length[iris$Species=="setosa"])
qqline(iris$Sepal.Length[iris$Species=="setosa"], col="red")
qqnorm(iris$Sepal.Length[iris$Species=="versicolor"])
qqline(iris$Sepal.Length[iris$Species=="versicolor"], col="red")
qqnorm(iris$Sepal.Length[iris$Species=="virginica"])
qqline(iris$Sepal.Length[iris$Species=="virginica"], col="red")

leveneTest(iris$Sepal.Length, iris$Species)  # O teste de anova \'e robusto  aviolacao do pressuposta da normalidade quando os grupos tem tamnhos iguais


leveneTest(iris$Sepal.Length~iris$Species)


ano.leng=aov(iris$Sepal.Length~iris$Species)
summary(ano.leng)
post-hoc analysis 
TukeyHSD(ano.leng)

install.packages("agricolae")
library(agricolae)
#=========================Correlation===================================================
dev.off()
with(iris, plot(Sepal.Length, Petal.Width))
with(iris, cor(Sepal.Length, Petal.Width))
with(iris, cor.test(Sepal.Length, Petal.Width)) #testango a hipotese de significancia da correlacao

scheffe.test()
