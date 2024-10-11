######################################################################
###                        AULA PRATICA                            ###
### TEMA: ANALISE EXPLORATÓRIA E TESTES DE HIPOTESES               ###
######################################################################



data("iris") # chamar a base de dados IRIS para o ambiente de trabalho

dim(iris) # quantas observacoes existem 
str(iris) # nr de observacoes e de variaveis 

View(iris) # visualizar os dados
head(iris, n = 10) # mostra as primeiras 6 linhas
tail(iris,n = 10)

summary(iris) # algumas estatísticas descritivas 

sd(iris$Sepal.Length) # desvio padrao 


# coeficiente de variacao

sd(iris$Sepal.Length)/mean(iris$Sepal.Length)
# medidas de assimetria 
install.packages('moments')
library(moments)
skewness(iris$Sepal.Length) # calcular o coeficiente de assimentria

# visualizacao de dados 
hist(iris$Sepal.Length) # histograma para uma variavel quantitativa
hist(iris$Sepal.Length, breaks = 20, main = NULL, xlim = c(3.5,8.1 )) # histograma para uma variavel quantitativa
hist(iris$Petal.Length, breaks = 20)
hist(iris$Sepal.Width, breaks = 20)

boxplot(iris$Sepal.Length) # box plot, mostra que os dados sao simetricos
boxplot(iris$Sepal.Width)



## teste de hipotese

# H0: media do comprimento das sepalas é 6.5
# H1: a media é diferente de 6.5

mean(iris$Sepal.Length)

t.test(iris$Sepal.Length, mu=6.5, alternative = 'two.sided') # test de hipotese bilateral


2*pt(-9.7124,df = 149 , lower.tail = TRUE) 
2*pnorm(-9.7124, lower.tail = TRUE)


cp_setosa <- iris$Sepal.Length[iris$Species == 'setosa']
cp_versicolor <- iris$Sepal.Length[iris$Species == 'versicolor']
t.test(cp_setosa, cp_versicolor, alternative = 'two.sided')


t.test(iris$Sepal.Length[iris$Species == 'setosa'], iris$Sepal.Length[iris$Species== 'versicolor'], alternative = 'two.sided')

# o test t assume que as amostra provem de uma populacao com distribuicao normal
# primeiro verifica a distribuicao


# teste informal
hist(iris$Sepal.Length[iris$Species == 'setosa'])
hist(iris$Sepal.Length[iris$Species == 'versicolor'])

# teste formal

shapiro.test(iris$Sepal.Length[iris$Species == 'versicolor'])
shapiro.test(iris$Sepal.Length[iris$Species == 'setosa'])



## teste de hipoteses para amostras emparelhada


# peso dos ratos antes do tratemento
before <- c(200.1, 190.9, 192.7, 213, 241.4, 196.9, 172.2, 185.5, 205.2, 193.7)
# peso dos ratos depois 
after <-c(392.9, 393.2, 345.1, 393, 434, 427.9, 422, 383.9, 392.3, 352.2)
# Create a data frame
my_data <- data.frame( 
                group = rep(c("before", "after"), each = 10),
                weight = c(before,  after)
                )

View(my_data)

# primeiro fazer uma inspecção visual
my_data$group <- relevel(factor(my_data$group), ref = 'before') # colocar a categoria before como referencia 
boxplot(my_data$weight~my_data$group)

# o teste t para amostras emparelhadas assume que as difencas seguem distribucao normal
shapiro.test(my_data$weight[my_data$group == 'before']) # segue distribuicao normal

with(my_data, t.test(weight ~ group, paired = TRUE))
2*pt(-20.883,df=9)# este é o valor de p



### ANALISE DE VARIANCIA

boxplot(iris$Sepal.Length~iris$Species) # o grafico sugere que existem diferencas nas medias do comprimento das sepalas
# o box plot sugere que os dados em cada grupo seguem distribuicao normal

reg <- lm(iris$Sepal.Length~iris$Species)
anova(reg)










