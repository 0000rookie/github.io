---
title: GitHub使用技巧
tags:
  - 教程
categories:
  - 计算机科学
  - 技术杂谈
  - github
abbrlink: 9b0876ac
date: 2022-05-08 20:36:25
---

## 高级搜索

```mark:1-2
脚本 stars:>1000 pushed:>2022-01-01 language:python
```

## 仓库内查找文件

example:我想打开`Java/src/main/java/com/thealgorithms/backtracking/Combination.java`这个文件

如果我是一个个文件夹打开非常麻烦，我可以直接按t键，直接输入目录。

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022055154.jpeg)

按`t键`可以在输入目录到达想去的目录

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022055201.jpeg)

按`L键`跳转到指定行数

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022055412.jpeg)

`点击行号`复制当行代码、生成永久链接，代码更新及时通知等

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022055533.jpeg)

按`b键`快速查看该文件的改动记录

`Ctrl+K`可以搜索项目内的文件

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022050200.jpeg)

## VScode阅读项目代码

### 按`。键`打开网页版的VScode

网页版的VScode还可以在线安装插件，和本地的VScode基本没差别

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022050257.jpeg)

## GitHub在线运行项目代码

在链接前面加上`gitpod.io/#/`前缀

```java
example: https://gitpod.io/#/github.com/TheAlgorithms/Java
```

在`Github`运行项目会自动识别是什么语言，安装各种依赖，不需要自己重新安装，方便许多。以后再也不用把代码`clone`到本地再一个个安装依赖包，又各种报错了

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022050754.jpeg){width="50%" height="50%"}

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022050726.jpeg)
