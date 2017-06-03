
# Adding labels on a Map (Importance of getSpPPolygonsLabptSlots()) .

Some days ago I was struggling to label my map. I  searched over internent in order to find something that could help, nevertheless my search was not so successful. I actually I couldn't find something complete that could respond to my need. But after some "pain" I was able to plot a nice map and labled it as I wanted. 

Today I want to share my code, as I think it might be helpful. The interesting part of the execircise I will show lies mainly on managing to make a map an being able to plot, for instance, number, percentage or anything else you may want on the map. Before we dive into how we plot numbers on the map, we will first plota map reading a set of shapefiles, so for that we will use the command `readShapePoly()` from the `maptools` package.

For now I will use the map from Mozambique, and  the HIV prevalence data. Before, it is important to set a working directory and put there all the set of shapefiles(`shx`, `shp.xml`,`shp`,`sbn`,`prj`,`dbf`, and `cpg`), after that we read the shapefile  as follows:


```R
library(classInt)
library(RColorBrewer)
library(rgeos)
library(shapefiles)
library(rgdal)
library(dplyr)
library(rgeos)
library(maptools)
library(RColorBrewer)
library(ggplot2)
# read shapefile 
# make sure that all your shapefiles are in your working director.
shape.f=readShapePoly("PROVINCIAS.shp")
```
After reading the shapefile I noticed that some porvince names were missing so  I replaced all the missing with there corresponding province names.

```R
shape.f@data$Provincia=as.character(shape.f@data$Provincia)
shape.f@data$Provincia[5]="Maputo City" #replacing NA
```
As the aim is to plot the prevelance by province I created a vector with prevalence for all the provinces  and add it to my the dataframe `shape.f@data`.

```R
prov=c("Niassa","Cabo Delgado","Nampula","Zambezia","Tete","Manica","Sofala","Inhambane",
        "Gaza", "Maputo Prov.", "Maputo City")
preve.df=data.frame(prevalence=prev, Provincia=prov)
shape.f@data=merge(shape.f@data,preve.df)
```
Before plotting the map we define the  class intervals and the colors we are going to use on the map for labeling.
```R
brks<-classIntervals(shape.f@data$prevalence, n=3, style="fixed", cultlabls=TRUE, fixedBreaks=c(0,7,11,16))
brks<-brks$brks
display.brewer.all() ###  onde can see all the available colors with this command
colors<-brewer.pal(3,"Oranges") # chossing color
```
Now we can plot the map


```R
windows()
plot(shape.f, col=colors[findInterval(shape.f@data$prevalence, brks,all.inside=TRUE)], axes=FALSE)
# after plotting the map we have to use the fucntion getSpPPolygonsLabptSlots() from the package sp. This retrieves the coordinates
of the centroids. And this is actually what we need to overlay the province names and the prevalence of each province on the map.

text(getSpPPolygonsLabptSlots(shape.f), labels=shape.f@data$Provincia, cex=0.6, font=2)
text(getSpPPolygonsLabptSlots(shape.f), labels=paste(round(shape.f@data$prevalence,digits =2 ), "%",sep=""), cex=0.6, font=2, pos=1)
legend(x=1300000, y=8800000, legend=leglabs(brks,under = "<",over=">="), fill=colors, bty="n",x.intersp = .8, y.intersp = .8) # plotting the counts in the map, I recommend to install all the packages above
```
The result is  the map below 

![Map with HIV prevalence](/img/overallmap.png)

The overlay of the province names and the HIV prevalence for each province was able throug `getSpPPolygonsLabptSlots()` whicetrieves the coordinates of the centroids and the restult is then passed to `text()` as the position for the labels on the plot.

I hope this can help those in need.

