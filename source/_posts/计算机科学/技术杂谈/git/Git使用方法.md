---
title: Git基本使用方法
categories:
  - 计算机科学
  - 技术杂谈
  - github
abbrlink: 43d2d741
date: 2022-04-04 14:11:09
tags:
  - Git
---

## 初始化仓库

```bash mark:1,2-50
git init 			#初始化当前文件夹为仓库，默认是master分支
git help -a 		# 显示完全的指令列表
git add text.txt 	# 添加text.txt文件加入到Git系统的索引中，tips:可以使用通配符添加“*”和“.”
git status			# 查看当前Git的状态，是否有新文件没有加入到Git索引中
git commit -m "操作说明" --author='操作者姓名' --email='操作者邮箱' #把已经添加到Git索引的所有文件到推送到repository，一般我们在使用github的时候，就是通过这个指令把文件推送到github的
gitk 				# 启动图形界面查看repository有哪些文件
# 一般在离开git bash here的时候习惯用exit结束,这样下次回来的时候可以恢复到原来的状态
```

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/pmlipmng202204121821.jpeg "本地仓库提交都爱github仓库流程")

`config`有三个基本配置的文件，他们分别有优先权之分。

```bash mark:1,2-5
.git/config					#优先权最高，存在于Git本地仓库下的.git文件内
Administrator/.gitconfig	#其次，存在于你PC当前用户下
etc/gitconfig 				#优先权最低,存在Git安装软件的位置
```

*存在位置如图所示*

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/pmlipmng202204121724.jpeg ".git/config")



![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/pmlipmng202204121743.jpeg "Administrator/.gitconfig")

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/pmlipmng202204121723.jpeg "etc/gitconfig ")

## git查看当前所在分支

```bash
git branch -vv
```

