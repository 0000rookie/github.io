---
title: python-math库
tags:
  - Python
categories:
  - 计算机科学
  - 编程语言
  - python
abbrlink: 1edcfdea
date: 2022-04-21 22:51:41
---

## python内置数值运算函数

python解释器内置了一些函数，以下列出部分常用函数

```python mark:1-8
abs(x)		#x的绝对值
pow(x,y[,z])#(x**y)%z,[...]表示参数可以省略，即pow(x,y),它与x**y相同
round(x[,n])#对x四舍五入，保留n位小数，round()返回四舍五入的整数
max(X~1,X~2,...X~n)#取X1到Xn的最大值，n没有限定
min(X~1,X~2,...X~n)#取X1到Xn的最小值，n没有限定
```

**pow()**常用场景

```python mark:1-5
# 求3的3的999次方结果后四位。
>>>pow(3,pow(3,999),10000) #幂运算和莫运算同时计算，速度快，常用于有周期性的数值
4587
```

## math库的使用

