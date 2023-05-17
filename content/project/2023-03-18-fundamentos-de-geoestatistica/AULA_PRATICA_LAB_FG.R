
#install.packages('geoR')

library(geoR)
a1 <- read.table("http://www.stat.ucla.edu/~nchristo/statistics_c173_c273/o3.txt", header=T)

head(a1)
str(a1)


# ANALISE EXPLORATÓRIA

summary(a1$o3)
sd(a1$o3)

# coeficiente de variacao
(sd(a1$o3)/mean(a1$o3))*100

# O Sugere distribuicao normal dos dados
hist(a1$o3,breaks = 13,main = NULL, xlab = 'Concentração de ozono')
dens <- density(a1$o3)
lines(dens)

# verificar presenca de outliers 
boxplot(a1$o3)


qqnorm(a1$o3)
qqline(a1$o3,col = 'red')
#abline(a = 1, b =2)



# Analise da continuidade espacial 

geo_data_o3 <- as.geodata(a1, coords.col =c(4,3), data.col = 5 ) # criar um objecto espacial

summary(geo_data_o3) # verificar a estrutura do objecto espacial 


var_plot <- variog(geo_data_o3, coords = geo_data_o3$coords, estimator.type = 'classical')

var_plot1 <- variog(geo_data_o3, coords = geo_data_o3$coords, estimator.type = 'modulus')


#plot(var_plot$u, var_plot$v, ylim=c(0, 0.001))
plot(var_plot, col='blue', ylim=c(0, 0.001))
lines(var_plot, col = 'blue')
lines(var_plot1, col='red')
#plot(var_plot1)

# ajustamento do modelo do semivariogram
model1 <- variofit(var_plot,
                  ini.cov.pars = c(0.0004 ,2 ), 
                  nugget = 0,fix.nugget = FALSE, 
                  cov.model = 'linear')

model2 <- variofit(var_plot,
                  ini.cov.pars = c(0.0004 ,2 ), 
                  nugget = 0,
                  cov.model = 'exponential')


model3 <- variofit(var_plot,
                  ini.cov.pars = c(0.0004 ,2 ), 
                  nugget = 0,
                  cov.model = 'gaussian')

model4 <- variofit(var_plot,
                  ini.cov.pars = c(0.0004 ,2 ), 
                  nugget = 0,
                  cov.model = 'spherical')

model5 <- variofit(var_plot,
                  ini.cov.pars = c(0.0004 ,2), 
                  nugget = 0,
                  cov.model = 'matern')


model6 <- variofit(var_plot,
                  ini.cov.pars = c(0.0004 ,2), 
                  nugget = 0,
                  cov.model = 'wave')

model7 <- variofit(var_plot,
                  ini.cov.pars = c(0.0004 ,2), 
                  nugget = 0,
                  cov.model = 'cubic')



# visualizaçao do semivariograma

var_fit=list(model1,model2,model3,model4,model5, model6,model7)
plot(var_plot)
for(i in 1:7){
lines(var_fit[[i]],lty=i,col=i, lwd=2)
}
#legend('bottomright',legend = c('linear','exponecial', 'gaussiano',
#'esperico','matern'), lty=1:5,col=1:5)



# verificar anisotrpia nos dados 


var_plot1 <- variog(geo_data_o3, coords = geo_data_o3$coords,direction = pi/2)

var_plot2 <- variog(geo_data_o3, coords = geo_data_o3$coords,direction = pi/4)

var_plot3 <- variog(geo_data_o3, coords = geo_data_o3$coords,direction = pi/6)
par(mfrow = c(1,3))
plot(var_plot1,ylim = c(0, 0.0017))

plot(var_plot2,ylim = c(0, 0.0017))
plot(var_plot3,ylim = c(0, 0.0017))
