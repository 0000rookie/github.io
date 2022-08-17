---
title: 关闭Java数据库SSL安全提示
tags:
  - fail
categories:
  - 计算机科学
  - 编程语言
  - java
  - fail
abbrlink: 85111a4c
date: 2022-06-24 14:16:48
---

## SSL安全提示

强迫症的我受不了啊，必须去掉

![](http://hikki.test.upcdn.net/06-24_14-17-56.jpg)

```java
Fri Jun 24 14:21:32 CST 2022 WARN: Establishing SSL connection without server's identity verification is not recommended. According to MySQL 5.5.45+, 5.6.26+ and 5.7.6+ requirements SSL connection must be established by default if explicit option isn't set. For compliance with existing applications not using SSL the verifyServerCertificate property is set to 'false'. You need either to explicitly disable SSL by setting useSSL=false, or set useSSL=true and provide truststore for server certificate verification.
```

## 解决方法

在连接数据库的`url`加上`&verifyServerCertificate=false&useSSL=false`这样的

```java
driver=com.mysql.jdbc.Driver
url=jdbc:mysql://localhost:3306/yootk?useUnicode=true&characterEncoding=utf-8&verifyServerCertificate=false&useSSL=false
username=root
password=root
```

![](http://hikki.test.upcdn.net/06-24_14-18-36.jpg)

![](http://hikki.test.upcdn.net/06-24_14-18-56.jpg)
