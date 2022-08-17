---
title: 'Maven build失败 MAVEN:单元测试报错'
tags:
  - fail
categories:
  - 计算机科学
  - 编程语言
  - java
  - fail
abbrlink: a96b8873
date: 2022-05-09 11:36:50
---

## 报错内容~1~{.red}

[ERROR] Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin:3.1:compile (default-compile) on project lab11: Compilation failure: Compilation failure:  

[ERROR] 不再支持源选项 5。请使用 7 或更高版本。 

[ERROR] 不再支持目标选项 5。请使用 7 或更高版本。

### 解决办法

在pom.xml添加插件级可以解决

```xml
  <build>
   <plugins>
       <plugin>
           <groupId>org.apache.maven.plugins</groupId>
           <artifactId>maven-compiler-plugin</artifactId>
           <configuration>
               <source>1.8</source>
               <target>1.8</target>
               <encoding>UTF-8</encoding>
           </configuration>
       </plugin>
   </plugins>
</build>
```



## 报错内容~2~{.red}

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022051525.jpeg)

### 解决办法

其实在pom.xml依赖有重复了，删掉就没问题了



## 单元测试成功

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022051530.jpeg)
