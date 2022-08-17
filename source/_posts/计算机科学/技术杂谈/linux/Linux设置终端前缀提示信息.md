---
title: Linux设置终端前缀提示信息
abbrlink: 8e00366e
date: 2022-08-13 12:15:14
tags:
---

## 修改目标：

原本的提示信息是:`路径`

目标：修改终端提示信息为：`这是我的终端`

![01](http://hikki.test.upcdn.net/01.jpg)

### 打开`.bash_profile`文件

```bash
 vi $HOME/.bash_profile
```

### 编辑`.bash_profile`文件

点击`i`，左下角出现`-- INSERT --`后，可以正常输入内容。

在文件内输入以下内容：

```bash
PS1=这是我的终端
export PS1
```

### 保存内容

输入完成后，点击键盘左上角`Esc`，左下角`-- INSERT --`消失后，输入`:wq`回车即可保存。

![03](http://hikki.test.upcdn.net/20220813123041.jpeg)

### 更新配置

在终端输入以下命令更新配置

```bash
source $HOME/.bash_profile
```

![04](P:\FileSave\图片素材\博客\计算机科学\技术杂谈\Linux\Linux设置终端提示信息\04.jpg)

![05](P:\FileSave\图片素材\博客\计算机科学\技术杂谈\Linux\Linux设置终端提示信息\05.jpg)

## 补充

### 符号所代表的意义

```bash
\d : '代表日期
\H : '完整的主机名称
\h : '仅取主机的第一个名字
\t : '显示时间为24小时格式，如：HH：MM：SS
\T : '显示时间为12小时格式
\A : '显示时间为24小时格式：HH：MM
\u : '用户名
\v : 'BASH的版本信息
\w : '完整的工作目录名称
\W : '列出最后一个目录
\$ : '提示字符，如果是root时，提示符为：# ，普通用户则为：$
```

### 自定义效果

```bash
"只对当前用户生效，就修改~/.bashrc；如果想要所有用户生效，就修改/etc/profile"
[root@VM-0-16-centos ~]# vim ~/.bashrc
export PS1='\h:\w \$ '
[root@VM-0-16-centos ~]# source ~/.bashrc
VM-0-16-centos:~ # 
"这里吧前后的[]方括号去除了，就变成了suse的风格了"
"显示完整目录有一个缺点，就是进入的目录层级越深，前缀就越长，根据个人喜好来就行"

```

### 添加颜色

```bash
VM-0-16-centos:~ # vim ~/.bashrc
export PS1='\[\e[0;31m\]\h:\w \$ \[\e[0m\]'
VM-0-16-centos:~ # source ~/.bashrc
"有那么点suse的味道了"

"如果你喜欢绿色，他也会原谅你的哟"
VM-0-16-centos:~ # vim ~/.bashrc
export PS1='\[\e[1;32m\]\h:\w \$ \[\e[0m\]'
VM-0-16-centos:~ # source ~/.bashrc
```

### 五颜六色

```bash
"甚至还可以交通灯"
VM-0-16-centos:~ # vim ~/.bashrc
export PS1='\[\e[1;31m\]\d-\[\e[0m\]\[\e[1;33m\]\h\[\e[0m\]\[\e[1;32m\]:\w \$ \[\e[0m\]'
VM-0-16-centos:~ # source ~/.bashrc

```

![image-20220813123721651](http://hikki.test.upcdn.net/image-20220813123721651.png)





### 将前缀改为实时目录

```
PS1='[`pwd`]\$'
export PS1
```









