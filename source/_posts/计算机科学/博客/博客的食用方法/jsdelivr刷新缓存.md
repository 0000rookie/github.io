---
title: jsdelivr刷新缓存
tags:
  - 博客
  - 教程
categories:
  - 计算机科学
  - 博客
  - 博客的食用方法
abbrlink: 6f010433
date: 2022-04-12 23:54:52
---

:::info

如何刷新CDN.jsdelivr缓存 ？？？

:::

有时候在加载网页的时候，`CDN`刷新总是非常的慢，想快点看到，但是一直不刷新，这就需要我们去手动刷新`CDN.jsdelivr`缓存了，不手动刷新的话，可能要等｀24小时｀左右才会自动刷新。

先看看你的静态资源有没有配置好，打开你的静态资源链接，如：

```yaml
statics: https://cdn.jsdelivr.net/gh/用户名/仓库名/  
#此处的用户名是我的github用户名，仓库名是我hexo部署的仓库名，你根据自己的情况打开正确的链接
```

如果出现以下这个页面，说明`cdn`已经有缓存到你的静态文件了，如果没出现，说明你本地配置的`statics`没配置好

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/amliamng202204130009.jpeg)

如何刷新呢？打开以下链接，在`url`链接框回车

```yaml mark:1
https://purge.jsdelivr.net/gh/用户名/仓库名@master/ 
#将statics中的cdn替换为purge，在后面加上你仓库的分支名，我仓库默认分支是master
```

如果有出现这个界面并且status返回的是`finished`说明成功了

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/amliamng202204130011.jpeg)



:::success

此时已经刷新成功啦

:::





