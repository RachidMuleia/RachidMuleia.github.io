library(tidyverse)
library(sf)
library(rgdal)
library(rgeos)
library(fields)
library(shapefiles)
library(sp)
library(gstat)
library(geoR)
setwd('C:/Users/Rachid/Dropbox/MESTRADO EM GEOHIDROLOGIA/ProbEstatistica/ProbEstatistica')

list.files( pattern = '.txt')

ph_df <- read.table('ph_data.txt', header = TRUE , sep ='')
View(ph_df)

ph_geo <- as.geodata(ph_df, coords.col = c(2,1 ), data.col = 3)
windows()

plot(ph_geo)
plot(ph_df$easting, ph_df$northing)

# CRIAR POLIGONO APARTIR A VOLTA DAS COORDENADAS
# ESTAS FUNCOES SAO DA LIVRARIA sf
ph_poly <- ph_df |>
  st_as_sf(coords = c(2, 1)) |>
  summarize(geometry = st_union(geometry)) %>%
  st_convex_hull()
plot(ph_poly)

# SALVAR ESTE POLIGONO EM SHAPEFILE

st_write(ph_poly, "ph_shape.shp")


# AGORA VAMOS LER NOVAMENTE O SHAPEFILE QUE SALVAMOS 

ph_shape <- readOGR("ph_shape.shp")
plot(ph_shape )

shp2 <- gUnaryUnion(ph_shape)
plot(shp2)


# CRIAR A GRELHA PARA FAZER A INTERPOLACAO

# PRIMEIRO VAMOS EXTRAIR AS COORDENADAS O POLIGONO (SHAPEFILE) 
extractCoords <- function(sp.df)
{
results <- list()
for(i in 1:length(sp.df@polygons[[1]]@Polygons))
{
results[[i]] <- sp.df@polygons[[1]]@Polygons[[i]]@coords
}
results <- Reduce(rbind, results)
results
}

coord <- extractCoords(shp2)

plot.x <- seq(range(coord[,1])[1],range(coord[,1])[2],1)
plot.y <- seq(range(coord[,2])[1],range(coord[,2])[2],1)
x.pred <- expand.grid(plot.x, plot.y)[,1]
y.pred <- expand.grid(plot.x, plot.y)[,2]
pred.loc <- data.frame(cbind(x.pred,y.pred))
View(pred.loc)
pred.loc2 <- SpatialPoints(pred.loc)

point.in.polygon <- over(pred.loc2,shp2)
plot(shp2)
points(pred.loc2[!is.na(point.in.polygon),],cex=0.2)


# CONVERTER OS DADOS EM DADOS ESPACIAIS

coordinates(ph_df) = ~ easting +northing  # OBSERVADO
coordinates(pred.loc) = ~ x.pred+y.pred  # NAO OBSERVADO- ONDE DEVE SE FAZER A INTERPOLACAO

# VAMOS FAZER A INTERPOLACAO USANDO O INVERSO DA DISTANCIA PONDERADA

idw_ph = idw(ph ~1, ph_df , pred.loc, maxdist = Inf, idp = 2)


# VIZUALIZAR A AREA DE INTERPOLACAO 
par(mfrow = c(1,2))
predZ <- idw_ph@data$var1.pred
predZ
plot.index <- matrix(point.in.polygon, nrow=length(plot.x), ncol=length(plot.y))

plot.mean.idw <-  matrix(predZ, nrow=length(plot.x), ncol=length(plot.y))
plot.mean.idw[is.na(plot.index)] <- NA
image.plot(x=plot.x,y=plot.y,z=plot.mean.idw,xlab="",ylab="")
contour(x=plot.x,y=plot.y,z=plot.mean.idw,xlab="",ylab="",add=TRUE, drawlabels=FALSE)
plot(shp2,add=T)



# INTERPOLACAO POR KRIGAGEM 

pred.loc <- data.frame(cbind(x.pred,y.pred)) # AREA POR INTERPOLAR
kg_ph <- krige.conv(ph_geo,locations = pred.loc,
krige = krige.control(cov.model = 'exponential',nugget =0,
cov.pars = c(0.2725,36.25)))

# VIZUALIZAR OS DADOS INTERPOLADOS POR KRIGAGEM

pred_K <- kg_ph$predict
plot.index <- matrix(point.in.polygon, nrow=length(plot.x), ncol=length(plot.y))

plot.mean.k <-  matrix(pred_K, nrow=length(plot.x), ncol=length(plot.y))
plot.mean.k[is.na(plot.index)] <- NA
image.plot(x=plot.x,y=plot.y,z=plot.mean.k,xlab="",ylab="")
contour(x=plot.x,y=plot.y,z=plot.mean.k,xlab="",ylab="",add=TRUE, drawlabels=FALSE)
plot(shp2,add=T)



# ==================================  EXERCICIO DATASET MEUSE ===========================================

data("meuse")

View(meuse)
# CRIAR POLIGONO APARTIR A VOLTA DAS COORDENADAS
# ESTAS FUNCOES SAO DA LIVRARIA sf
meuse_poly <- meuse |>
  st_as_sf(coords = c(1, 2)) |>
  summarize(geometry = st_union(geometry)) |>
  st_convex_hull()
plot(meuse_poly)



# SALVAR ESTE POLIGONO EM SHAPEFILE

st_write(meuse_poly, "meuse_shape.shp")


# AGORA VAMOS LER NOVAMENTE O SHAPEFILE QUE SALVAMOS 

meuse_shape <- readOGR("meuse_shape.shp")
plot(meuse_shape)

shp2 <- gUnaryUnion(meuse_shape)
plot(shp2)



# CRIAR A GRELHA PARA FAZER A INTERPOLACAO

# PRIMEIRO VAMOS EXTRAIR AS COORDENADAS O POLIGONO (SHAPEFILE) 
extractCoords <- function(sp.df)
{
results <- list()
for(i in 1:length(sp.df@polygons[[1]]@Polygons))
{
results[[i]] <- sp.df@polygons[[1]]@Polygons[[i]]@coords
}
results <- Reduce(rbind, results)
results
}

coord <- extractCoords(shp2)

plot.x <- seq(range(coord[,1])[1],range(coord[,1])[2],10)
plot.y <- seq(range(coord[,2])[1],range(coord[,2])[2],10)
x.pred <- expand.grid(plot.x, plot.y)[,1]
y.pred <- expand.grid(plot.x, plot.y)[,2]
pred.loc <- data.frame(cbind(x.pred,y.pred))

pred.loc2 <- SpatialPoints(pred.loc)

point.in.polygon <- over(pred.loc2,shp2)
plot(shp2)
points(pred.loc2[!is.na(point.in.polygon),],cex=0.2)


# CONVERTER OS DADOS EM DADOS ESPACIAIS

coordinates(meuse) = ~ x + y  # OBSERVADO
coordinates(pred.loc) = ~ x.pred+y.pred  # NAO OBSERVADO- ONDE DEVE SE FAZER A INTERPOLACAO

# VAMOS FAZER A INTERPOLACAO USANDO O INVERSO DA DISTANCIA PONDERADA

idw_zinc = idw(zinc ~1, meuse , pred.loc, maxdist = Inf, idp = 2)

# VIZUALIZAR A AREA DE INTERPOLACAO 

predZ <- idw_zinc@data$var1.pred
predZ
plot.index <- matrix(point.in.polygon, nrow=length(plot.x), ncol=length(plot.y))

plot.mean.idw <-  matrix(predZ, nrow=length(plot.x), ncol=length(plot.y))
plot.mean.idw[is.na(plot.index)] <- NA
image.plot(x=plot.x,y=plot.y,z=plot.mean.idw,xlab="",ylab="")
contour(x=plot.x,y=plot.y,z=plot.mean.idw,xlab="",ylab="",add=TRUE, drawlabels=FALSE)
plot(shp2,add=T)





# INTERPOLACAO POR KRIGAGEM 
data(meuse)
pred.loc <- data.frame(cbind(x.pred,y.pred)) # AREA POR INTERPOLAR
meuse_geo <- as.geodata(meuse, coords.col = c(1,2), data.col = 6)
kg_znc <- krige.conv(meuse_geo,locations = pred.loc,
krige = krige.control(cov.model = 'exponential',nugget =0,
cov.pars = c(0.2725,36.25)))

# VIZUALIZAR OS DADOS INTERPOLADOS POR KRIGAGEM

pred_K <- kg_znc$predict
plot.index <- matrix(point.in.polygon, nrow=length(plot.x), ncol=length(plot.y))

plot.mean.k <-  matrix(pred_K, nrow=length(plot.x), ncol=length(plot.y))
plot.mean.k[is.na(plot.index)] <- NA
image.plot(x=plot.x,y=plot.y,z=plot.mean.k,xlab="",ylab="")
contour(x=plot.x,y=plot.y,z=plot.mean.k,xlab="",ylab="",add=TRUE, drawlabels=FALSE)
plot(shp2,add=T)

#=============================== KRIGAGEM UNIVERSAL ==================================

# VAMOS USAR A BASE DE DADOS SOBRE O PH 

pred.loc <- data.frame(cbind(x.pred,y.pred)) # AREA POR INTERPOLAR

ph_geo <- as.geodata(ph_df, coords.col = c(2,1), data.col = 3)
kg_ph <- krige.conv(ph_geo,locations = pred.loc,
krige = krige.control(cov.model = 'exponential',nugget = 0.0906,
cov.pars = c(0.41,263.4559), trend.d = '1st', trend.l = '1st'))


pred_K <- kg_ph$predict
plot.index <- matrix(point.in.polygon, nrow=length(plot.x), ncol=length(plot.y))

plot.mean.k <-  matrix(pred_K, nrow=length(plot.x), ncol=length(plot.y))
plot.mean.k[is.na(plot.index)] <- NA
image.plot(x=plot.x,y=plot.y,z=plot.mean.k,xlab="",ylab="")
contour(x=plot.x,y=plot.y,z=plot.mean.k,xlab="",ylab="",add=TRUE, drawlabels=FALSE)
plot(shp2,add=T)
