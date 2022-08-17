---
title: "linux UFW防火墙配置命令大全"
tags:
  - Linux
categories:
  - 计算机科学
  - 技术杂谈
  - Linux
abbrlink: 45ba05c7
date: 2022-06-05 18:24:22
---

:::info

以下设置均在Ubuntu中操作

:::

## 用户小白使用UFW

如果你对防火墙不了解，那么，这里适合你，按照以下步骤操作即可

### 安装UFW

```bash
sudo apt-get install ufw
```

![](http://hikki.test.upcdn.net/202206052918.jpg)

### 开启UFW

```bash
sudo ufw enable
```

### 默认拒绝外部访问本机

```bash
sudo ufw default deny
```

### 开放/拒绝端口

如需外部访问本机某端口，则使用以下开放端口命令

```bash
# 举例：开放 8080 端口
sudo ufw allow 8080
# 举例：拒绝外部访问 8090 端口
sudo ufw deny 8090
```

### UFW防火墙未开启

![](http://hikki.test.upcdn.net/202206052900.jpg)



## UFW安装

```bash
sudo apt-get install ufw
```

## 启动防火墙

```bash
sudo ufw enable				#开启防火墙
sudo ufw default deny		# 设置拒绝外部访问本机
```

运行以上两条命令后，开启了防火墙，并在系统启动时自动开启。关闭所有外部对本机的访问，但本机访问外部正常。

![](http://hikki.test.upcdn.net/202206052946.jpeg)

## 禁止开机启动UFW(关闭UFW)

```bash
sudo ufw disable
```

## 开启/禁用服务

```bash
sudo ufw allow|deny [service]
```

### 开启/禁用端口

```bash
sudo ufw allow|deny [service]
```

### 举例

#### 允许所有的外部IP访问本机的25/tcp (smtp)端口

```bash
sudo ufw allow smtp	
```

#### 允许所有的外部IP访问本机的22/tcp (ssh)端口

```bash
sudo ufw allow 22/tcp
```

#### 允许外部访问53端口(tcp/udp)

```bash
sudo ufw allow 53 
```

#### 禁用53端口

```bash
sudo ufw delete allow 53
```

#### 允许此IP访问所有的本机端口

```bash
sudo ufw allow from 192.168.1.100 
```

#### 删除上面这条规则

```bash
sudo ufw delete allow from 192.168.1.100 
```





#### 禁止外部访问smtp服务

```bash
sudo ufw deny smtp 	
```

#### 删除上面建立的某条规则

```bash
sudo ufw delete allow smtp 
```

## 查看防火墙状态及规则

```bash
sudo ufw status
```

## 开启/关闭防火墙

```bash
sudo  ufw enable|disable
```

## 转换日志状态

````bash
sudo  ufw logging on|off
````

## 设置默认策略

(比如 “mostly open” vs “mostly closed”)

```bash
sudo  ufw default allow|deny
```

## 查看防火墙版本

```bash
sudo ufw version
```

## 重启UFW防火墙

```bash
sudo ufw reload
```

## 重置UFW防火墙配置

```bash
sudo ufw reset
```





















