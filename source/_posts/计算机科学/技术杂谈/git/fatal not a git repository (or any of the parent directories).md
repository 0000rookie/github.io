---
title: 'fatal: not a git repository (or any of the parent directories): .git'
tags:
  - Git
  - fail
abbrlink: e0f7cd8b
date: 2022-08-16 17:49:16
---

## 发现问题

![image-20220816175008902](http://hikki.test.upcdn.net/image-20220816175008902.png)

```bash
fatal: not a git repository (or any of the parent directories): .git
```

## 分析问题

提示说没有.git仓库，没有的话，那我初始化一下好了

## 解决问题

```bash
git init
git push -u origin master
```

