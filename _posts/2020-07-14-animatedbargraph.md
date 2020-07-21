---
layout: post
title: "Gráfico de barras animado"
subtitle: "Mais uma maravilha do R"
tags: [rstats, r]
date: 2020-07-15 22:19:38 -0700
share-img: "/img/gganimate.png"
image: "/img/gganimate.png"
readtime: true
comments: true
show-share: true
show-subscribe: true
---


Hoje devia estar a trabalhar no meu manuscrito, mas infelizmente acordei com um pouco de preguiça, e quando é assim fico a vaguear por livros de  *data science*, *visualização de dados*, *data storytelling* 
e demais coisas que agregem a minha paixão por estatística, programação  e análise , claro que de forma descontraída. Após ter visto um vídeo no YOUTUBE-- que mostrava um gráfico exibindo as 
estatísticas das músicas mais vendidas nos EUA, no período compreendido de 1969 - 2019 -- fiquei fascinado, e como sou apaixonado por DataViz (visualização de dados), pensei como 
fazer um gráfico da mesma natureza usando a minha ferramenta favorita de análise de dados -- o R. Devo confessar que a príncipio fiquei intimidado, fiquei a pensar que fosse  me levar muito tempo, e como acordei 
com muita preguiça sem vondade de fazer coisa alguma quase que desisti. Mas sempre que pensava em desistir a  imagem do gráfico não saía da cabeça. Aí pensei, que dados usar?
A primeira ideia foi de verificar a tendência dos pacotes R mais usados nos últimos 10 anos, mas muito rapidamente desisti da ideia, pois estava díficil baixar esta informação e não queria me meter em muitas linhas de código.
Depois de um tempo pensei em vendas de automoveis e, por sorte, na primeira pesquisa no GOOGLE encontrei os dados que desejava, embora não estivessem no formato desejável. Em relação ao formato,
não me assustei bastante pois, na verdade, gosto de trabalhar com dados, manipulação de dados é uma das minhas paixões. Acho que já estou a falar demais. Vamos dobrar as mangas e mostrar como funciona esta coisa de gráfico
de barras animado. De uma coisa tenho certeza, vais-te fascinar. 

Para construir o gráfico de barra animado, na qual me inspeirei (se quiseres ver um exemplo click no link https://www.youtube.com/watch?v=a3w8I8boc_I), usei dados sobre vendas de veículos motorizados, que podem ser
encontrados no senguinte link http://www.oica.net/category/sales-statistics/.

Para começar vamos importar os dados. Este exercício é quase que trivial, mas não temos como  contornar, precisamos dos dados .

```{r}
sales_data <- read.csv('sales_cars.csv',header=TRUE, stringsAsFactors =FALSE)
View(sales_data)
```
Aqui esta um extrato dos dados que serão usado para fazer o nosso pequeno exercício.
![](/img/data_sales.png)

Como pode ver, este dados não estão num formato  ideal, por outra, não estão devidamente arrumados para podermos usar no exercício de visualização. Antes de prosseguir, precisamos
 de arrumar, torna-los em *tidy data* — conceito introduzido por [Haddley Wichman](http://hadley.nz/). Para tal vou precisar da livraria `reshape2` e vamos usar a função `melt()` da livraria `reshape2`
 
 
 ```{r}
library(reshape2)
sales_tidy <- melt(sales_data)
View(sales_tidy)
```
Depois de usar a função `melt()`, que nos safa de termos que trabalhar com planilhas excel antes de importar os dados ao R, tem-se o seguinte resultado:

![](/img/data_tidy.png)

Olhando para os dados, nota-se que temos ainda temos um pequeno problema: temos a coluna *variable* que armazena os dados referente ao ano. Contudo, estes valores são antecedidos por *X*.
Precisamos remover o *X* e deixar apenas a parte númerica, de forma que o R possa reconhecer como númerico. Isto pode ser feito usando a livraria `stringr`, que é uma livraria concenbida para
trabalhar com valores textuais. Dentro desta livraria, iremos usar a função `str_remove()`

```{r}
sales_shaped <- sales_tidy %>% mutate(variable = str_remove(variable, 'X'))%>%
  rename(year = variable)
  head(sales_shaped)
  COUNTRY year value
1  ALGERIA 2005 28376
2   ANGOLA 2005  3000
3 BOTSWANA 2005  2900
4  BURKINA 2005   200
5  BURUNDI 2005   500
6 CAMEROON 2005  2200
```
Agora parece que está tudo arrumado para podermos avançar. Para o nosso exercício vamos trabalhar com os 10 países com maior número. Para tal, precisamos de em cada ano extraír os
10 países com mais vendas. Isto involve um pouco de exercício, vamos ter que agrupar os dados por ano e em cada ano extrair os 10 países com maior número de vendas.

```{r}
sales_format <- sales_shaped %>%
  group_by(year) %>%
   mutate(rank = rank(-value),
         Value_rel = value/value[rank==1],
         Value_lbl = paste0(" ",round(value/10000))) %>%
  group_by(COUNTRY) %>% 
  filter(rank <=10) %>%
  ungroup()
```

## Construíndo o gráfico estático
Depois de ter os dados devidamente arrumado ja podemos fazer o nosso gráfico. O gráfico será feito usando a livraria `ggplot2`. A ideia é para cada ano fazer um gráfico de barras com os 10
os 10 países com maior número de vendas. Estes gráficos estarão sobre postos. Não irei entrar em detallhes de como fazer gráficos usando `ggplot2`, mas não se preocupe que vem ai 
um curso sobre visaulização de dados, fique atento. 

```{r}
staticplot = ggplot(sales_format, aes(x = rank,y = value, fill = COUNTRY,color = as.factor(COUNTRY))) +
  geom_bar(stat = "identity") +
  labs(title = "Vendas de veículos motorizados em  Africa per Year: {closest_state}") +
  geom_text(aes(y = 0, label = paste(COUNTRY, " ")), vjust = 0.2, hjust = 1) +
  geom_text(aes(y=value,label = Value_lbl, hjust=0)) +
  coord_flip(clip = "off", expand = FALSE) +
  scale_y_continuous(labels = scales::comma) +
  scale_x_reverse() +
  guides(color = FALSE, fill = FALSE)+
  theme(axis.line=element_blank(),
        axis.text.x=element_blank(),
        axis.text.y=element_blank(),
        axis.ticks=element_blank(),
        axis.title.x=element_blank(),
        axis.title.y=element_blank(),
        legend.position="none",
        panel.background=element_blank(),
        panel.border=element_blank(),
        panel.grid.major=element_blank(),
        panel.grid.minor=element_blank(),
        panel.grid.major.x = element_line( size=.1, color="grey" ),
        panel.grid.minor.x = element_line( size=.1, color="grey" ),
        plot.title=element_text(size=25, hjust=0.5, face="bold", colour="grey", vjust=-1),
        plot.subtitle=element_text(size=18, hjust=0.5, face="italic", color="grey"),
        plot.caption =element_text(size=8, hjust=0.5, face="italic", color="grey"),
        plot.background=element_blank(),
        plot.margin = margin(2,2, 2, 4, "cm"))
```

## Construindo o gráfico animado

Para termos o gráfico animado, vamos usar a função `transition_states()` da livraria `gganimated`, que é a função chave para o processo de animação. Iremos também usar
a função `view_flow()`.

```{r}
anim = staticplot + transition_states(year, transition_length = 4, state_length = 1) +
  view_follow(fixed_x = TRUE)  +
  labs(title = 'Motor Vehicle Sales in Africa per Year : {closest_state}',  
       subtitle  =  "Top 10 Countries",
       caption  = "World Motor Vehicle Sales | Data Source: nternational Organization of Motor Vehicle Manufacturers")
```

## Visualizando o gráfico de barras animado.

Depois de todo este exercício chegamos ao fim. Vamos la ver como fica o nosso gráfico. Aqui vamos usar a função `animane` da livraria `gganimate`. O resultado final será visualizado em forma de GIF

```{r}
animate(anim, 200, fps = 20,  width = 1200, height = 1000, 
        renderer = gifski_renderer("gganim.gif"))

```


![](/img/gganim.gif)

