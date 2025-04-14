
library(plotly)
library(sf)
library(stars)
library(ggspatial)
library(gridExtra)
library(ggpubr)
library(cowplot)
library(rio)
library(sp)
library(gstat)
library(geoR)
library(ggplot2)

#shape_path <- "/Users/rachidmuleia/Dropbox/MESTRADO EM GEOHIDROLOGIA/ProbEstatistica/ProbEstatistica/Shapefile_MZ_HIV"

#list.files(shape_path)
#map <- st_read(paste(shape_path, "MZGE52FL.shp", sep = '/'))
#plot(map)


map.shp.path <- "/Users/rachidmuleia/Dropbox/INS/HSH/BBS I (from Makini)/Moz IBBS Final Survey Materials/IBBS MTS 2012/7_RELATORIO/Figuras/MAPA"
list.files(map.shp.path)
map_moz <- st_read(paste(map.shp.path, "MOZ-level_1.shp", sep = '/'))
plot(map_moz)


data_hiv <- "/Users/rachidmuleia/Dropbox/File requests/EXAME_ISCISA_2021/Fotos/ISCISA/Geostatistics Class Material/Lecture notes"

hiv_df <- import(paste(data_hiv, "hiv_prev.csv",sep = "/"))
View(hiv_df)


# ------------- visualizar os dados no mapa

data_sf_hiv <- st_as_sf(hiv_df, coords = c("long", "lat"), crs = st_crs(map_moz))


ggplot() +
  geom_sf(data = map_moz)+
  geom_sf(data = data_sf_hiv, aes(size = prev, color = prev), alpha = 0.7)+
  scale_size_continuous(range = c(1, 10)) +
  scale_color_gradient(low = "lightblue", high = "darkblue") +
  theme_minimal() +
  labs(size = "prev", color = "prev")


#----------------- interpolacao por IVD 

#vamos construir uma malha



grd.moz <- st_make_grid(map_moz, n =200)

plot(grd.moz)

# precisamos de interpolar apenas ate as fronteiras de mocambique
# encontrar pontos que caem dentro do pais
index <- which(lengths(st_intersects(grd.moz, map_moz)) > 0)


# vamos filter na nossa malha 

# subset the grid to make a fishnet
moz_grid <- grd.moz[index]


plot(moz_grid)





hiv_df.coord <- hiv_df  
coordinates(hiv_df.coord) <- ~long+lat # criar um objecto da class sp ( os dados que contem a variavel de interesse )


pred_loc <- st_coordinates(moz_grid) # extrair as coordenadas do local de interpolacao 

pred_loc.df <- as.data.frame(pred_loc)

pred_loc1 <- pred_loc.df
coordinates(pred_loc1) <- ~X+Y # criar um objecto da class sp






# interpolacao usando ID
idw_result <- idw(prev ~ 1, hiv_df.coord , newdata = pred_loc1, idp = 2)

# adicionar nesta data frame a variavel que contem as interpolacaoes

pred_loc.df$hiv_pred <- idw_result$var1.pred
head(pred_loc.df)

# visualizar as interpolacaoes no MAPA

ggplot(pred_loc.df)+geom_tile(aes(X,Y,fill = hiv_pred))+
  geom_sf(data =st_cast(map_moz, "MULTILINESTRING"))+
  coord_sf(lims_method = "geometry_bbox")+
  scale_fill_gradientn("hiv_pred",colours = terrain.colors(10), limits = range(pred_loc.df$hiv_pred), name = NULL)
  



# interpolacao por krigagem 

# primeiro devemos encontrar a covariancia que descreve a estrutura espacial 

hiv.geo <- as.geodata(hiv_df,coords.col = c(2,1), data.col = 3 )

hiv_variog <- variog(hiv.geo)

plot(hiv_variog) # o grafico confirma que existe uma tendencia nos dados 

#variog.porosidade.trend <- variog(poros.geo,trend = "1st")
#plot(variog.porosidade.trend)

# vamos ajustar alguns modelos 

fit.hiv <- variofit(hiv_variog,
                      cov.model="spherical",
                      ini.cov.pars=c(60,14), # aqui especificamos a contribuicao/soleira parical e a amplitude
                      fix.nugget=FALSE,
                      nugget=40,
                      weights='npairs', # Minimos quadrados ordinarios ponderados
                      messages=FALSE)




kg_hiv <- krige.conv(hiv.geo,locations = pred_loc.df[, c("X", "Y")],
                    krige = krige.control(cov.model = 'spherical',nugget =41.8,
                                          cov.pars = c(65,12.88)))


kg_hiv$predict
pred_loc.df$hiv_krig <- kg_hiv$predict

ggplot(pred_loc.df)+geom_tile(aes(X,Y,fill = hiv_krig))+
  geom_sf(data =st_cast(map_moz, "MULTILINESTRING"))+
  coord_sf(lims_method = "geometry_bbox")+
  scale_fill_gradientn("hiv_krig",colours = terrain.colors(10), limits = range(pred_loc.df$hiv_krig), name = NULL)



# vamos apresentar a variabilidade das estimativas por krigagem 

pred_loc.df$hiv_krig.pred <- kg_hiv$predict # interpolacao

ggplot(pred_loc.df)+geom_tile(aes(X,Y,fill = hiv_krig.var))+
  geom_sf(data =st_cast(map_moz, "MULTILINESTRING"))+
  coord_sf(lims_method = "geometry_bbox")+
  scale_fill_gradientn("hiv_krig.var",colours = terrain.colors(10), limits = range(pred_loc.df$hiv_krig.var), name = NULL)



pred_loc.df$hiv_krig.var <- kg_hiv$krige.var # erro padrao
ggplot(pred_loc.df)+geom_tile(aes(X,Y,fill = hiv_krig.var))+
  geom_sf(data =st_cast(map_moz, "MULTILINESTRING"))+
  coord_sf(lims_method = "geometry_bbox")+
  scale_fill_gradientn("hiv_krig.var",colours = terrain.colors(10), limits = range(pred_loc.df$hiv_krig.var), name = NULL)
