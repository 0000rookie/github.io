---
title: docker安装qBittorrent
categories:
  - 计算机科学
  - 技术杂谈
  - docker
abbrlink: 4fce5997
date: 2022-06-12 22:38:34
tags:
---

## 拉取qBittorrent镜像

```bash
docker pull linuxserver/qbittorrent
```

![](http://hikki.test.upcdn.net/202206125600.jpeg)

## 创建目录并编写docker-compose文件

```bash
cd ~
mkdir qBittorrent #创建qbitorrent数据文件夹
cd qBittorrent
mkdir config downloads #创建配置文件目录与下载目录
vim docker-compose.yml #创建并编辑文件
```

![](http://hikki.test.upcdn.net/202206125943.jpg)

进入vim编辑器后，把这个粘贴进去(Ctrl+Insert)

```bash
version: "2"
services:
  qbittorrent:
    image: linuxserver/qbittorrent
    container_name: qbittorrent
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Shanghai # 你的时区
      - UMASK_SET=022
      - WEBUI_PORT=8081 # 将此处修改成你欲使用的 WEB 管理平台端口 
    volumes:
      - /home/qb/config:/config # 绝对路径请修改为自己的config文件夹
      - /home/d:/downloads # 绝对路径请修改为自己的downloads文件夹
    ports:
      # 要使用的映射下载端口与内部下载端口，可保持默认，安装完成后在管理页面仍然可以改成其他端口。
      - 6881:6881 
      - 6881:6881/udp
      # 此处WEB UI 目标端口与内部端口务必保证相同，见问题1
      - 8081:8081
    restart: unless-stopped
```

## 执行docker-compose

如果还没安装docker-compose，请先安装`apt install docker-compose`

```bash
docker-compose up -d 
```

![](http://hikki.test.upcdn.net/202206125620.jpg)

## 开放防火墙端口8081

如果你是云服务器可能还要去云服务器安全组开放端口，我这里的防火墙是用`ufw`

```bash
ufw allow 8081
```

![](http://hikki.test.upcdn.net/202206125832.jpg)

## 登录qBittorrent并设置中文

```bash
# 开放端口后，访问 你的ip:8081 即可进入管理页面。
# 默认用户名:admin
# 默认密码：adminadmin
```

语言默认是英文，修改成中文

![](http://hikki.test.upcdn.net/202206120640.jpeg)

![](http://hikki.test.upcdn.net/202206120939.jpeg)

修改完记得滑下去点击`save`(保存)

![](http://hikki.test.upcdn.net/202206120945.jpeg)

:::success

这样就设置成功啦！！！！！！！

:::

## 可能出现错误

### docker-compose.yml文件的路径没填正确

![](http://hikki.test.upcdn.net/202206125649.jpg)

### 未安装docker-compose

安装`docker-compose`就可以了

```bash
apt install docker-compose
```

![](http://hikki.test.upcdn.net/202206125735.jpg)

## 下载没反应-->修改监听端口

有些PT站是屏蔽某些端口的，像我用的PT站是默认屏蔽`6881`端口的，修改一下就可以了

![](http://hikki.test.upcdn.net/202206121259.jpeg)

修改端口在PT站的开放范围内就好了，可能有些云服务器也会限制某些端口，也要在服务器的允许端口范围内

![](http://hikki.test.upcdn.net/202206121034.jpeg)

