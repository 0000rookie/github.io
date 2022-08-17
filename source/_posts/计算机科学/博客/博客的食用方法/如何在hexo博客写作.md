---
title: 如何在hexo博客写作
tags:
  - 博客
categories:
  - 计算机科学
  - 博客
  - 博客的食用方法
abbrlink: b26ff49b
date: 2022-04-13 19:13:30
---

## 前言

`hexo`采用的是`markdown`语言的轻量级标记语言，写作时使用`markdown`，它的后缀名是`.md`在hexo部署的时候，`hexo`会渲染`md文件`形成`HTML`，可以大量减少写作排版时间，从而更加专注写作，而不是专注于排版内容。

如果你不会`markdown`语言甚至都没听过，没关系，`markdown`是一种非常简单的语言，他的语法只有十几种，常用的就不到十来个，非常容易入手，一般人半小时就能学会，下面是官网，你可以自行去了解一下学习一下语法。



{% links %}

- site: Markdown官网

  url: https://markdown.com.cn/
  desc: 轻量级标记语言
  image: https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/pmlipmng202204131202.png
  color: "#FBDE99"

- site: Typora官网

  url: https://support.typoraio.cn/zh/Markdown-Reference/
  desc: 支持markdown语法
  image: https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/pmlipmng202204131213.png
  color: "#FDBF5C"

- site: Typora软件下载
  url: https://support.typoraio.cn/
  desc: 官网下载
  image: https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/pmlipmng202204131213.png
  color: "#6AD0CB"

{% endlinks %}



---

在这里我使用的是`typora`，如果你有需要，可以去官网下一个，或者你用文本编辑器写作也是可以的，`Typora`从`V1.0`版本之后就开始收费了，可以下载`V1.0`之前的版本。

`Typora`是一个`markdown`编辑器，极简的风格，让你专注于写作.

## 如何创建第一篇文章

### 打开git bash

在你的博客下打开`git bash here`

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/202204.jpeg)

### 输入指令

```bash mark:1,2-6
# hexo new 文章标题
>>> hexo new 如何在hexo博客写作
# 或者是
# hexo new 文章标题 --path 路径/文件名.md
# 或者可以简写一下
# hexo new 文章标题 -p 路径/文件名.md
>>> hexo new "如何在hexo博客写作" -p 计算机科学/博客/如何在hexo博客写作.md
# tips：如果不设置路径的话，新建文章是默认存储在\source\_posts\这个路径下的。
# tips：一般在标题下有空格或者其他字符要给标题加上双引号
```

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/02.jpg)

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/03.jpg)

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/04.jpg)

```yaml mark: 1,2-9
	# Front——matter格式
title: 如何在hexo博客写作 			#文章标题
date: 2022-04-13 11:52:06			#文章创建时间
tags:						#文章标签
  - 博客
  - 每日一更
categories: 					#文章类别
  - 计算机科学
  - 博客
  - 博客的食用方法
```



### 发布文章

当你文章写完了，想发布到博客上面，先要把文章部署到`github`上面，然后打开你的博客，博客就会读取`github`仓库的内容了。

```bash mark: 1,2-7
 hexo clean
 hexo g
 hexo d
 # 逐步输入以上三条指令，执行完再输入下一条
 # 或者一次性输入三条也是可以的，但新手还不建议一次性输入，前期部署可能有时候容易出错
 hexo clean && hexo g && hexo d
 # 部署完了看一下窗口没有出现报错就可以去博客刷新一下内容了，一般需要几分钟才更新内容
```

到这里，就是`hexo`正常的写作顺序啦

:::info

以上如有错误，欢迎指出

:::
