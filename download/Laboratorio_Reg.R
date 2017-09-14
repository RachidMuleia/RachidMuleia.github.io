
pkgs=c("corrplot","visreg","rgl","knitr","scatterplot3d")
instal=lapply(pkgs, install.packages)
call_libr=lapply(pkgs, library)

library(car)
library(corrplot) # We'll use corrplot later on in this example too.
library(visreg) # This library will allow us to show multivariate graphs.
library(rgl)
library(knitr)
library(scatterplot3d)

data("Prestige")
head(Prestige)

str(Prestige)

summary(Prestige)

Prestige[which(Prestige$prestige==87.20),]

newdata = Prestige[,c(1:4)]
summary(newdata)
windows()
plot(newdata$education^2,newdata$income)
plot(newdata, pch=16, col="blue", main="Matrix Scatterplot of Income, Education, Women and Prestige")
cor(newdata)
#cor.test(newdata)


hist(log(newdata$income))


mod0 = lm(income ~ education + prestige+ women, data=newdata)
summary(mod0)

#newdata[which(newdata$education==0 & newdata$prestige==0 & newdata$women==0),]
education.c=newdata$education-mean(newdata$education, na.rm=TRUE)
education.c = scale(newdata$education, center=TRUE, scale=FALSE)
prestige.c = scale(newdata$prestige, center=TRUE, scale=FALSE)
women.c = scale(newdata$women, center=TRUE, scale=FALSE)


# bind these new variables into newdata and display a summary.
new.c.vars = cbind(education.c, prestige.c, women.c)
newdata = cbind(newdata, new.c.vars)
names(newdata)[5:7] = c("education.c", "prestige.c", "women.c" )
summary(newdata)

#fit a linear model and run a summary of its results.
mod1 = lm(income ~ education.c + prestige.c + women.c, data=newdata)
summary(mod1)

mod11 = lm(log(income) ~ education.c + prestige.c + women.c, data=newdata)
summary(mod11)
hist(mod1$residuals)
qqnorm(mod1$residuals)
qqline(mod1$residuals, col="red")
shapiro.test(mod1$residuals)
plot(mod1$fitted.values,mod1$residuals)
abline(h=0)
confint(mod1, level=0.95)
# fit a linear model excluding the variable education
mod2 = lm(income ~ prestige.c + women.c, data=newdata)
summary(mod2)


# Plot model residuals.
plot(mod2, pch=16, which=1)
abline(h=0)

res1=mod1$residuals[which(mod1$residuals<median(mod1$residuals))]
res2=mod1$residuals[which(mod1$residuals>median(mod1$residuals))]
res.y1=rep(1,times=length(res1))
res.y2=rep(2,times=length(res2))
res.all=c(res1,res2)
res.y.all=factor(c(res.y1, res.y2))
leveneTest(res.all, res.y.all)

confint(mod1, level=0.95)
#fit a model excluding the variable education,  log the income variable.
mod3 = lm(log(income) ~ prestige.c + I(prestige.c^2) + women.c + I(women.c^2) , data=newdata)
summary(mod3)

qqnorm(mod3$residuals)
qqline(mod3$residuals, col="red")
hist(log(newdata$income))
shapiro.test(mod3$residuals)


confint(mod3, level=0.95)

influence(mod3) # regression diagnostics
