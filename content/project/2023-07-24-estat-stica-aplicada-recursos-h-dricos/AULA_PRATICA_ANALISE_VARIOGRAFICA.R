
#################################### AULA PRATICA ############################################################
#install.packages('sp',dependencies = TRUE)
#install.packages('geoR', dependencies = TRUE)

library(sp)
library(geoR)

data(meuse)

View(meuse)

summary(meuse$cadmium)

# ANALISAR A CONTINUIDADE ESPACIAL DA VARIAVEL CADMIUM 
# CALCULAR O VARIOGRAMA EXPERIMENTAL 
head(meuse)

cad_geo <- as.geodata(meuse, coords.col = c(1,2), data.col = 3)
summary(cad_geo)

variog_cad <- variog(cad_geo, max.dist = 4440.76435 /2) #VERIFIQUE OUTROS METODOS DE ESTIMACAO. MQP

plot(variog_cad)

# AJUSTAR O MODELO DE SEMIVARIOGRAMA
ini.cov = expand.grid(seq(5,15, 2),seq(500,2000,50))
cad_sph <- variofit(variog_cad, ini.cov.pars = ini.cov, cov.model = 'spherical')
cad_sph

cad_sph1<- variofit(variog_cad, ini.cov.pars = c(15,1000), cov.model = 'spherical')
cad_sph1
# VISUALIZAR O VARIOGRAMA EXPERIMENTAL E O VARIOGRAMA TEORICO
plot(variog_cad) # variograma experimental
lines(cad_sph)   # variograma teorico

# pode ver outros modelos teoricos de semivariograma 
## help(cov.spatial) para mais detalhes de varios modelos teoricos

cad_exp <- variofit(variog_cad, ini.cov.pars = ini.cov, cov.model = 'exponential')
cad_exp

cad_gauss <- variofit(variog_cad, ini.cov.pars = ini.cov, cov.model = 'gauss')
cad_gauss

plot(variog_cad)
lines(cad_sph, col = 'red')
lines(cad_exp, col= 'darkgreen')
lines(cad_gauss, col ='blue')
legend('bottomrigh', legend = c('Esferico', 'Exponencial', 'Gaussiano'), col =c('red', 'darkgreen', 'blue'), lty = c(1,1,1))


help("cov.spatial")

# ESTUDAR A PRESENÇA DE ANISOTROPIA

cad_aniso_vario <- variog4(cad_geo, max.dist = 4440.76435 /2)
par(mfrow = c(2,2))
plot(cad_aniso_vario[[1]])
plot(cad_aniso_vario[[2]])
plot(cad_aniso_vario[[3]])
plot(cad_aniso_vario[[4]])

plot(cad_aniso_vario)





# VAMOS AJUSTAR UM MODELO TEORICO EM CADA UMA DAS DIRECCOES
model1 <- variofit(cad_aniso_vario[[1]], ini.cov.pars = c(20, 1500), cov.model = 'spherical' )
model1

plot(cad_aniso_vario[[1]])
lines(model1)
#model12 <- variofit(cad_aniso_vario[[1]], ini.cov.pars = c(20, 1500), cov.model = 'exponential' )
#model12

model2 <- variofit(cad_aniso_vario[[2]], ini.cov.pars = c(10, 1500), cov.model = 'spherical' )
model2

model3 <- variofit(cad_aniso_vario[[3]], ini.cov.pars = c(19, 1500), cov.model = 'spherical' )
model3

model4 <- variofit(cad_aniso_vario[[4]], ini.cov.pars = c(19, 1500), cov.model = 'spherical' )
model4


# COMO CORRIGIR ANISOTROPIA
new_coords <- coords.aniso(meuse[,c(1,2)], aniso.pars = c(0, 2049.8164/828.8744 ))

meuse_new <- cbind(meuse, new_coords)
View(meuse_new)
meuse_new_geo <- as.geodata(meuse_new, coords.col = c(15,16), data.col = 3)
summary(meuse_new_geo)
cad_var_anis <- variog(meuse_new_geo, max.dist = 3014.64350/2 )
#cad_var_anis1 <- variog4(meuse_new_geo, max.dist = 3014.64350/2 )
plot(cad_var_anis)
cad_anis<- variofit(cad_var_anis, cov.model = 'spherical', ini.cov.pars = c(15,1000))
cad_anis
plot(cad_var_anis)
lines(cad_anis)


## deviamos ter iniciado com a verificação da normalidade dos dados
hist(meuse$cadmium)
hist(log(meuse$cadmium))

# ao transformar-se nota-se que os dados segue um padrão normal

meuse_data <- meuse
meuse_data$log_cad <- log(meuse_data$cadmium)
View(meuse_data)
cad_log <- as.geodata(meuse_data, coords.col = c(1,2), data.col = 15)
summary(cad_log)

cad_log_var <- variog(cad_log, max.dist = 4440.76435/2)
plot(cad_log_var)

cad_log_var1 <- variog4(cad_log, max.dist = 4440.76435/2)
plot(cad_log_var1)

variofit(cad_log_var1[[1]] ,ini.cov.pars = c(2.4,1000), cov.model = 'spherical')
variofit(cad_log_var1[[2]] ,ini.cov.pars = c(2.4,1000), cov.model = 'spherical')
variofit(cad_log_var1[[3]] ,ini.cov.pars = c(2.4,1000), cov.model = 'spherical')
variofit(cad_log_var1[[4]] ,ini.cov.pars = c(2.4,1000), cov.model = 'spherical')


# REPETIR O MESMO EXERCICIO PARA AS VARIAVEIS CHUMBO, COBRE E ZINCO.








