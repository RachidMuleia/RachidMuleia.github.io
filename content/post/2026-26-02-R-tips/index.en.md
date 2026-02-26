---
title: R tips - função pick()
author: 'Rachid Muleia'
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
##     nomes    teste1   teste2   teste3
## 1    Joa0 15.110957 15.17273 8.370183
## 2 Antonia  2.678051 19.61611 1.503421
## 3   Jorge 12.654636 13.36900 3.671327
## 4   Maria  5.263185 19.45009 4.570474
## 5   Joana 10.505640 13.06130 3.849988
```

Suponha que pretenda calcular a média dos testes de cada estudante e adicioná‑la ao dataset `notas_df`. Este exercício pode ser realizado de várias formas. Primeiro, vamos tentar resolver o problema usando apenas o `base R`.


``` r
notas_df$media <- rowMeans(notas_df[, c("teste1","teste2","teste3")])
head(notas_df)
```

```
##     nomes    teste1   teste2   teste3     media
## 1    Joa0 15.110957 15.17273 8.370183 12.884625
## 2 Antonia  2.678051 19.61611 1.503421  7.932529
## 3   Jorge 12.654636 13.36900 3.671327  9.898322
## 4   Maria  5.263185 19.45009 4.570474  9.761250
## 5   Joana 10.505640 13.06130 3.849988  9.138975
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
##     nomes    teste1   teste2   teste3     media media_alter
## 1    Joa0 15.110957 15.17273 8.370183 12.884625   12.884625
## 2 Antonia  2.678051 19.61611 1.503421  7.932529    7.932529
## 3   Jorge 12.654636 13.36900 3.671327  9.898322    9.898322
## 4   Maria  5.263185 19.45009 4.570474  9.761250    9.761250
## 5   Joana 10.505640 13.06130 3.849988  9.138975    9.138975
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
