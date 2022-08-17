---
title: '连接git错误''error: ''failed to push some refs to'
tags:
  - Git
  - fail
abbrlink: c0e9c023
date: 2022-08-16 17:14:55
---

## 发现问题：

```bash
error: failed to push some refs to
```

## 分析原因

我们在创建仓库的时候，都会勾选“使用Reamdme文件初始化这个仓库”这个操作初识了一个README文件并配置添加了忽略文件。当点击创建仓库时，
![20200522100359284](http://hikki.test.upcdn.net/20200522100359284.png)
  它会帮我们做一次初始提交。于是我们的仓库就有了README.m和.gitignore文件，然后我们把本地项目关联到这个仓库，并把项目推送到仓库时，我们在关联本地与远程时，两端都是有内容的，但是这两份内容并没有联系，当我们推送到远程或者从远程拉取内容时，都会有没有被跟踪的内容，于是你看git报的详细错误中总是会让你先拉取再推送，但是拉取总是失败。

## 解决方法

### 方法一

```bash
git pull --rebase origin master
```

**然后再提交**

```bash
git push -u origin master
```

### 方法二

在创建仓库的时候`不要勾选`“使用Readme文件初始化这个仓库”。

这样直接在本地`git clone` 仓库，然后使用直接git push就可以了

![image-20220816172834861](http://hikki.test.upcdn.net/image-20220816172834861.png)





















