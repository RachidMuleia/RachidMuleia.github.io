
#install.packages("geoR")
library(geoR)
library(rio)
path <- "/Users/rachidmuleia/Dropbox/File requests/EXAME_ISCISA_2021/Fotos/ISCISA/Geostatistics Class Material/Lecture notes"
setwd(path)
#ph_df <- import("ph_data.txt")
ph_df <- read.table("ph_data.", sep="",header=TRUE)

head(ph_df)

str(ph_df)

summary(ph_df$ph)

# northing corresponde a latitude 
# easting correspong a longitude 


ph_geo <- as.geodata(ph_df,coords.col=c(2,1),data.col=3)

summary(ph_geo) # informacoes sobre o objecto espacial 

# calcular o variogram experimental 

variogram_ph <- variog(ph_geo,max.dis=162)

variogram_ph

# u - vector de distancia 

#v - vector de semivariogram experimental para uma distancia u ( distancia h)

# n - numero de de pares separados por uma distancai u

#---------------- Visualizacao grafica do semivariograma estimado ---------------------
plot(x,y)
window()
plot(variogram_ph$u, variogram_ph$v, xlab = "distancia", ylab = "variograma ")



# ------------------- ajustamento do modelo teorico -------------------------------------

variogram_fit <- variofit(variogram_ph,
                          cov.model="spherical",
                          ini.cov.pars=c(0.23,60), # aqui especificamos a contribuicao/soleira parical e a amplitude
                          fix.nugget=FALSE,
                          nugget=0,
                          weights='equal', # Minimos quadrados ordinarios 
                          messages=FALSE)



variogram_fit1.sph <- variofit(variogram_ph,
                          cov.model="sph",
                          ini.cov.pars=c(0.23,60), # aqui especificamos a contribuicao/soleira parical e a amplitude
                          fix.nugget=FALSE,
                          nugget=0,
                          weights='npairs', # Minimos quadrados ordinarios PONDERADOS
                          messages=TRUE)


variogram_fit1.exp <- variofit(variogram_ph,
                               cov.model="exponential",
                               ini.cov.pars=c(0.23,60), # aqui especificamos a contribuicao/soleira parical e a amplitude
                               fix.nugget=FALSE,
                               nugget=0,
                               weights='npairs', # Minimos quadrados ordinarios PONDERADOS
                               messages=FALSE)


variogram_fit2 <- variofit(variogram_ph,
                           cov.model="sph",
                           ini.cov.pars=c(0.23,60), # aqui especificamos a contribuicao/soleira parical e a amplitude
                           fix.nugget=FALSE,
                           nugget=0,
                           weights='cressie', # Minimos quadrados ordinarios PONDERADOS de CRESSIE
                           messages=FALSE)











