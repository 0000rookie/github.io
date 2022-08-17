---
title: intellij乱码
categories:
  - 计算机科学
  - 编程语言
  - java
  - fail
abbrlink: 3dddb2b0
tags:
  - fail
date: 2022-06-22 22:35:33
---

## 方法一

### 打开设置

打开设置设置文件编码为`utf-8`

![](http://hikki.test.upcdn.net/20220630023133.jpeg)

### 打开编辑器-->文件编码

把编码改为`UTF-8`或者其他

![](http://hikki.test.upcdn.net/20220622224054.jpeg)

## 方法二

### 打开帮助

打开`打开自定义VM选项`

设置虚拟机加载为`utf-8`

![](http://hikki.test.upcdn.net/20220622224040.jpeg)

添加一条语句在配置下面

```java
-Dfile.encoding=UTF-8
```

![](http://hikki.test.upcdn.net/20220622224048.jpeg)
