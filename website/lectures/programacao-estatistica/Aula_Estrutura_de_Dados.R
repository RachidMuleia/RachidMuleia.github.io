
################################################################################
##################### ESTRUTURA DE DADOS #######################################
################################################################################

# vectores

c(1,2,3,4,7,10,18)

x<-c(1,2,3,4,7,10,18)
x

y<-1:10


# vector de strings

nomes<- c(nome1="Maria", nome2="Joao", nome3="Antonio")
nomes

# criar vector usando a função seq()

x1<-seq(from=1, to=20)
x1
y1<-seq(from=1,to=5,by=0.01)
y1

x2<-seq(from=1,to=5, length=500)
x2

seq(1,10)
seq(1,10, 2)
seq(1,10, ,4)



rep(2, 5)

rep("a", 4)
b1<-c("a","b","c")
rep(b1,3)
z<-rep(c("a","b","c"),2)


# coercao de dados

c(5, "b")

c(TRUE, 1)


x3<-c("4", "6", "7")
x3<-as.numeric(x3)

x4<-c(1,0)
x4<-as.logical(x4)


length(x)
x[length(x)]

rev(x)
y<-c(10,2,4,50,20,8,19,0,2)
rev(y)
sort(y)
sort(y, decreasing = TRUE)

unique(y)

unique(z)


sexo <- c("masculino", "feminino", "masculino", "feminino")
unique(sexo)
sexo<-factor(sexo)
sexo
unique(sexo)


#  criacao de listas

minha_lista<- list(1:3, rep("a",3), rep(c(TRUE,FALSE),3), list(1:2, c('maria', 'joana')))
minha_lista

minha_Lista<-list(vector1=1:3,vector2=c("a","b"),vector3=c(TRUE,FALSE,TRUE))
minha_Lista


# criar lista vazia

lista_vazia<-list()

lista_vazia1<-vector(mode='list', length=5)
lista_vazia1




# criacao de matrizes

xx<-matrix(data=1:8,nrow=2,ncol=4,byrow=TRUE)
dim(xx)[1]



x<-1:3
y<-10:12
cbind(x,y)

rbind(x,y)



# Criacao de data frame

df <- data.frame(ID = 1:3, Sexo = c("F", "F", "M"),Peso = c(71, 60, 65))
df
edit(df)


##################################################################################
########################## Indexacao ############################################
#################################################################################

xxx<-c(rep(3,5),rep(10,3),rep(2,3),rep(38,4),rep(40,4))
xxx[xxx<10]
xxx[xxx>5]
xxx[xxx>5 &xxx<20]


length(xxx[xxx>5])


yyy<-which(xxx>5)
xxx[yyy]
xxx[xxx>5]

which.max(xxx)
which.min(xxx)


# indexacao de matrizes

mat <- matrix(1:9, nrow = 3,ncol=3)
mat
mat[2,3,drop=FALSE]
mat[2 , , drop=FALSE]
mat[ , 2, drop=FALSE]

mat[c(1,2),c(1,2)]


# indexacao de lista

lis <- list(c(3, 8, 7, 4), mat, 5:0)
lis
www<-lis[[2]]
www[,2]
lis[[2]][1,]
lis[[1]][2]


lis <- list(vetor1 = c(3, 8, 7, 4), mat = mat, vetor2 = 5:0)
lis$vetor1
lis$mat
