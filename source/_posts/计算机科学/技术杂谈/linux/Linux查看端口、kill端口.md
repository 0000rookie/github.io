---
title: Linux查看端口、kill端口(仅适用Linux)
abbrlink: 95e6561b
date: 2022-08-14 13:46:33
tags:
  - Linux
---

## 方法一：` lsof`

`lsof(list open files)`是一个列出当前系统打开文件的工具。

`lsof `查看端口占用语法格式：

### 查看端口 `lsof`

```bash
lsof -i:端口号
# 实例
# lsof -i:8000
COMMAND   PID USER   FD   TYPE   DEVICE SIZE/OFF NODE NAME
nodejs  26993 root   10u  IPv4 37999514      0t0  TCP *:8000 (LISTEN)
```

此时`8000`端口被`NodeJS`占用

### 停止端口进程

```bash
# kill -9 PID
kill -9 26993
```

![image-20220814135035194](http://hikki.test.upcdn.net/20220814135511.png)

### 更多` lsof `命令

```bash
lsof -i:8080				# 查看8080端口占用
lsof abc.txt				# 显示开启文件abc.txt的进程
lsof -c abc				# 显示abc进程现在打开的文件
lsof -c -p 1234			# 列出进程号为1234的进程所打开的文件
lsof -g gid				# 显示归属gid的进程情况
lsof +d /usr/local/			# 显示目录下被进程开启的文件
lsof +D /usr/local/			# 同上，但是会搜索目录下的目录，时间较长
lsof -d 4				# 显示使用fd为4的进程
lsof -i -U				# 显示所有打开的端口和UNIX domain文件
```

## 方法二：`netstat`

### 查看端口

```bash
netstat -tunlp | grep 端口号
```

- `-t (tcp)` 仅显示`tcp`相关选项
- `-u (udp)`仅显示`udp`相关选项
- `-n `拒绝显示别名，能显示数字的全部转化为数字
- `-l `仅列出在`Listen`(监听)的服务状态
- `-p `显示建立相关链接的程序名

### 更多命令

```bash
netstat -ntlp   				# 查看当前所有tcp端口
netstat -ntulp | grep 80   		# 查看所有80端口使用情况
netstat -ntulp | grep 3306   	# 查看所有3306端口使用情况
```

### 杀掉端口

```bash
# kill -9 PID
kill -9 进程PID
```



## kill补充

`Linux kill `命令用于删除执行中的程序或工作。

`kill `可将指定的信息送至程序。预设的信息为` SIGTERM(15)`，可将指定程序终止。若仍无法终止该程序，可使用 `SIGKILL(9) `信息尝试强制删除程序。程序或工作的编号可利用` ps `指令或` jobs `指令查看。

### 使用语法

```bash
kill [-s <信息名称或编号>][程序]　或　kill [-l <信息编号>]
```

**参数说明**：

- `-l <信息编号> `　若不加<信息编号>选项，则` -l `参数会列出全部的信息名称。
- `-s <信息名称或编号>` 　指定要送出的信息。
- `[程序] 　[程序]`可以是程序的`PID`或是`PGID`，也可以是工作编号。

使用` kill -l `命令列出所有可用信号。

最常用的信号是：

```bash
- 1 (HUP)：重新加载进程。
- 9 (KILL)：杀死一个进程。
- 15 (TERM)：正常停止一个进程。
```

