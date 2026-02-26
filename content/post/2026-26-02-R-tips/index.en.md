---
title: R tips-função pick()
author: ''
date: '2026-26-02'
slug: manipulacao-dados-pick
categories: []
tags:
  - dplyr
  - pick
  - R
subtitle: A função `pick()` da livraria `dplyr` 
summary: 'Neste post mostro como usar a função `pick()` para facilitar o processo de manipulação de dados'
authors: []
lastmod: '2026-26-02T14:59:14+02:00'
featured: no
image:
  caption: ''
  focal_point: ''
  preview_only: no
projects: []
---



O processo de tratamento e manipulação de dados é uma das etapas que mais tempo consome durante a análise de dados. Então, é importante conhecer alguma funções que possam tornar essa jornada um pouco mais leve. 

Hoje, eu trago a função `pick()`, que parece ser irrelevante, pois ela faz algo similar ao que a função `select()` da livraria `dplyr` faz. No entanto, durante o processo de tratamento de dados, uma das coisas que pretente-se evitar é perder muito tempo, e ter um codigo mais compacto. 

Para percebermos melhor como podemos usar a função `pick()` vamos gerar uma base de dados  com notas de teste para um certo grupo de estudantes. 


``` r
notas_df <- data.frame(nomes = c("Joa0", "Antonia", "Jorge", "Maria","Joana"),
                       teste1 = runif(5,0, 20),
                       teste2 = runif(5,0,20),
                       teste3 = runif(5,0,20))

head(notas_df)
```

```
##     nomes     teste1    teste2    teste3
## 1    Joa0 19.1021154 17.169452  6.580388
## 2 Antonia  0.1605022 10.081322 14.226342
## 3   Jorge 11.5979238  3.335162  6.736715
## 4   Maria  8.0854757  3.674658 13.964671
## 5   Joana  4.9825750 15.742856 18.644093
```

Suponha que pretenda calcular a média dos testes de cada estudante e adicioná‑la ao dataset `notas_df`. Este exercício pode ser realizado de várias formas. Primeiro, vamos tentar resolver o problema usando apenas o `base R`.


``` r
notas_df$media <- rowMeans(notas_df[, c("teste1","teste2","teste3")])
head(notas_df)
```

```
##     nomes     teste1    teste2    teste3     media
## 1    Joa0 19.1021154 17.169452  6.580388 14.283985
## 2 Antonia  0.1605022 10.081322 14.226342  8.156055
## 3   Jorge 11.5979238  3.335162  6.736715  7.223267
## 4   Maria  8.0854757  3.674658 13.964671  8.574935
## 5   Joana  4.9825750 15.742856 18.644093 13.123175
```


Observe que, no código anterior, tivemos de criar a variável media, à qual atribuimos a média calculada através da função `rowMeans()`, que permite calcular a média na horizontal, isto é, linha a linha. No entanto, se você aprecia as funções da livraria dplyr, em especial a função `mutate()`, que permite criar ou adicionar novas variáveis, pode muito bem usar a função `pick()`.




``` r
library(dplyr)
```

```
## 
## Attaching package: 'dplyr'
```

```
## The following objects are masked from 'package:stats':
## 
##     filter, lag
```

```
## The following objects are masked from 'package:base':
## 
##     intersect, setdiff, setequal, union
```

``` r
notas_df <- notas_df |>
  mutate(
    media_alter = rowMeans(pick(teste1,teste2,teste3))
  )

head(notas_df)
```

```
##     nomes     teste1    teste2    teste3     media media_alter
## 1    Joa0 19.1021154 17.169452  6.580388 14.283985   14.283985
## 2 Antonia  0.1605022 10.081322 14.226342  8.156055    8.156055
## 3   Jorge 11.5979238  3.335162  6.736715  7.223267    7.223267
## 4   Maria  8.0854757  3.674658 13.964671  8.574935    8.574935
## 5   Joana  4.9825750 15.742856 18.644093 13.123175   13.123175
```

Repare que, na verdade, a função `pick()` cria um subconjunto que contém as variáveis `teste1`, `teste2` e `teste3`, e tudo isso é feito dentro da função `mutate()` sem precisar referenciar o data frame, isto é, sem escrever `notas_df$teste1`.

Uma das coisas que aprecio nas funções da livraria `dplyr` é a possibilidade de usar o `data masking`, que permite aceder às variáveis diretamente, sem referenciar a base de dados ou usar aspas.




<script src="https://utteranc.es/client.js"
        repo="RachidMuleia/RachidMuleia.github.io"
        issue-term="pathname"
        label="Comment"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
