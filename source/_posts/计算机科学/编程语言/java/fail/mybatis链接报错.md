---
title: "Can't find resource for bundle java.util.PropertyResourceBundle, key host"
categories:
  - 计算机科学
  - 编程语言
  - java
  - fail
abbrlink: 8a90aba9
date: 2022-06-18 18:24:01
tags:
  - fail
---



## 报错内容

```java
Caused by: java.util.MissingResourceException: Can't find resource for bundle java.util.PropertyResourceBundle, key host
```

## 分析错误

可能是连接数据库链接出错

### `database.properties`文件

```java
driver = com.mysql.jdbc.Driver
url = jdbc:mysql://localhost:3306/yootk?useUnicode=true&characterEncoding=utf-8
username=root
password=root
```

