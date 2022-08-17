---
title: 'ER_BAD_FIELD_ERROR: Unknown column ''undefined'' in ''field list'''
abbrlink: 12af09a9
date: 2022-07-28 22:23:40
tags:
  - NodeJs
  - fail
---

今天在写NodeJs后端时，在查询数据库出现了如下错误：

## 报错内容:

```javascript
"ER_BAD_FIELD_ERROR: Unknown column 'undefined' in 'field list'"
```



## 解决方法

SQL语句出错，前端传送过来的数据存在空字段，导致SQL语句在查询数据库时出错。

![image-20220728223139526](http://hikki.test.upcdn.net/2022/07/28-22:31:3939.png)

