---
title: "request entity too large"
tags:
  - NodeJs
  - fail
abbrlink: 111fc4eb
date: 2022-08-11 23:58:16
---

## 报错内容

```javascript
request entity too large
```

## 原因分析

![image-20220812000324928](http://hikki.test.upcdn.net/image-20220812000324928.png)

我在请求中加入了图片请求，可能是图片占用太大，导致请求失败

## 解决办法

降低请求体大小即可，将图片压缩后后再请求。
