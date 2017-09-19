---
layout: post
title: "Power comparison  for normality test:"
tags: [rstats, r, r-bloggers]
date: 2017-09-20 01:13:20 -0700
comments: true
show-share: true
show-subscribe: true
---
### A small not for practitioner 
In statistics, it is quite common to assume that the data follow a normal distribution. In other words, most statistical techniques assume that the data comes from a normally distributed population. Consequently, when the data do not follow a normal distribution, every inferential apparatus becomes compromised. Being this a crucial assumption for the success of statistical inference, it is particularly "imperative" before proceeding with any kind of analysis to verify if the data follows a normal distribution or not. Nevertheless, practitioners are confronted with the difficult to choose the right procedure to assess normality.

The literature has a wide range of methods to check for normality, though knowing the right one is crucial. One can either check for normality using informal or formal procedures. Informal procedures comprise of assessing normality using whether graphical assessment or numerical assessment. The graphical assessment consists of inspecting for normality using plots, like histogram, box-plot, Q-Q plot, probability plots, etc., whereas numeric procedures comprise measures such as skewness, kurtosis and other statistics moments. The quest for normality should not be solely assessed using informal methods but they should be followed by a formal test as well. Currently many are the means to formally assess normality. Thode (2002) makes a thorough  review of means to assess normality, ranging from empirical distribution function tests to moment test.

Although there are plenty format test to inspect normality, practitioners are still confronted with which test to use to check formality.  Frankly speaking this is not an easy task, and each of the  formal test has its pros and cons. Nevertheless, depending on features like sample size, symmetry and skewness, so to speak, there are those that perform better. Being aware of this  difficulty, I decided to select some empirical distribution function test available in base  R package and in the package “nortest”, and try to find out the most powerful test  that can be used to assess normality.

The base R package includes Shapiro-Wilk and Kolmogorov Kolmogorov-Smirnov, whereas the package “nortest” embodies more test, namely Anderson-Darling, Cramer-von Mises, Lilliefors (this is a modified version of Kolmogorov-Smirnov test), Pearson chi-square, and Shapiro-Francia test. Among these tests, the power comparison is only done for some that I find to be the most used test to check for normality.
The power of the selected test was done for some selected sample size and for a significance level of 5%. Furthermore, the tests were conducted on data simulated from two symmetric non-normal distribution, one being Gamma distribution with shape=100 and rate=1, and another being a Beta with shape and scale equal 2, respectively.

Figure 1 shows the power comparison under the aforementioned distribution. Under the gamma distribution on the left panel one can see that, although the power does not increase slowly with sample size, Shapiro Wilk outperforms all test then is followed by Shapiro-Francia and Anderson-Darling. The same pattern is observed on the plot on the right-hand side. On both plots, it is also apparent the Kolmogorov-Smirnov poorly performs. Additionally, it can be observed that for small sample sizes almost all the tests show a lower power, pointing out that for small sample size the test should be used with caution.

![power plot gammma distribution ](/img/graph1.png) ![beta distribution](/img/graph2.png) 


