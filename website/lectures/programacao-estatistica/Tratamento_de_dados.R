
library(dplyr)
library(magrittr)
caminho<-'C:/Users/Rachid/Dropbox/Analise de Dados DMI/Slides Aulas/MATERIAL DE AULAS MESTRADO/SLIDES'
setwd(caminho)

chicago <- readRDS("chicago.rds")
str(chicago)
head(chicago)


#  como alterar os nomes das variaveis
names(chicago) # devolve os nomes da data frame
# alterar a variavel city para cidade
names(chicago)[1]<-'cidade'
names(chicago)[which(names(chicago)=='cidade')]<-'city1'

names(chicago)[c(2,4)]<-c('tmpd1', 'data')
names(chicago)[which(names(chicago)%in%c('tmpd', 'date'))]<-c('tmpd1', 'data')


# alterar os nomes das variaveis usando a funcao rename() da livraria dplyr
chicago1<-rename(chicago, data2=data, nivel_poluicao=pm25tmean2)
head(chicago1)


# transformacao de variaveis
chicago$temp_celcius<-(chicago$tmpd1-32)*5/9

chicago<-mutate(chicago, temp_c = (tmpd1-32)*5/9)

# categorizacao de uma variavel 
# < 35 temperatura baixa
# >=35 e <67 temperatura media
# >=67 temperatura alta

chicago$temp_class<-rep(NA, dim(chicago)[1])
chicago$temp_class[chicago$tmpd1<35]<-'baixa'
chicago$temp_class[chicago$tmpd1>=35 & chicago$tmpd1<67]<-'media'
chicago$temp_class[chicago$tmpd1>=67]<-'alta'
head(chicago)
tail(chicago, n=20)


# aplicacao da funcao group_by para agrupar os dados

chicago_class<-group_by(chicago, temp_class)
summarise(chicago_class, media=mean(tmpd1))

# aplicacao do operador pipe 

group_by(chicago, temp_class) %>% summarise(media=mean(tmpd1))



# estatisticas descritivas

data("iris")
head(iris)
str(iris)

summary(iris) # sumarizar os dados
summary(iris$Sepal.Length)

mean(iris$Sepal.Length, na.rm=TRUE) # calcular a media

mean(chicago$tmpd1, na.rm=TRUE) # retirar valores omissos para poder calcular a media 

median(iris$Sepal.Length) # mediana

median(chicago$tmpd1,na.rm=TRUE)

range(iris$Sepal.Length) # amplitude, porem devolve o minimo e maximo

max(iris$Sepal.Length)
min(iris$Sepal.Length)
sum(iris$Sepal.Length)


# manipulacao de valores omissos

iris_miss <- read.csv('iris_missing.csv',header = TRUE)

head(iris_miss)

sum(is.na(iris_miss$Sepal.Length))

omisso_df<-is.na(iris_miss)
omisso_df
colSums(omisso_df) # valores omissos em colunas/variaveis

rowSums(omisso_df)
omisso_df1<-as.data.frame(omisso_df)
omisso_df1$numero_var_omisso<-rowSums(omisso_df)
# identificar linhas que tem valores omissos 
vec_omissos<-rowSums(omisso_df)
omissos_apenas_df<-iris_miss[which(vec_omissos!=0),]
view(omissos_apenas_df)

omissos_apenas_df1<-iris_miss[which(vec_omissos==0),]
View(omissos_apenas_df1)

iris_sem_omissos_df<-na.omit(iris_miss) # exluir observacoes com valores omissos
View(iris_sem_omissos_df)

complete.cases(iris_miss)
sem_omissos_df1<-iris_miss[complete.cases(iris_miss), ]
View(sem_omissos_df1)


omissos_df1<-iris_miss[!complete.cases(iris_miss), ]
View(omissos_df1)


# caracteres especiais para representar valores omissos

iris_spec <- read.csv('iris_missing_spec_car.csv',header=TRUE, sep=',', na.strings = '9999')
View(iris_spec)
iris_spec1 <- read.csv('iris_missing_spec_car.csv',header=TRUE, sep=',')

iris_spec1$Sepal.Length[iris_spec1$Sepal.Length==9999]<-NA
View(iris_spec1)
iris_spec1[iris_spec1==9999]<-NA


# funcao remove_empty para remover colunas/linhas vazias da livraria tidyr
snail_feeding<-read.csv('Snail_feeding.csv', header=TRUE)
snail_col<-remove_empty(snail_feeding, which = 'cols') # rows, c('rows', 'cols')
View(snail_col)



# tabulacao de dados 

table(iris$Species)
prop.table(table(iris$Species))*100
group_by(iris, Species) %>%summarise(N=n()) %>% mutate(Perc=(N/sum(N))*100)


# tabulacao bivariada
library(haven)
dados_pesca <- read_spss('BaseDados.sav')
view(dados_pesca)

attr(dados_pesca$PTP, 'labels')
attr(dados_pesca$MC, 'labels')
table(dados_pesca$PTP, dados_pesca$MC)

addmargins(table(dados_pesca$PTP, dados_pesca$MC))
