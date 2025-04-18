---
title: Como manipular ficheiros pdf em R
author: ''
date: '2023-11-04'
slug: como-manipular-ficheiros-pdf
categories: []
tags:
  - pdftools
  - ficheiros pdf
  - R
subtitle: Manipulação de ficheiros em pdf
summary: 'Este post mostra como manipular ficheiros pdf usano a livraria `pdftools`, usando a funções `pdf_combine`, `pdf_split` e `pdf_split`'
authors: []
lastmod: '2023-11-04T20:40:14+02:00'
featured: no
image:
  caption: ''
  focal_point: ''
  preview_only: no
projects: []
---



## Como manipular ficheiros em pdf usando o R


O <i class="fab fa-r-project" aria-hidden="true" style="color:#035AA6"></i> nunca pára de me supreender, e sempre tenho tido, com o  <i class="fab fa-r-project" aria-hidden="true" style="color:#035AA6"></i> pode-se fazer tudo. E hoje, gostava de mostrar como podemos manipular ficheiros `pdf` usando a livraria  `pdftools`. Esta livraria tem varias funcionalidades para manipular ficheiros `pdf`. Contudo, para este post irei mostrar como podemos juntar vários ficheiros `pdf` num único ficheiros, como separar ficheiros e como seleccionar algumas páginas de um ficheiro `pdf`. 


Vamos, primeiro, mostrar como extrair/seleccionar uma determinada página num ficheiro pdf



```r
library(pdftools)

# extraír algumas páginas de um ficheiro pdf
url_doc1 <-  'https://rachidmuleia.com/project/2023-03-14-programacao-estatistica/Aula_Estruturas_Dados.pdf'
pdf_subset(input = url_doc1, # nome o ficheiro onde faremos a extração
           output = 'aulas_primeiras_paginas.pdf', # nome do ficheiro com as paginas extraídas
           pages = c(1,10,12) # páginas a extrair
    )
```

Para combinar vários ficheiros `pdf` num único ficheiro, usamos a função `pdf_combine`. Esta função pode-se usar para combinar, por exemplo, a sua carta de candidatura, CV e os seus certificados para submissão em uma vaga de emprego. Então, não precisa mais sofrer em pagar alguns softwares comerciais para tal.


```r
library(pdftools)

# combinar varios ficheiros pdf  

 url_doc1 <- 'https://rachidmuleia.com/project/2023-03-14-programacao-estatistica/Aula_Estruturas_Dados.pdf'
 
 url_doc2 <- 'https://rachidmuleia.com/project/2023-03-14-programacao-estatistica/Importacao_Dados.pdf'
pdf_combine(input = c(url_doc1,url_doc2 ), #vector com as urls dos ficheiros a combinar
            output = 'ficheiro_combinado.pdf' # nome do ficheiro com os pdfs combinados
            )
```

Repare que neste exemplo considero documentos em uma `url`, mas também podemos ler considerar documentos armazenados localmente (no directório de trabalho ou indicando o directório que contém os ficheiros ). 



```r
library(pdftools)

# combinar varios ficheiros pdf  


pdf_combine(input = c('Aulas_Estruturas_Dados.pdf','Importacao_Dados.pdf'), #vector com os nomes dos ficheiros a combinar
            output = 'ficheiro_combinado.pdf' # nome do ficheiro com os pdfs combinados
            )

Por último, temos a função `pdf_split` que permite separar um ficheiro pdf em vários, onde temos um ficheiro para cada página. 
```

```r
library(pdftools)

# separar ficheiro pdf em vários ficheiros pdf

pdf_split(input = 'https://rachidmuleia.com/project/2023-03-14-programacao-estatistica/Aula_Estruturas_Dados.pdf')
```


Espero que tenha gostado do post. Partilhe e deixe aqui o seu comentário!!!
 


<script src="https://utteranc.es/client.js"
        repo="RachidMuleia/RachidMuleia.github.io"
        issue-term="pathname"
        label="Comment"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
