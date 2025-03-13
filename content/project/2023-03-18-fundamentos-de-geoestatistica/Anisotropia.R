
#---------------------------- ANISOTROPIA -----------------------------------

#install.packages("geoR")
library(geoR)
path <- "/Users/rachidmuleia/Dropbox/File requests/EXAME_ISCISA_2021/Fotos/ISCISA/Geostatistics Class Material/Lecture notes"
ph_df <- read.table(paste(path, 'ph_data.txt',sep='/'), sep="",header=TRUE)

head(ph_df)

ph_geo=as.geodata(ph_df,coords.col=c(2,1),data.col=3)

# verficar o comportamento do semivariograma em varias direccoes 
var1 <- variog(ph_geo,uvec = seq(0,120,l=10),messages = FALSE, direction=pi/2)
var2 <- variog(ph_geo,uvec = seq(0,120,l=10),messages = FALSE, direction=pi/2.57)
var3 <- variog(ph_geo,uvec = seq(0,120,l=10),messages = FALSE, direction=pi/3.6)
var4 <- variog(ph_geo,uvec = seq(0,120,l=10),messages = FALSE, direction=pi/6)
var5 <- variog(ph_geo,uvec = seq(0,120,l=10),messages = FALSE, direction=pi/18)
var6 <- variog(ph_geo,uvec = seq(0,120,l=10),messages = FALSE, direction=0.944*pi)

par(mfrow =c(2,3))
plot(var1) ; plot(var2) ; plot(var3); plot(var4); plot(var5); plot(var6) 


# vamos ver qual é o comportamento das estimativas dos parametros, considerando o modelo exponencial
fit1 <- variofit(var1,cov.model="exponential",ini.cov.pars=c(0.23,60),
              fix.nugget=FALSE,nugget=0.02,weights='npairs',messages=FALSE)
fit2 <- variofit(var2,cov.model="exponential",ini.cov.pars=c(0.23,60),
              fix.nugget=FALSE,nugget=0.02,weights='npairs',messages=FALSE)
fit3 <- variofit(var3,cov.model="exponential",ini.cov.pars=c(0.23,60),
              fix.nugget=FALSE,nugget=0.02,weights='npairs',messages=FALSE)
fit4 <- variofit(var4,cov.model="exponential",ini.cov.pars=c(0.23,60),
              fix.nugget=FALSE,nugget=0.02,weights='npairs',messages=FALSE)
fit5 <- variofit(var5,cov.model="exponential",ini.cov.pars=c(0.23,60),
              fix.nugget=FALSE,nugget=0.02,weights='npairs',messages=FALSE)
fit6 <- variofit(var6,cov.model="exponential",ini.cov.pars=c(0.23,60),
              fix.nugget=FALSE,nugget=0.02,weights='npairs',messages=FALSE)
fit1
fit2
fit3
fit4
fit5
fit6
#---------------------------- Tendencia ----------------------------------------

plot(ph_df$northing, ph_df$ph)
plot(ph_df$easting, ph_df$ph)

trend <- lm(ph ~ easting + northing, data = ph_df)
summary(trend)

# vamos extrair os residuos

ph_df$res <- trend$residuals



# vamos avaliar o semivariograma usando os residuos 

ph_geo.res <- as.geodata(ph_df,coords.col = c(2,1),data.col = 5 )




var.res1 <- variog(ph_geo.res,uvec = seq(0,120,l=10),messages = FALSE, direction=pi/2)
var.res2 <- variog(ph_geo.res,uvec = seq(0,120,l=10),messages = FALSE, direction=pi/2.57)
var.res3 <- variog(ph_geo.res,uvec = seq(0,120,l=10),messages = FALSE, direction=pi/3.6)
var.res4 <- variog(ph_geo.res,uvec = seq(0,120,l=10),messages = FALSE, direction=pi/6)
var.res5 <- variog(ph_geo.res,uvec = seq(0,120,l=10),messages = FALSE, direction=pi/18)
var.res6 <- variog(ph_geo.res,uvec = seq(0,120,l=10),messages = FALSE, direction=0.944*pi)


par(mfrow =c(2,3))
plot(var.res1) ; plot(var.res2) ; plot(var.res3); plot(var.res4); plot(var.res5); plot(var.res6) 



fit.res1 <- variofit(var.res1,cov.model="spherical",ini.cov.pars=c(0.15,60),
                 fix.nugget=FALSE,nugget=0.02,weights='npairs',messages=FALSE)
fit.res2 <- variofit(var.res2,cov.model="spherical",ini.cov.pars=c(0.15,60),
                 fix.nugget=FALSE,nugget=0.02,weights='npairs',messages=FALSE)
fit.res3 <- variofit(var.res3,cov.model="spherical",ini.cov.pars=c(0.15,60),
                 fix.nugget=FALSE,nugget=0.02,weights='npairs',messages=FALSE)
fit.res4 <- variofit(var.res4,cov.model="spherical",ini.cov.pars=c(0.15,60),
                 fix.nugget=FALSE,nugget=0.02,weights='npairs',messages=FALSE)
fit.res5 <- variofit(var.res5,cov.model="spherical",ini.cov.pars=c(0.15,60),
                 fix.nugget=FALSE,nugget=0.02,weights='npairs',messages=FALSE)
fit.res6 <- variofit(var.res6,cov.model="spherical",ini.cov.pars=c(0.15,60),
                 fix.nugget=FALSE,nugget=0.02,weights='npairs',messages=FALSE)


fit.res1
fit.res2
fit.res3
fit.res4
fit.res5
fit.res6


# ---------------------- Como decidir sobre o melhor modelo de tendencia -------------------------

# tendencia linear
var_trend <- variog(ph_geo,uvec = seq(0,120,l=10),messages = FALSE, direction=0.944*pi,trend ="1st")
fit_trend <- variofit(var_trend,cov.model="spherical",ini.cov.pars=c(0.23,60),
                      fix.nugget=FALSE,nugget=0.02,weights='npairs',messages=FALSE)

# tendencia quadratica 
var_trend.quadra <- variog(ph_geo,uvec = seq(0,120,l=10),messages = FALSE, direction=0.944*pi,trend ="2nd")
fit_trend.quadra <- variofit(var_trend.quadra,cov.model="spherical",ini.cov.pars=c(0.23,60),
                          fix.nugget=FALSE,nugget=0.02,weights='npairs',messages=FALSE)








