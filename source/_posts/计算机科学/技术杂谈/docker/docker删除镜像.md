---
title: docker删除镜像
categories:
  - 计算机科学
  - 技术杂谈
  - docker
abbrlink: dcc37883
date: 2022-06-08 00:13:26
tags:
---

删除镜像四步法

1. 查看容器运行情况
2. 停止容器
3. 删除容器
4. 删除镜像

## 查看容器运行情况

```bash 查看容器ID
docker ps 
```

## 停止容器

```bash
docker stop 容器ID
```

## 删除容器

```bash
docker ps -a # 查看容器ID，‘-a’表示查看全部容器
docker rm 容器ID
```

## 删除镜像

```bash
docker images # 表示查看所有镜像
docker rmi 镜像ID
```

