---
title: javase连接数据库报错Communications link failure
tags:
  - fail
categories:
  - 计算机科学
  - 编程语言
  - fail
abbrlink: dfaf38bb
date: 2022-05-26 17:49:04
---

## DAO类

```java mark:1-50
package Dao;
import javax.swing.*;
import java.sql.*;
public class DAO {
    private static final DAO dao = new DAO();
    static {
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            JOptionPane.showMessageDialog(null, "驱动加载失败"+ e.getMessage());
            e.printStackTrace();
        }
    }
    public static Connection getConn() {
        try {
            Connection conn = null;
            String url = "jdbc:mysql://localhost:3306/news?serverTimezone=UTC";
            String username = "root";
            String password = "root";
            conn = DriverManager.getConnection(url, username, password);
            return conn;
        } catch (Exception e) {
            JOptionPane.showMessageDialog(null,"数据库连接失败!"+ e.getMessage());
            return null;
        }
    }

    public static void main(String[] args) {
        System.out.println(getConn());
    }
}

```

## pom.xml配置

```java mark:1-50
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>blog</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>18</maven.compiler.source>
        <maven.compiler.target>18</maven.compiler.target>
    </properties>

    <dependencies>
        <!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.29</version>
        </dependency>

    </dependencies>

</project>
```

报错内容

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/202205265603.jpg)



## 解决办法

我一开始启动的是`MySQL8.0.12`，然后试一下启动`MySQL5.7.26`突然可以了

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/202205265540.jpeg)

## 可能还会报错内容

在`url`加上`?serverTimezone=UTC`这一句，如下

```java mark:1-2
 String url = "jdbc:mysql://localhost:3306/news?serverTimezone=UTC";
```

