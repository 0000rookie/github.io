---
title: 'ER_DATA_TOO_LONG: Data too long for column ''password'' at row 1'
tags:
  - NodeJs
  - fail
abbrlink: 110c21d6
date: 2022-08-10 22:05:35
---

## 报错内容

```json
"ER_DATA_TOO_LONG: Data too long for column 'password' at row 1"
```

## 原因

数据库中`password`	写入的长度为300，但是`password`字段的长度只有200，因此报错

![image-20220810220729082](http://hikki.test.upcdn.net/image-20220810220729082.png)

## 解决问题

将数据库中`password`字段的长度增大即可。
