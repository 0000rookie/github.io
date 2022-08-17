---
title: javase基础
categories:
  - 计算机科学
  - 编程语言
  - java
abbrlink: f2edc254
date: 2022-05-17 17:00:53
tags:
---

## 访问控制

|              | private | default | protected | public |
| ------------ | ------- | ------- | --------- | ------ |
| 同一类       | yes     | yes     | yes       | yes    |
| 同一包的类   |         | yes     | yes       | yes    |
| 子类         |         |         | yes       | yes    |
| 其他包中的类 |         |         |           | yes    |

## 可变长参数

```java
public static void text(String ... arr){}
```

```java
// 一般把固定参数放在首位，不然在传参的时候，JVM识别不出来那个是其他
public static void text(int a,String ... arr){}
```

