---
title: git push origin master失败
tags:
  - 教程
  - Git
  - fail
categories:
  - 计算机科学
  - fail
abbrlink: c32e96d4
date: 2022-04-08 22:34:15
---

## 关于我想备份`blog`这件事

+++primary 我要怎么备份blog文件？？？

:::primary

这几天在想，万一那天我想在别的电脑上写博客，或者是我电脑突然抽风硬盘坏了，我的博客数据岂不是没了？？？

又或者我什么时候不小心删错了文件，岂不是出大问题？？？

:::

带着这个问题，我一开始是找了几个`PC端`自动本地备份的程序，但效果不太理想。

定时备份:不能保证你在设置定时的这段时间内进行`hexo d`多少次，如果定时备份的时间设置过短，理论上对硬盘的读写会拖慢其他程序的运行。

所以在想，如果有一个程序可以监控我`blog`下的文件变化，每变化一次就进行记录一次，进行增量备份一次，这是我想到最完美的办法，带着这个想法，我似乎找到了一个方法。



+++

+++danger 持续集成服务

此处引用百度百科：持续集成是一种软件开发实践，即团队开发成员经常集成他们的工作，通常每个成员每天至少集成一次，也就意味着每天可能会发生多次集成。每次集成都通过自动化的构建（包括编译，发布，自动化测试）来验证，从而尽早地发现集成错误。

简单来说，就是这个服务绑定了`GitHub`，我们每提交一次代码到`GitHub`，它都会抓取一次我们的仓库，检查新代码，然后提供一个运行环境，执行测试，完成构建，还能部署到服务器。

+++

然后我这次在准备提交文件到我新建的`hexo-backups`仓库的时候，出错了，就记录一下错误。

## `git pash origin master`失败

第一次遇见这个问题，我还以为是`.gitignore`文件的`.DS_Store`文件不存在？然后我删掉这个文件，好像还是继续报一样的错误，然后排除这个可能。

![](http://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/pmlipmng202204082309.jpg "git pash origin master失败")



## 新建文件测试

然后新建文件测试一下，看是不是文件没有被加载到缓存区，发现结果已经加载到缓冲区了

![](http://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/pmlipmng202204082313.jpg "测试文件")



## 添加origin

一开始我没有删除旧的origin，我直接添加了，直接报错。实际操作应该删除旧的origin的，再添加新的origin

```bash 删除origin mark:1,2-3
# 删除origin
git remote remove origin
```

```bash 添加origin mark:1,2-3
# 此处的 git@github.com:0000rookie/Hexo-backups.git 是仓库的SSH
git add git@github.com:0000rookie/Hexo-backups.git
```

```bash 查看origin mark:1,2-3
git origin -v
```

![](http://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/pmlipmng202204082315.jpg "添加控制器")



## 重新commit

是的，我真的以为我只是修改一下`origin`就处理好了

![](http://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/pmlipmng202204082324.jpg "重新commit")

## `git push -f origin master`提交成功

奇怪的是，我试试用`git push -f origin master`就成功了

![](http://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/pmlipmng202204082326.jpg "git push -f origin master")

:::success

目前还不知道是什么原因导致错误，如果你知道，欢迎留言告诉我！！！

:::

:::warning

以上如有错误，欢迎留言指出

:::
