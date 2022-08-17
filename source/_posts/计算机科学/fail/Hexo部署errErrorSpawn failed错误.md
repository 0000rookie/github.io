---
title: 'Hexo部署err:Error:Spawn failed错误'
tags:
  - 博客
  - fail
categories:
  - 计算机科学
  - fail
abbrlink: 28af37eb
date: 2022-04-25 01:51:19
---

## 发现问题

```bash
err:Error:Spawn failed
```

今晚在发布文章的时候突然出现了这个问题，昨天还是正常的，今晚就报错了，前前后后尝试了好多办法

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/2022045305.jpeg)

## 解决问题

### 删除`id_rsa`、`id_rsa.pub`、`known_hosts`

打开`C:\Users\Administrator\.ssh`路径,删除`id_rsa`、`id_rsa.pub`、`known_hosts`

### 在`bash`重新生成rsa文件

```bash
>>>ssh-keygen -t rsa
```

### 打开`github--->setting--->SSH and GPG keys--->New ssh key`

打开`.ssh`路径，将`id_rsa.pub`的内容复制到新创建的`ssh key`里面

### 测试是否连接到`github`

```bash mark:1-12
>>>ssh -T git@github.com
ssh: connect to host github.com port 22: Connection timed out #连接失败

# 如果是出现以下则说明成功，以下的文章就不用看了
The authenticity of host '[ssh.github.com]:443 ([20.205.243.160]:443)' can't be established.
ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? # 此时在此输入yes回车就行
```

---

如果你失败了，接着往下

### 新建`config`文件

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/2022045733.jpeg)

### 在`config`文件输入下面内容

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/2022045818.jpeg)

```yaml mark:1-5
Host github.com
User *****@gmail.com  #登录github的邮箱，这段文字不复制到文件
Hostname ssh.github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
Port 443
```

### 连接`github`

```bash
>>>ssh -T git@github.com #此时出现以下页面成功啦
The authenticity of host '[ssh.github.com]:443 ([20.205.243.160]:443)' can't be established.
ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes # 此处输入yes
Warning: Permanently added '[ssh.github.com]:443' (ED25519) to the list of known hosts.
Hi 0000rookie! You've successfully authenticated, but GitHub does not provide shell access.

```

