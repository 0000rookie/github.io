---
title: 'fatal: Could not read from remote repository.'
tags:
  - Git
  - fail
categories:
  - 计算机科学
  - 技术杂谈
  - github
abbrlink: f3d93395
date: 2022-06-10 18:20:22
---

## 发现问题

```bash
fatal: Could not read from remote repository.
```

## 解决问题

### 生成新的`rsa`

```bash Git连接失败
ssh-keygen -t rsa -C "aa1***56@gmail.com" 
# 你的github邮箱
```

### 将`rsa`复制到`GitHub`

![](http://hikki.test.upcdn.net/202206102503.jpeg)

![](http://hikki.test.upcdn.net/202206102510.jpeg)
