x <- 0
if(x > 0) {
cat("x é maior que zero")
} else if(x < 0) {
cat("x é meno que zeo")
} else {
cat("x dever ser zero!")
cat("\n")
}

x<-(-2)
if(x>0){
  cat("x é maior que zero")
} 
if(x<0){
 cat("x é menor que zeo") 
}
if(x==0){
 cat("x dever ser zero!") 
  
  

}




####################################################
################# ciclos for #######################

x<-c("a","b","c","d")
for(i in 1:4) { # primeira versao
print(x[i])
}



for(i in seq_along(x)) { # segunda versao
print(x[i])
}


for(letter in x) {  # terceira versao
print(letter)
}

for(i in 1:4) print(x[i]) # quarta versao







data("iris")
data_iris <- cbind(iris, rep(iris[,1:dim(iris)[2]],8))
head(data_iris,n=3)

mean(data_iris$Sepal.Length)

data_iris<-data_iris[ ,-which(names(data_iris)=='Species')]

media_vec<-vector(mode = 'numeric', 36)
media_vec<-rep(NA, 36)
for(i in 1:dim(data_iris)[2]){
  media_vec[i]<-mean(data_iris[, i], na.rm=TRUE)
}
media_vec



##################################################################
###################### FUNCOES APPLY #######################
###########################################################

media_vec1<-lapply(data_iris, FUN=mean, na.rm=TRUE)
unlist(media_vec1)

media_vec2<-sapply(data_iris, FUN=mean, na.rm=TRUE)



#############################################################
########################### LOOPS ANINHADOS #################


x<-matrix(1:60,6,10)
for(i in 1:6){
  for(j in 1:10) {
    print(x[i,j])
    }
}




count<-0
while(count<10){
print(count)
count<-count+1
}



####### CICLO REPEAT 


val = 1
# using repeat loop
repeat
{
# instrução(código)
print(val)
val = val + 1
# condição de paragem
if(val > 5)
{
# aplicacao do código break
# para terminar o ciclo
break
}
}


