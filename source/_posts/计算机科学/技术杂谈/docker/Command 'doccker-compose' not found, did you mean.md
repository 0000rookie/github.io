---
title: 'Command ''doccker-compose'' not found, did you mean'
abbrlink: dcf97aea
date: 2022-08-13 17:10:01
tags:
---

## 报错内容

安装`docker-compose`一直失败，一开始是用`pip3 install docker-compose`安装，但是安装结束还是继续报错

```bash
# 错误1：
sh: docker-compose: command not found
```

```bash
# 错误2：
Command 'doccker-compose' not found, did you mean
```

## 解决方法

```bash
sudo apt  install docker-compose
```

### 查看docker-compose版本

```bash
docker-compose --version
```

![image-20220813171544113](http://hikki.test.upcdn.net/image-20220813171544113.png)
