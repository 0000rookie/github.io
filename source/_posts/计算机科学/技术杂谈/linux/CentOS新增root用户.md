---
title: CentOS新增root用户
tags:
  - Linux
  - CentoOS
categories:
  - 计算机科学
  - 技术杂谈
  - Linux
abbrlink: 111f4f09
date: 2022-04-16 15:49:21
---

## 进入root

```bash mark:1
su root  				# 进入root时需要输入密码，密码是不显示的
gedit /etc/sudoers		# 打开sudoers文件
```

![](http://hikki.test.upcdn.net/20220704011617.jpeg)

## 添加新用户

滑到最下面找到`root`

在`root`下面添加

```bash mark:1
新用户名 ALL=(ALL) ALL 
# 新用户必须要存在才能添加
# lilbai518这个用户，我之前已经创建过了
```

![](http://hikki.test.upcdn.net/20220704011640.jpeg)

![](http://hikki.test.upcdn.net/20220704011650.jpeg)
