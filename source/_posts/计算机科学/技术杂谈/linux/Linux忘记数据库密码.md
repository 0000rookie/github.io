---
title: Linux忘记数据库密码
tags:
  - Linux
  - 教程
  - 数据库
categories:
  - 计算机科学
  - 技术杂谈
  - Linux
abbrlink: 3d358537
date: 2022-04-12 01:54:58
---

这几天班里在搞团日活动，有个活动是`Oj`比赛，通过同学们刷题提高语言能力，因此需要一个`Oj`平台统计数据，我就想看看自己能不能搭建一个`Oj`平台，然后给大家测试题目。

在部署项目过程中，我忘记`mysql`密码了，导致我数据库想修改数据没办法。

经过一番折腾，找到了`mysql`初始密码，记录一下。

`mysql`初始密码文件路径：`/etc/mysql/debian.cnf`

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/amliamng202204120203.jpeg)

