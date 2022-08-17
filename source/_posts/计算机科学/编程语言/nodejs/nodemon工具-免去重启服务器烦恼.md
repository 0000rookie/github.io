---
title: nodemon工具-免去重启服务器烦恼
tags:
  - NodeJs
categories:
  - 计算机科学
  - 编程语言
  - nodejs
abbrlink: b518f675
date: 2022-07-14 16:59:16
---

## 安装nodemon

`nodemon`需要全局安装

```bash
npm i nodemon -g
```

![](http://hikki.test.upcdn.net/2022/07/14-17:00:5757.jpg)

## 使用方法

原来启动服务器的命令是`node 包名.js`，用`nodemon`后的启动服务器的命令改为 `nodemon 包名.js`，在`Ctrl+S`保存文件夹后，终端会出现文件变化的内容。

![](http://hikki.test.upcdn.net/2022/07/14-17:01:3737.gif)
