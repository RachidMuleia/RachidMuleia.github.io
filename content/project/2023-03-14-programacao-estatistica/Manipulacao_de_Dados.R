
setwd('C:/Users/Rachid/Dropbox/Analise de Dados DMI/Slides Aulas/MATERIAL DE AULAS MESTRADO/SLIDES')



################################ MANIPULACAO DE DADOS ############################

# JUNCAO DE BASE DE DADOS


# aplicacao da funcao rbind para juntar linhas
data_1=data.frame(Name=c('Lenna','Malcom',"Akiko"),
                  City=c("San Francisco","New York", "Tokyo"), Country=c("US","US","Japan"))

data_2=data.frame(Name=c("Lenna","Thomas","Diane"), 
                  City=c("San Franscico", "London", "Chicago"), Country=c("US","UK","US"))
data_1
names(data_2)<-c('City', 'Country')

data3<-rbind(data_1, data_2)
data3


# juncao de tabelas via colunas

data_1 <- data.frame(ID=c(588,654,527,955,954), # primeira coluna
                     var1=c(2,1,1,2,1), # segunda coluna
var2=c('d','y','o','c','t'))# terceira coluna

data_2 <- data.frame(ID=c(588,654,527,955,954),
 var3=c(290,81,63,6,146),
 var4=c('Apples','Bananas','Apples','Pears','Pears'),
 var5=c('Breakfast','Snack','Snack','Snack','Breakfast'))


data_3<-cbind(data_1, data_2)
data_3



#  OPERACAO DE MERGE

data_1 <- data.frame(owner = c('Alice', 'Bob','Carol','Dan','Erin'),
pet = c('Snowy','Mittens','Mittens', 'Goldie','Pancho'))
data_1

data_2 <- data.frame(pet=c('Fido','Goldie','Mittens','Rex','Snowy'),
species =c('Dog','Goldfish','Cat','Dog','Dog'))
data_2

# left join
data_4<-merge(data_1, data_2, by.x='pet', by.y='pet', all.x=TRUE)
data_4<-merge(data_1, data_2, by='pet', all.x=TRUE)
data_4<-left_join(data_1, data_2, by='pet')
data_4

# right join
data_5<-merge(data_1, data_2, by='pet', all.y=TRUE)
data_5


# natural join
data_6<-merge(data_1, data_2, by='pet')
data_6

#full join

data_7<-merge(data_1,data_2, by='pet', all=TRUE)
data_7


# ================== criacao de variaveis =================================

bird_data<- read.csv("Bird_Behaviour.csv", header = TRUE,
stringsAsFactors=FALSE)
bird_data
str(bird_data)

bird_data$log_FID<-rep(NA, dim(bird_data)[1])
bird_data$log_FID<-log(bird_data$FID)
head(bird_data)

bird_data[, 'log_FID1']<-log(bird_data[,'FID'])
head(bird_data)


############## ### SEPARACAO DE VARIAVEL EM DOIS #####################
#install.packages('dplyr')
library(tidyr)

# este comando separa uma variavel em duas variaveis 
bird_data1<-separate(bird_data, Species, c('Classe', 'Especie'), sep='_', remove=TRUE) # removemos a variavel anting que continha as duas variaveis num so
bird_data2<-separate(bird_data, Species, c('Classe', 'Especie'), sep='_', remove=FALSE) # deixamosa variavel antinga na base de dados final 

head(bird_data1)
head(bird_data2)


#concatenacao de variaveis 
bird_data3<-unite(bird_data1, 'Especie', c('Classe', 'Especie'), sep='_', remove=TRUE)
head(bird_data3)

bird_data3$Especie1<-paste(bird_data1$Classe, bird_data1$Especie, sep='_')
head(bird_data3)



######  LIVRARIA dplyr para manipulaçao de dados ###############

library(dplyr)
chicago_data<-readRDS('chicago.rds')
str(chicago_data)
head(chicago_data)

chicago_data1<-chicago_data[, 1:3]; chicago_data[, c('city', 'tmpd', 'dptp')]
head(chicago_data1)

chica_data2<-chicago_data[, c('city', 'tmpd', 'dptp')]
head(chica_data2)


chicago_data3<-dplyr::select(chicago_data, city, tmpd, dptp)
chicago_data3<-dplyr::select(chicago_data, city:dptp)
head(chicago_data3)


# seleccionar variaveis usando um padrao

chicago_data4<-dplyr::select(chicago_data, ends_with('2')) # termina com um determinado padrao
head(chicago_data4)

chicago_data5<-dplyr::select(chicago_data, starts_with('d')) # comeca com um determinado padrao
head(chicago_data5)

chicago_data6<-dplyr::select(chicago_data, contains('mean'))
head(chicago_data6)



# usar a funcao filter da livraria dplyr 

# linhas com niveis de poluicao maiores que 30
ch_df<-dplyr::filter(chicago_data, pm10tmean2> 30)
str(chicago_data)
str(ch_df)
ch_df1<-chicago_data[chicago_data$pm10tmean2>30 & !is.na(chicago_data$pm10tmean2), ] # vamos ver porque tem observacoes diferentes 
str(ch_df1)
View(ch_df1)

# poluicao maior 30 e temp >80
ch_df2<-dplyr::filter(chicago_data, pm10tmean2> 30 & tmpd<80)
str(ch_df2)

ch_df3<-chicago_data[chicago_data$pm25tmean2>30 & chicago_data$tmpd<80,  ]
str(ch_df3)



head(bird_data)
str(bird_data)
ch_df2<-dplyr::filter(bird_data, FID>8)
str(ch_df2)
ch_df3<-bird_data[bird_data$FID>8, ]
str(ch_df3)



# =========== ordenacao de dados usando a funcao arrange 

head(chicago_data)
ch_df4<-arrange(chicago_data, dptp) # ordem crescente
head(ch_df4)

ch_df5<-arrange(chicago_data, desc(dptp)) # ordem decrescente
head(ch_df5)
