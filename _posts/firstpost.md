
Dealing with maps.

Some days ago I was struggling to label my map  searched over internent in order to find something that could help, nevertheless my search was not so successful. I actually I could find something complete that could respond to my need. But after some "pain" I was able to plot a nice my and labled it as I wanted. 

Today I want to share my code, as I think it might be helpful. The interesting part of the execircise I will show lies mainly on managing to make a map an being able to plot, for instance, number, percentage or anything else you may want on the map. Before we dive into how me plot numbers on the map, we will first make map reading a set of shapefiles, so for that we will use the command `readShapePoly` from the `maptools` package.

For now I will use the map from Mozambique, and  the HIV prevalence data. Before, it is important to set a working directory and put there all the set of shapefiles(`shx`, `shp.xml`,`shp`,`sbn`,`prj`,`dbf`, and `cpg`), after that we read the shapefile  as follows:

```R
# read shapefile 
# make sure that all your shapefiles are in your working director.
shape.f=readShapePoly("PROVINCIAS.shp")
```
