---
title: 搭建GitHu图床
tags:
  - 教程
  - 博客
categories:
  - 计算机科学
  - 博客
  - 模块
path: 计算机科学\博客\模块
abbrlink: e85071ad
date: 2022-04-02 00:09:31
updated:
---

**问：什么是图床？图床有什么用？**

**答：图床就是一个存放你照片的云盘，只要有网络就能打开这张照片**

[PicGo蓝奏云下载地址]: https://rookie1679.lanzouf.com/i8ek302hiuyh	"PicGo"
[PicGo官网]:https://picgo.github.io/PicGo-Doc/zh/	"官网"

 ## 新建一个仓库

 **用于存放图片的仓库**  俗称图床
![](http://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/amliamng202204021048.jpg)


 ## 给你图床起个名字
![](http://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/amliamng202204021050.jpg)

 ## 新建token 
 `settings--->Developer settings--->Personal access tokens--->generate new token`
![](http://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/amliamng202204021051.jpg)
![](http://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/amliamng202204021059.jpg)
![](http://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/amliamng202204021100.jpg)
*这边给大家翻译一下，英文不是很好可以看看*
![](http://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/amliamng202204021102.jpg)
![](http://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/amliamng202204021103.jpg)

**点击复制** 

![](http://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/amliamng202204021105.jpg)

## 配置Picgo

:::info

**我在imgs仓库下新建了一个Hexoimgs文件夹**

:::

粘贴刚刚复制的`token`到`设定Token`

![](http://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/amliamng202204021133.jpg)

你`github`上的分支名是什么，`PicGO的`设定分支名就写什么

![](http://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/amliamng202204021131.jpg)

**设定自定义域名：**`0000rookie/imgs`改成你的`用户名/仓库名`

```html
http://cdn.jsdelivr.net/gh/0000rookie/imgs
```

:::success

**你的图床就搭建完啦**

:::

