---
title: 第五篇：安装Hexo---从0基础搭建Hexo博客
tags:
  - 博客
  - 教程
categories:
  - 计算机科学
  - 博客
  - 零基础搭建Hexo个人博客系列
path: 计算机科学\博客\零基础搭建Hexo个人博客系列
abbrlink: 87b69652

date: 2022-03-30 00:25:26
updated: 
---

## 安装Hexo

### 新建一个仓库

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/2022053224.jpeg)

### 给仓库起个名

格式为  `账号名.github.io`

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/2022053256.jpeg)

### 打开`stetings`

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/2022053307.jpeg)

### 打开GitHub pages

滑到下面，找到这个`GitHub pages` ，点击打开

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/2022053325.jpeg)

出现以下图说明成功了

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/2022053334.jpeg)

### 新建blog文件夹

新建一个`blog`文件夹，在`blog`文件夹打开`Git Bash Here`

### ![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/2022053344.jpeg)安装`hexo-cli`插件

``` bash mark:1
npm install -g hexo-cli
```

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/2022053410.jpg)



### 初始化博客

```bash mark:1
hexo init
```

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/2022053447.jpeg)

### 静态部署博客

```bash mark：1
hexo g
```

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/2022053502.jpeg)

### 打开本地服务器

```bash mark:1
hexo s
```

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/2022053529.jpg)

### 查看博客

浏览器输入`localhost:4000`查看

```bash
localhost:4000
```

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/2022053517.jpeg)

### 停止本地服务器

`ctrl+s`，停止本地服务器运行

:::success

**目前博客已经基本完成了**

:::
