




####################################################################################################
################################# VISUALIZACAO DE DADOS ############################################
####################################################################################################

x <- c(21, 62, 10, 53)

labels <- c("London", "New York", "Singapore","Mumbai")

pie(x, labels, col=c('red', 'blue', 'green', 'yellow'))
pie(x, labels, col=rainbow(4))



# grafico circular


labels <- c("London","New York","Singapore","Mumbai")

piepercent<- round(100*x/sum(x), 1) # percentagem para cada categoria

pie(x, labels = piepercent,col =rainbow(length(x)))

legend("bottomleft", legend = labels ,cex = 0.5, fill = rainbow(length(x)))


## Grafico de barras

H <- c(7,12,28,3,41)
label <- c('Antonio', 'Alberto', 'Joao', 'Maria', 'Marta')
barplot(H, names.arg = label , col='blue') # cor unica
barplot(H, names.arg = label , col=rainbow(5))
barplot(H, names.arg = label , col=rainbow(5), xlab='Nome', ylab='Idade')

barplot(H, names.arg = label , col=rainbow(5), xlab='Nome', ylab='Idade', horiz = TRUE)

# grafico de barras sobrpostas
data("mtcars")
freq <- table(mtcars$am,mtcars$gear)
freq
barplot(freq, beside = TRUE, col=c('red', 'blue'))
legend("topright", legend= c('Manual', 'Automatico') ,cex = 0.8, fill = rainbow(length(x)))

barplot(freq, beside = TRUE, col=c('red', 'blue'), legend.text = c('Manual', 'Automatico'))






data("VADeaths")
cores <- c("brown4", "darkgoldenrod", "chocolate1","chartreuse4", "cornsilk")# definir as cores
barplot(VADeaths, col = cores, beside = TRUE,  main='Taxa de mortalidade') # gráfico de barras
# Acrescentar legenda
legend("topright", legend = rownames(VADeaths),fill = cores, box.lty = 0, cex = 0.8) # Acrescentar legenda
text(x=5, y=60, "(c)")


## Box plot 
data(iris)
boxplot(iris$Sepal.Length, col='red', horizontal = TRUE)

boxplot(iris$Sepal.Length~iris$Species, col='red', horizontal = TRUE)

boxplot(iris$Sepal.Length~iris$Species, col='red', horizontal = FALSE)

boxplot(iris$Sepal.Length~iris$Species, col=c('red', 'blue', 'green'), horizontal = FALSE,
        xlab='Especie', ylab='Comprimento sepala')\



# HISTOGRAMA


hist(iris$Sepal.Length, breaks =50, col='green', xlim = c(3, 10), main='Histograma', prob=TRUE, axes=FALSE)
dens<-density(iris$Sepal.Length)
lines(dens, col='blue', lwd=2, lty=2)
sim<-rnorm( 200,6, 1)
dens1<-density(sim)
lines(dens1, col='red', lwd=2,lty=1)
legend('topright', legend=c('real','simulado'), lwd=c(2,2), lty=c(2, 1), col=c('blue', 'red'))
axis(1)
axis(2)
#

# diagrama de dispersão

plot(iris$Sepal.Length, iris$Petal.Width, pch=16)

windows()
par(mfrow=c(2,3))
plot(iris$Sepal.Length, iris$Petal.Width, type = 'n')

points(iris$Sepal.Length[iris$Species=='versicolor'], iris$Petal.Width[iris$Species=='versicolor'], col='red', pch=0)
points(iris$Sepal.Length[iris$Species=='setosa'], iris$Petal.Width[iris$Species=='setosa'], col='blue', pch=2)
points(iris$Sepal.Length[iris$Species=='virginica'], iris$Petal.Width[iris$Species=='virginica'], col='black', pch=9)
#legend('bottomright', legend = c('versicolor', 'setosa', 'virginica'), col=c('red', 'blue', 'black'), pch=c(0,2,9))

legend(x=6.5, y=1, legend = c('versicolor', 'setosa', 'virginica'), col=c('red', 'blue', 'black'), pch=c(0,2,9))


barplot(table(mtcars$gear))

dev.off()


#plot(iris$Sepal.Length, iris$Petal.Width, type = 'n')
#cores<-c('blue', 'red', 'black')
#iris$Species<-as.character(iris$Species)
#for(i in unique(iris$Species)){
  #points(iris$Sepal.Length[iris$Species==i], iris$Petal.Width[iris$Species==i])
#}





# SALVAR GRAFICOS/IMAGENS
setwd('C:/Users/Rachid/Dropbox/Analise de Dados DMI/Slides Aulas')
png('meu_grafico.png', width = 600, height = 700)

barplot(table(mtcars$gear))

dev.off()




# Grafico de linhas
windows()
plot(malaria_df$tmax_mov, type='n', ylim = c(15, 37))
lines(malaria_df$tmax_mov, col='red')
lines(malaria_df$tmin_mov, col='blue')
legend(x=100,y=35, legend = c('Tmax', 'Tmin'), col=c('red', 'blue'), lty=c(1,1))
