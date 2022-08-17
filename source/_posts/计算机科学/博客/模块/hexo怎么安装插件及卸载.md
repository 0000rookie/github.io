---
title: Hexo怎么安装插件
tags:
  - 博客
  - 教程
categories:
  - 计算机科学
  - 博客
  - 模块
path: 计算机科学\博客\模块
abbrlink: c5de56d5
date: 2022-03-26 18:33:07
updated: 
---



---

### hexo怎么安装插件

1. 打开hexo的根目录`Blog`

2. 输入安装地址(此处我以安装`npm i hexo-algoliasearch`测试)

   ```bash npm安装 mark:1
   npm i hexo-algoliasearch
   ```

3. 安装成功

![](https://tva4.sinaimg.cn/large/0065wfS6ly8h0ntxuxa0oj30jo09njsv.jpg "在Blog打开cmd"){height="65%" width="65%"}



![](https://tva2.sinaimg.cn/large/0065wfS6ly8h0ntxktk9zj30cr02gjrc.jpg "在cmd输入安装路径"){height="65%" width="65%"}



![](https://tva3.sinaimg.cn/large/0065wfS6ly8h0nty14h5oj30lh07s0tg.jpg "END"){height="65%" width="65%"}

### Hexo怎么卸载插件

1. 卸载也是在`Blog`打开cmd，输入`npm uninstall 插件名 --save`即可

2. 或者简洁一点`npm un 插件名 --save`

3. 举个例子，我要卸载`hexo-renderer-marked`这个插件

4. 在cmd输入

   ``` bash 插件卸载 mark:1 
   npm un hexo-renderer-marked --save
   ```

![](https://tva2.sinaimg.cn/large/0065wfS6ly8h0ntxxz7wqj30lk0650t3.jpg "卸载插件"){height="75%" width="75%"}
