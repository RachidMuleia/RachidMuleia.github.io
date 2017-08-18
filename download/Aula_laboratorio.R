
setwd("C:\\Users\\1334998\\Documents\\Analise de Dados")
rm(list=ls())
#==============================iris data set================================================
 data(iris)
 
base_de_dados=read.table("BasedeDados.txt", header=TRUE, sep="\t")

View(base_de_dados)
# ====================vamos dar uma olhada nos dados

   dim(iris) #primeiro saber quantas linhas e colunas a base de dados tem
   str(iris) # este comando eh mais informativo pois nao so nos informa sobre o nr de variaveis como tambem o tipo 

#==================extraindo o nome das variavies=============================================

   names(iris) # permite nos saber sobre os nomes da variaveis 
   colnames(iris) #tambem nos informa sobre o nome das variaveis

   names(iris)=c("cump.sepala", "largura.sepala","cump.petala", "largura.petala", "especie")
#==================Observando algumas linhas da base dados===================================

   head(iris) # imprime as 6 primeiras linhas da base de dados   iris[1:6, ] # tambem podemos imprir as 6 primeiras linhas desta maneira
   iris[1:6,]
   tail(iris)  # temos as seis ultimas linhas da base de dados================================
   iris[1:10, "Sepal.Length"] ; iris[1:10, 1] #vamos observar apenas para uma variavel

#===============Sumarizando os dados=========================================================
    summary(iris) # podemos ter uma impressao geral de todos os dados
    summary(iris$Sepal.Length)
    summary(iris[, c(1,2)]) # tambem podemos sumarizar para algumas variaveis especificas

# para alem do comando summary() podemos calcular medidas descritivas com 
# base nos comandos, mean(), median(), range(), max(), min(), e quantile()

   range(iris$Sepal.Length) # calcula a amplitude dos dados

    quantile(iris$Sepal.Length)

    quantile(iris$Sepal.Length, probs = c(0.1, 0.3, 0.65))

# podemos calcular a dispersao dos dados usando o comando var() ou sd()

    var(iris$Sepal.Length); sd(iris$Sepal.Length)
     sd(iris$Sepal.Length)/mean(iris$Sepal.Length)
  
 #tambem podemos ter uma ideia sobre a dispersao dos dados usando o histograma
windows()
hist(iris$Sepal.Length, breaks=20)
plot(density(iris$Sepal.Length))
dev.off()


#====================diagrama circular e grafico de barras =================================

table(iris$Species)
pie(table(iris$Species))

barplot(table(iris$Species))


# ===============================Analisando varias variaveis===============================

cov(iris$Sepal.Length, iris$Petal.Length) # covariancia entre duas variaveis
cor(iris$Sepal.Length, iris$Petal.Length) # correlacao entre duas variaveis 

# podemos tambem calcular a matriz das correlacaoes 
cor(iris[, 1:4])


# Calcular as medidas descritivas por categoria de uma variavel
# a funca aggregate() devide a base de dados em subgrupos e calcula
# as medidas sumarias para cada grupo
aggregate(Sepal.Length~Species, summary, data=iris) 

aggregate(Sepal.Length~Species, mean, data=iris) 




#======================boxplot============================================================
windows()
boxplot(iris$Sepal.Length)

boxplot(iris$Sepal.Length~iris$Species) 
#tambem podemos construir um boxplot usando o comando plot, ja tinhas visto como fazer
dev.off()
#======================Diagrama de dispersao===============================================

windows()
pdf("sequeira.pdf")
#png("chefe.png")
#plot(iris$Sepal.Length, iris$Sepal.Width, col=iris$Species, pch=as.numeric(iris$Species))
plot(iris$Sepal.Length, iris$Sepal.Width, col=iris$Species, pch=as.numeric(iris$Species),lwd=c(2,2,2))
legend(6.5, 4.5, legend=c('setosa','versicolor','virginica'), pch=c(1,2,3), col=c(1,2,3), lwd=c(2,2,2))
graphics.off()
windows()
png("subchefe.png")
par(mfrow=c(2,2))
plot(iris$Sepal.Length, iris$Sepal.Width, col=iris$Species, pch=as.numeric(iris$Species),lwd=c(2,2,2))
with(iris, plot(Sepal.Length,Sepal.Width,col=Species, pch=as.numeric(Species),lwd=c(2,2,2)))
plot(iris$Sepal.Length, iris$Sepal.Width, col=iris$Species, pch=as.numeric(iris$Species),lwd=c(2,2,2))
with(iris, plot(Sepal.Length,Sepal.Width,col=Species, pch=as.numeric(Species),lwd=c(2,2,2)))
graphics.off()




#===================================outliers=======================================

# para identificar outliers podemos usar o boxplot, assim como a amplitude interquartil
aiq=quantile(iris$Sepal.Length)[4]-quantile(iris$Sepal.Length)[2]

out.moder1=1.5*aiq+quantile(iris$Sepal.Length)[4]
out.moder2=quantile(iris$Sepal.Length)[2]-1.5*aiq
which(iris$Sepal.Length<out.moder2)


