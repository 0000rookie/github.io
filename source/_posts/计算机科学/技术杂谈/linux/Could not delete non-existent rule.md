---
title: Could not delete non-existent rule
tags:
  - Linux
abbrlink: e33a4a94
date: 2022-08-14 13:34:45
---

## 报错内容

想删除8888端口，但是发现删除失败

```bash
root@ecs-205380:/home/lilbai# ufw delete allow 8888
Could not delete non-existent rule
Could not delete non-existent rule (v6)
```

## 分析问题

这里可以看到`8888`端口是属于`tcp`连接，那么我直接删除`8888`端口似乎有点不合适，那改为删除`8888/tcp``会怎么样呢？

```bash
root@ecs-205380:/home/lilbai# ufw status
Status: active

To                         Action      From
--                         ------      ----           
8888/tcp (v6)              ALLOW       Anywhere (v6)             
```



## 解决问题

在端口后面加个`/tcp`即可，删除成功

```bash
root@ecs-205380:/home/lilbai# ufw delete allow 8888/tcp
Rule deleted
Rule deleted (v6)
```









