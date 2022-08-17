---
title: 为博客添加免费的CDN加速
tags:
  - 教程
  - 博客
categories:
  - 计算机科学
  - 技术杂谈
abbrlink: edaa94fb
date: 2022-04-08 11:37:37
---



## 设置`statics`

在根目录或者`themes`下`_config.yml`文件下配置

```yaml
格式：statics: https://cdn.jsdelivr.net/gh/账户名/仓库名/
statics: https://cdn.jsdelivr.net/gh/0000rookie/github.io/ 

```

![](http://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/amliamng202204081139.jpg)



## 刷新`CDN.jsDelivr`

打开浏览器输入你`statics`的资源路径，回车刷新一下。

```html
https://cdn.jsdelivr.net/gh/0000rookie/github.io/
https://cdn.jsdelivr.net/gh/账户名/仓库名/
```

:::info

如果成功了是以下的样子，如果没出现，等几分钟再刷新一下

:::

![](http://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/amliamng202204081149.jpg)







:::info

这个`url`和`root`是不用管的，一开始我是设置`url`的，但是网站没有出现样式，访问`cdn`的时候返回是无定义

:::

![](http://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/amliamng202204081142.jpg)



:::info

如果样式还是没出现，打开你网站，`F12`调试一下，修改一下你的`CSS`路径，看看是哪里出问题，看报错信息是什么

:::

![](http://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/amliamng202204081152.jpg)





:::info

如果是出现这个错误，说明你的`statics`路径填错了，找不到你的路径文件

:::

![](http://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/amliamng202204081154.jpg)







:::warning

以上如有错误，欢迎留言指出

:::
