---
title: docker使用指令记录
categories:
  - 计算机科学
  - 技术杂谈
  - docker
abbrlink: 2802e5c6
date: 2022-06-05 17:47:10
tags:
---



## 删除image

### 通过ID删除镜像

```bash
docker rmi ID # 删除镜像样例
docker rmi 0e901e68141f # 删除镜像，如果ID太长不想输入，只输入ID的一半也是可以的
```

### 通过TAG删除镜像

```bash
docker rmi REPOSITORY:TAG # 删除镜像样例
docker rmi nginx:latest # 删除镜像
docker images # 查看镜像
```

![](http://hikki.test.upcdn.net/202206055208.jpeg)

