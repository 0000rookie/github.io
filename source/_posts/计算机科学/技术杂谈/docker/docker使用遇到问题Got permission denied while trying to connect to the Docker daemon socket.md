---
title: >-
  docker使用遇到问题Got permission denied while trying to connect to the Docker daemon
  socket
abbrlink: 3d692ea
date: 2022-08-13 14:16:49
tags:
---

## 解决办法 1

使用超级管理员权限，每次都要输入密码，麻烦。

```bash
# 使用sudo docker ps或者sudo docker images
sudo docker
sudo docker images
```

## 解决办法 2

不需要每次都输入密码，一次设置，一劳永逸。

```bash
# 把普通用户加入到docker组中 
# 这里的普通用户是 wu ，组docker在安装docker的时候，就已经添加了，所以只需要执行两个操作即可：
sudo gpasswd -a $USER docker 
newgrp docker
# 将 wu 用户加入docker组之后，发现使用docker ps或者docker images不会提示权限不足了。
```

![01](http://hikki.test.upcdn.net/20220813142244.jpeg)
