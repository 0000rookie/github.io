---
title: window系统查看端口并杀掉
categories:
  - 计算机科学
  - 技术杂谈
  - window
abbrlink: b7d12f04
date: 2022-07-04 14:52:01
tags:
---



## 查看全部端口情况

```bash
netstat -ano
```

![](http://hikki.test.upcdn.net/20220704150846.jpeg)

## 查找端口

```bash
netstat -ano|findstr "622"
```

最后边有个`4560`是`PID`，可以通过`PID`查找出对应的进程

![](http://hikki.test.upcdn.net/20220704150859.jpeg)

## 查找端口对应进程

```bash
tasklist | findstr "4560"
```

![](http://hikki.test.upcdn.net/03.jpg)

## 结束该进程

```bash
taskkill /f /t /im svchost.exe
```

![](http://hikki.test.upcdn.net/20220704151253.jpeg)

## 或者可以通过PID来查找占用进程

![](http://hikki.test.upcdn.net/20220704151640.jpeg)

