setwd('C:/Users/Rachid/Dropbox/Analise de Dados DMI/Slides Aulas/MATERIAL DE AULAS MESTRADO/SLIDES')
getwd()
list.files()
snail_data<-read.table(file='Snail_feeding.csv', header=TRUE, sep=',')
View(snail_data)

snail_data1<-read.csv(file='Snail_feeding.csv', header=TRUE)
View(snail_data1)

# inspenccionar os dados 
str(snail_data)
head(snail_data, n=10) #visualizar as primeiras linhas da data frame

tail(snail_data) # por defeito a funcao visualiza as ultimas 6 linhas
tail(snail_data,n=10)


snail_data2<-snail_data[, 1:7]
str(snail_data2)

col<-colSums(is.na(snail_data))
col[which(col>0)]
snail_data[, -which(col>0)]


# modificar valores da base de dados 

table(snail_data$Sex)

snail_data$Sex[snail_data$Sex=='Male']<-'male'
snail_data$Sex[snail_data$Sex=='males']<-'male'
snail_data$Sex[snail_data$Sex=='male ']<-'male'
table(snail_data$Sex)
unique(snail_data$Sex)



# ordenação de dados

snail_data3<-snail_data[order(snail_data$Temp, decreasing = TRUE), ]
View(snail_data3)

#exemplo_miss<-read.table('snail_feeding.csv', header=TRUE, na.strings = 'small', sep=',')
#View(exemplo_miss)


# verificar duplicados
duplicated(snail_data)
snail_data[duplicated(snail_data), ]



# Leitura de dados numa pagina web

data_web = read.table("http://www.sthda.com/upload/decathlon.txt",header=TRUE, sep='\t',strip.white = TRUE)
head(data_web)

download.file(url='http://www.sthda.com/upload/decathlon.txt',destfile = 'ficheiro_url.txt')



# Leitura de dados no formato SPSS, SAS, STATA

library(haven)
library(rio)
list.files(, pattern = 'SAV')

mzar<-read_spss(file='MZAR72FL.SAV')

View(mzar)

mzar1<-import(file='MZAR72FL.SAV')
View(mzar1)

snail_data4<-import(file='Snail_feeding.csv')
View(snail_data4)
export(mzar1, file='exempl_exportar.sav')
export(mzar1, file='exempl_exportar.xlsx')

snail_data5<-read.table(file='Snail_feeding.csv', header=FALSE, sep=',', skip=2)
View(snail_data5)
