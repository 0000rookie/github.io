---
title: 'ERROR: for nginx  Cannot start service nginx'
abbrlink: 7b503fe9
date: 2022-08-13 23:12:56
tags:
  - fail
---

## 报错内容

```bash
lilbai@ecs-205380: docker-compose up -d
/home/lilbai/.local/lib/python3.6/site-packages/paramiko/transport.py:33: CryptographyDeprecationWarning: Python 3.6 is no longer supported by the Python core team. Therefore, support for it is deprecated in cryptography and will be removed in a future release.
  from cryptography.hazmat.backends import default_backend
Starting nginx ... 
Starting nginx ... error

ERROR: for nginx  Cannot start service nginx: driver failed programming external connectivity on endpoint nginx (439e7ee354ecc5003b1bc1685d0008eee0e0adafc8aab4b86f20f14029ab3036): Error starting userland proxy: listen tcp4 0.0.0.0:80: bind: address already in use

ERROR: for nginx  Cannot start service nginx: driver failed programming external connectivity on endpoint nginx (439e7ee354ecc5003b1bc1685d0008eee0e0adafc8aab4b86f20f14029ab3036): Error starting userland proxy: listen tcp4 0.0.0.0:80: bind: address already in use
ERROR: Encountered errors while bringing up the project.

```

## 分析问题

连接不到80端口，可能是80端口被占用了，如果是80端口被占用，直接kill就行

## 解决问题

### 进入超级管理员

```bash
su
```

### 查询80端口占用情况

```bash
root@ecs-205380# netstat -natp | grep 80
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      20215/nginx: master 
tcp        0      0 0.0.0.0:21              0.0.0.0:*               LISTEN      29080/pure-ftpd (SE 
tcp6       0      0 :::21                   :::*                    LISTEN      29080/pure-ftpd (SE
```

### kill占用80端口的程序

kill结束后再查看一次80端口是否还有其他占用

```bash
root@ecs-205380# kill -9 20215
root@ecs-205380# netstat -natp | grep 80
tcp        0      0 0.0.0.0:21              0.0.0.0:*               LISTEN      29080/pure-ftpd (SE 
tcp6       0      0 :::21                   :::*                    LISTEN      29080/pure-ftpd (SE 
```





