---
layout: post
title: "Power comparison  for normality tests:"
tags: [rstats, r, r-bloggers]
date: 2017-09-20 01:13:20 -0700
comments: true
show-share: true
show-subscribe: true
---
### A small note for practitioner: What Normality test should I use?
In statistics, it is quite common to assume that the data follow a normal distribution. In other words, most statistical techniques assume that the data comes from a normally distributed population. Consequently, when the data do not follow a normal distribution, every inferential apparatus becomes compromised. Being this a crucial assumption for the success of statistical inference, it is particularly "imperative" before proceeding with any kind of analysis to verify if the data follows a normal distribution or not. Nevertheless, practitioners are confronted with the difficult to choose the right procedure to assess normality.

The literature has a wide range of methods to check for normality, though knowing the right one is crucial. One can either check for normality using informal or formal procedures. Informal procedures comprise of assessing normality using whether graphical assessment or numerical assessment. The graphical assessment consists of inspecting for normality using plots, like histogram, box-plot, Q-Q plot, probability plots, etc., whereas numeric procedures comprise measures such as skewness, kurtosis and other statistics moments. The quest for normality should not be solely assessed using informal methods but they should be followed by a formal test as well. Currently many are the means to formally assess normality. Thode (2002) makes a thorough  review of means to assess normality, ranging from empirical distribution function tests to moment test.

Although there are plenty format test to inspect normality, practitioners are still confronted with which test to use to check formality.  Frankly speaking this is not an easy task, and each of the  formal test has its pros and cons. Nevertheless, depending on features like sample size, symmetry and skewness, so to speak, there are those that perform better. Being aware of this  difficulty, I decided to select some empirical distribution function test available in base  R package and in the package “nortest”, and try to find out the most powerful test  that can be used to assess normality.

The base R package includes Shapiro-Wilk and Kolmogorov Kolmogorov-Smirnov, whereas the package “nortest” embodies more test, namely Anderson-Darling, Cramer-von Mises, Lilliefors (this is a modified version of Kolmogorov-Smirnov test), Pearson chi-square, and Shapiro-Francia test. Among these tests, the power comparison is only done for some that I find to be the most used test to check for normality.
The power of the selected test was done for some selected sample size and for a significance level of 5%. Furthermore, the tests were conducted on data simulated from two symmetric non-normal distribution, one being Gamma distribution with shape=100 and rate=1, and another being a Beta with shape and scale equal 2, respectively.

Figure 1 shows the power comparison under the aforementioned distribution. Under the gamma distribution on the left panel one can see that, although the power does not increase slowly with sample size, Shapiro Wilk outperforms all test then is followed by Shapiro-Francia and Anderson-Darling. The same pattern is observed on the plot on the right-hand side. On both plots, it is also apparent the Kolmogorov-Smirnov poorly performs. Additionally, it can be observed that for small sample sizes almost all the tests show a lower power, pointing out that for small sample size the test should be used with caution.

![power plot gammma distribution ](/img/graph1.png) ![beta distribution](/img/graph2.png) 
Figure 1: Power comparison: On the left panel power comparison under gamma distribution, and on the right panel power comparison under beta distribution.


### Concluding remarks
The quest for normality is not such is, despite the rich availability of tests, one needs to carefully select the most reasonable one given the data at hand. As observed on the plot, it was possible to notice that for some distributions the power is lower. Moreover, the use of only formal tests to assess normality is not a wise choice as they do not reveal the reasons for rejection of normality assumption. Therefore, the formal tests must go hand in hand with the informal means. Additionally, when using formal test, I would consider more than one test just to have a good feeling of the data.  It is important to be aware that the presented tests do not perform very well for small sample size. 

Here I presented the empirical distribution function tests, next time I  expect to bring a comparison among some moment tests. 

### References.
Thode, H. C. (2002). Testing for normality (Vol. 164). CRC press.

### R code
```R
#Shapiro-Wilk
possible.ns=c(10,20,30,seq(from=50, to=2000, by=50))
powers.sh=matrix(data=NA, nrow = length(possible.ns), ncol=2)
alpha=0.05 
sims=500 
for (j in 1:length(possible.ns)){
  N=possible.ns[j]
  significant.tests <- rep(NA, sims) 
  
  for (i in 1:sims){
    x=rbeta(N,2,2)
    p.value <- shapiro.test(x)$p.value
    significant.tests[i]=(p.value<=alpha)
  }
  powers.sh[j,]=c(mean(significant.tests),possible.ns[j])
}
#Anderson-Darling test
powers.ad=matrix(data=NA, nrow = length(possible.ns), ncol=2)
for (j in 1:length(possible.ns)){
  N=possible.ns[j]
  significant.tests <- rep(NA, sims) 
  
  for (i in 1:sims){
    x=rbeta(N,2,2)
    p.value <- ad.test(x)$p.value
    significant.tests[i]=(p.value<=alpha)
  }
  powers.ad[j,]=c(mean(significant.tests),possible.ns[j])
}

#Cramer-von Mises test
powers.cvm=matrix(data=NA, nrow = length(possible.ns), ncol=2)
for (j in 1:length(possible.ns)){
  N=possible.ns[j]
  significant.tests <- rep(NA, sims) 
  
  for (i in 1:sims){
    x=rbeta(N,2,2)
    p.value=cvm.test(x)$p.value
    significant.tests[i]=(p.value<=alpha)
  }
  powers.cvm[j,]=c(mean(significant.tests),possible.ns[j])
}

#Lilliefors test
powers.lil=matrix(data=NA, nrow = length(possible.ns), ncol=2)
for (j in 1:length(possible.ns)){
  N=possible.ns[j]
  significant.tests <- rep(NA, sims) 
  
  for (i in 1:sims){
    x=rbeta(N,2,2)
    p.value <- lillie.test(x)$p.value
    significant.tests[i]=(p.value<=alpha)
  }
  powers.lil[j,]=c(mean(significant.tests),possible.ns[j])
}

#Shapiro-Francia 
powers.sf=matrix(data=NA, nrow = length(possible.ns), ncol=2)
for (j in 1:length(possible.ns)){
  N=possible.ns[j]
  significant.tests <- rep(NA, sims) 
  
  for (i in 1:sims){
    x=rbeta(N,2,2)
    p.value <- sf.test(x)$p.value
    significant.tests[i]=(p.value<=alpha)
  }
  powers.sf[j,]=c(mean(significant.tests),possible.ns[j])
}

#Kolmogorov-Smirnov 
powers.ks=matrix(data=NA, nrow = length(possible.ns), ncol=2)
for (j in 1:length(possible.ns)){
  N=possible.ns[j]
  significant.tests <- rep(NA, sims) 
  
  for (i in 1:sims){
    x=rbeta(N,2,2)
    p.value <- ks.test(x, "pnorm", mean=mean(x), sd=sd(x))$p.value
    significant.tests[i]=(p.value<=alpha)
  }
  powers.ks[j,]=c(mean(significant.tests),possible.ns[j])
}

pw=cbind(powers.ad[,1],powers.sh[,1],powers.cvm[,1],powers.lil[,1],powers.sf[,1], powers.ks[,1],powers.ad[,2])
windows()
plot(pw[,7],pw[,2], type='n', ylim=c(0,1), ylab="Simulated power", xlab="Sample size")
for(i in 1:6){
  lines(pw[,7],pw[,i],col=i, lwd=2)
}
legend(1600,0.9,c("AD","SW","CVM","LL","SF","KS"),col=c(1,2,3,4,5,6),lwd=c(2,2,2,2,2,2))
```

The code presented here is a modified version of the code written  by [Rogerio Jeronimo Barbosa](https://www.researchgate.net/post/how_can_i_estimate_the_power_of_different_normality_tests_using_R_language)



