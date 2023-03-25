


################################################################################
####################### FUNCOES EM R ###########################################
################################################################################

Fun1<-function(x){
  
  return(x*x)
}


Fun2<-function(x){
  b<-x*x
  return(b)
}

Fun1(2)

Fun2(2)

Fun3<-function(x){
  b<-x*x
  print(b)
}

Fun3(2)

a<-Fun3(2)
d<-Fun2(2)


# Funcao para calcular medidas descritivas

descr_fun<-function(valores, remover_na){
  media<-mean(valores, na.rm=remover_na)
  mediana<-median(valores,na.rm=remover_na)
  maximo<-range(valores,na.rm=remover_na)[2]
  minimo<-range(valores,na.rm=remover_na)[1]
  resultado<-c(media, mediana, maximo, minimo)
  return(resultado)
}

vector1<-rnorm(50, 0, 1)
vector2<-c(rep(NA, 7), vector1)
descr_fun(vector1)
descr_fun(vector2,remover_na = FALSE)


# funcoes com valores por defeito

descr_fun<-function(valores, remover_na=FALSE){
  media<-mean(valores, na.rm=remover_na)
  mediana<-median(valores,na.rm=remover_na)
  maximo<-range(valores,na.rm=remover_na)[2]
  minimo<-range(valores,na.rm=remover_na)[1]
  resultado<-c(media, mediana, maximo, minimo)
  return(resultado)
}

descr_fun(vector2, remover_na = TRUE)

# importar todos argumentos das funcoes que estao dentro da nossa  funcao
descr_fun1<-function(valores,...){
  media<-mean(valores,... )
  mediana<-median(valores,...)
  maximo<-range(valores,...)[2]
  minimo<-range(valores, ...)[1]
  resultado<-c(media, mediana, maximo, minimo)
  return(resultado)
}

descr_fun1(vector2, na.rm=FALSE)



# Escopo da variavel
x<-4
Fun1<-function(x){
  
  return(x*x)
}


Fun1(x)









###################################################################################
############################# RESOLUCAO DE EXERCICIOS ############################
#################################################################################

library(liver)
library(dplyr)

data(cereal)

str(cereal)
?cereal

# Quantas observações e variáveis tem a base de dados cereal?

dim(cereal)

Adicione uma nova variável ao conjunto de dados chamada ‘totalcarb’, que é a soma de carb e sugars.

cereal$totalcarb<-cereal$carbo+cereal$sugars

#cereal<-mutate(cereal, totalcarb=carbo+sugars)

#Quantos cereais na base dados são hot?
table(cereal$type)
hot_cereal<-cereal[cereal$type=='hot', ]
filter(cereal, type=='hot')
#subset(cereal, type='hot')
#Seleccione o conjunto de cereais cujo frabricante é a Kellogs (K)

man_kellog<-cereal[cereal$manuf=='K', ]
dim(man_kellog)


