---
title: P-value, a obsessão dos médicos e profissionais de saúde na pesquisa
author: Rachid Muleia
date: '2026-03-18'
slug: p-value-obsessao-medicos
categories: []
tags:
  - Estatística
  - p-value
  - P-hacking
  - Investigação clínica
subtile: 
summary: 'Neste artigo abordo a mística em torno do p-value, o "amuleto" de muitos investigadore, e trago uma reflexão a volta do seu racional que é vital para integridade científica.'
authors: []
lastmod: '2026-03-18T11:09:46+02:00'
featured: no
image:
  caption: ''
  focal_point: ''
  preview_only: no
projects: []
---



No meu dia a dia, divido o meu tempo a apoiar médicos, epidemiologistas e profissionais de saúde pública na análise de dados complexos, provenientes de grandes inquéritos. Quase sempre que um colega me aborda, traz consigo um pedido inegociável, o `p-value` não pode faltar.   Mesmo quando não é apropriado fazem a questão de insistir que `p-value` deve estar lá presente, como se este fosse o “sal para o bom tempero dos alimentos”. Esta fixação é tão profunda que já vi colegas estatísticos perderem a paciência diante de tanta  insistência, inclusive eu. 

Certa vez, uma colega profissional de estatística conta-me que foi abordada por uma médica para analisar uma base de dados onde o objectivo trazer estatísticas sobre qualidade de dados de um determinado programa que eram colhidos de forma rotineira. Ela entendia que, trazer dados sobre a cobertura das intervenções, presença de valores atípicos e omissos, e trazer algumas estatísticas descritivas que permitissem criar uma narrativa um pouco robusta sobre a qualidade de dados. No entanto, para a solicitante, no entender dela, aquelas análises não eram convincentes, pois faltava ali o `p-value`.  A colega, profissional de estatística, defendia que não era imperioso trazer o `p-value`. A discussão foi tão acesa que ela nunca mais terminava as análises. De tanto exausta, ela acabou desabafando: “Estes médicos são tão obcecados pelo `p-value`.”

Este episódio ilustra perfeitamente a provocação de Stephen Senn:


>*Estatística é uma área que a maioria dos estatísticos considera difícil, mas na qual quase todos os médicos são especialistas.*

Depois de tantos episódios similares, devo confessar que nunca concordei tanto com Stphen Seen. Alias, é preciso também notar que muitos estudos publicados, até em revistas científicas de renome, as análises estatísticas não são feitas por profissionais de estatística, não que não existam profissionais de saúde na pesquisa bem treinados para fazer analises estatísticas com razoabilidade científica. 

O mais intrigante, e simultaneamente triste, é que esta busca incessante pelo `p-value` empurra muitos profissionais para caminhos éticos questionáveis, como o data snooping ou o p-hacking. Estas práticas consistem na manipulação dos dados até que a significância estatística finalmente surja, subvertendo o princípio fundamental da investigação de que a análise deve seguir rigorosamente um plano definido a priori., isto é, um protocolo de análise deve ser estabelecido muito antes do contacto com os dados e não deve, sob circunstância alguma, ser alterado para acomodar achados oportunistas durante o processo. Infelizmente, esta integridade científica é muitas vezes sacrificada para agradar a financiadores ou para garantir que os resultados sejam aceites pela comunidade científica, que ainda privilegia excessivamente os resultados positivos.


Porque esta obsessão pelo `p-value`, que não só se regista nos profissionais de saúde na pesquisa, mas também com outros profissionais de outras áreas?  As razões são várias, mas acho que fraca literacia estatística pode estar por de trás de tanto abuso do `p-value` e, por de alguma forma ter-se criado a narrativa de que resultados estatisticamente significativos são os mais relevantes. Ademais, várias revistas cientificas, historicamente, olharam para resultados não estatisticamente significativos (`p-value` > 0.05) com algum desdém.  Então, todo mundo acaba correndo a traz da significância estatística como forma de garantir aceitação dos seus resultados. No entanto, há variarias coisas que o `p-value` na revela. 

Antes de questionar o uso do `p-value`, talvez devamos dar um passo atrás: o que  de facto é o `p-value`? Para muitos, ele é a cereja no topo do bolo, mas será que sabemos o que estamos celebrando?" O `p-value` é, puramente, uma probabilidade. Porém, a pergunta de um milhão de dólares é: probabilidade de quê?  

Imagine que deseja testar se um novo fármaco é capaz de reduzir a pressão arterial. O ponto de partida é definir a Hipótese Nula (H0), que assume o cenário céptico: o de que o fármaco não faz diferença nenhuma e a redução média é zero. Do outro lado, temos a Hipótese Alternativa (H1), que é a nossa aposta de que o fármaco realmente reduz a pressão, gerando uma diferença menor que zero. O papel do `p-value` é justamente medir o quão compatíveis os dados que tem em mãos são com o cenário de 'nenhum efeito'. Tecnicamente, o `p-value` representa a probabilidade de obter um resultado igual ou mais extremo do que o observado, assumindo que o fármaco seja, na verdade, inútil. Quanto menor for essa probabilidade, menor é a compatibilidade dos dados com a hipótese nula, o que fortalece as evidências a favor do fármaco.

Para ilustrar de outra forma, suponha que mediu a Pressão Arterial Sistólica (PAS) de um grupo de pacientes e, após o tratamento, observou uma redução média de 10 mmHg. A questão central é saber se esta redução foi causada pelo fármaco ou se resultou meramente do acaso. Se o seu `p-value` for calculado em 0,03, este valor indica que a probabilidade de encontrar uma redução de 10 mmHg ou mais, apenas por sorte, seria de apenas 3 em cada 100 tentativas. Sendo esta probabilidade tão baixa, conclui-se que os dados favorecem a hipótese alternativa. Por outro lado, se o `p-value` fosse de 0,25 (25%), isso significaria que, mesmo que o novo fármaco não tivesse efeito nenhum, haveria uma probabilidade de 25% de observar essa redução por variação natural dos dados (um risco demasiado alto para descartar a influência do acaso). 

É preciso compreender que não rejeitar a hipótese nula não significa ausência de efeito; indica apenas que, com os dados disponíveis, não existe evidência estatística suficiente para confirmar a presença de um benefício. Da mesma forma, rejeitar a hipótese nula não prova a existência de um efeito absoluto. O que a rejeição indica é que os dados observados são muito mais compatíveis com a hipótese alternativa do que com a nulidade. Portanto, mesmo um resultado estatisticamente significativo não deve ser interpretado como uma verdade científica inquestionável, pois o `p-value` é influenciado por diversos factores, sendo o tamanho da amostra um dos mais críticos. Amostras excessivamente grandes podem detectar efeitos minúsculos que, embora significativos na estatística, não possuem qualquer relevância clínica ou prática. Em contrapartida, amostras reduzidas podem falhar em demonstrar significância, mesmo quando existe um efeito que, na prática médica, seria de extrema importância



Em virtude da má interpretação e do uso abusivo do `p-value`, a Associação Americana de Estatística (ASA) publicou, em 2016, uma declaração oficial com o intuito de esclarecer o que o `p-value` realmente representa, e pode muito bem ser encontrada em https://doi.org/10.1080/00031305.2016.1154108. Este artigo  destaca seis princípios fundamentais que todo investigador deve ter em conta:

- __Incompatibilidade com o modelo__: O `p-value` indica o quão incompatíveis os dados observados são com um modelo estatístico específico (geralmente o modelo de "nenhum efeito").
-	__Não mede a verdade da hipótese__: Ele não mede a probabilidade de a hipótese em estudo ser verdadeira, nem garante que os dados tenham sido gerados de forma puramente aleatória.
-	__Decisões não devem ser binárias__: Conclusões científicas e decisões empresariais ou políticas não devem basear-se apenas no facto de um `p-value` ultrapassar um determinado limiar (como o clássico 0,05).
-	__Transparência e Reprodutibilidade__: Uma inferência apropriada exige total transparência científica. O processo de análise deve ser claro para permitir a reprodutibilidade dos resultados.
-	__Magnitude vs. Significância__: O `p-value`, ou a significância estatística, não mede a magnitude de um efeito nem a importância prática de um resultado.
-	__Evidência Isolada__: Por si só, o `p-value` não constitui uma medida robusta de evidência relativamente a um modelo ou a uma hipótese.

É comum encontrar investigadores que, ao depararem-se com um `p-value`=0,000001, ficam maravilhados e até dize que os resultados são "altamente significativos". No entanto, é preciso ter cautela: um valor extremamente baixo pode ser apenas um indicativo de má especificação do modelo ou do uso de uma amostra tão grande que os testes estatísticos se tornam tão potente ao ponto de detectar ruídos sem qualquer utilidade clínica.

Ao reportar resultados, é imperativo olhar para além do `p-value`. Olhe igualmente para medidas como Intervalos de Confiança (IC), que nos oferecem uma visão um pouco mais clara sobre a incerteza em torno do efeito estimado. Ademais, vale notar que resultados estatisticamente significativos com ICs excessivamente largos indicam uma precisão precária, deixando dúvidas sobre o verdadeiro impacto da intervenção. Em suma, a estatística deve ser sempre acompanhada pelo conhecimento profundo da área ou relevância clínica, sob pena de ter conclusões vazias. 








