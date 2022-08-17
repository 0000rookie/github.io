---
title: Ubuntu安装Docker
categories:
  - 计算机科学
  - 技术杂谈
  - docker
tags:
  - 服务器
abbrlink: bc681fc7
date: 2022-06-05 00:47:53
---

# Ubuntu18.04安装Docker-CE社区版

:::info

本次安装环境在华为服务器Ubuntu安装Docker

:::

## 远程华为服务器

![](http://hikki.test.upcdn.net/202206050614.jpeg)

:::primary

开始安装

:::

因为Ubuntu官方系统里自带的Docker版本不是最新的，为了安装最新版本，我们要从官方Docker库里下载，为此，需要先添加几个包源，添加GPG公钥来确保下载和安装的有效性。

## 更新现有包列表

```bash
sudo apt update
```

![](http://hikki.test.upcdn.net/202206051051.jpg)

## 安装几个依赖包，让apt可以支持HTTPS

````bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common
````

![](http://hikki.test.upcdn.net/202206051055.jpg)

## 将官方Docker库的GPG公钥添加到系统中

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

![](http://hikki.test.upcdn.net/202206051108.jpg)

## 将Docker库添加到APT里

```bash
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
```

![](http://hikki.test.upcdn.net/202206051123.jpeg)

## 再次更新现有包列表

```bash
sudo apt update
```

![](http://hikki.test.upcdn.net/202206051155.jpeg)

## 执行

为了确保修改生效，让新的安装从Docker库里获取，而不是从Ubuntu自己的库里获取

```bash
apt-cache policy docker-ce
```

可能会看到如下图的输出，各个系统的情况可能略有不同

![](http://hikki.test.upcdn.net/202206051204.jpeg)

输出显示，docker-ce（ce是社区版的意思）还没有安装

## 开始安装

```bash
sudo apt install docker-ce
```

![](http://hikki.test.upcdn.net/202206051231.jpeg)

## 查看运行状态

现在Docker应该已经安装好了，守护进程也开启了，开机启动也开启了。我们看看Docker的运行状态吧

```bash
sudo apt install docker-ce
```

### 你看到的输出应该是这样的

![](http://hikki.test.upcdn.net/202206051239.jpeg)

:::success

到这里就安装成功啦

:::

























































```bash
Connecting to 124.70.8.41:22...
Connection established.
To escape to local shell, press 'Ctrl+Alt+]'.

Welcome to Ubuntu 18.04.6 LTS (GNU/Linux 4.15.0-169-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Sun Jun  5 00:31:12 CST 2022

  System load:  1.36               Processes:           104
  Usage of /:   12.2% of 39.12GB   Users logged in:     0
  Memory usage: 9%                 IP address for eth0: 192.168.0.158
  Swap usage:   0%

 * Super-optimized for small spaces - read how we shrank the memory
   footprint of MicroK8s to make it the smallest full K8s around.

   https://ubuntu.com/blog/microk8s-memory-optimisation

103 updates can be applied immediately.
89 of these updates are standard security updates.
To see these additional updates run: apt list --upgradable


	
	Welcome to Huawei Cloud Service

/usr/bin/xauth:  file /root/.Xauthority does not exist
root@ecs-205380:~# curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
# Executing docker install script, commit: 3255aa3919e7281693f62855b9d543bb50f04957
+ sh -c 'apt-get update -qq >/dev/null'
+ sh -c 'DEBIAN_FRONTEND=noninteractive apt-get install -y -qq apt-transport-https ca-certificates curl >/dev/null'
+ sh -c 'mkdir -p /etc/apt/keyrings && chmod -R 0755 /etc/apt/keyrings'
+ sh -c 'curl -fsSL "https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg" | gpg --dearmor --yes -o /etc/apt/keyrings/docker.gpg'
+ sh -c 'chmod a+r /etc/apt/keyrings/docker.gpg'
+ sh -c 'echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/docker.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic stable" > /etc/apt/sources.list.d/docker.list'
+ sh -c 'apt-get update -qq >/dev/null'
+ sh -c 'DEBIAN_FRONTEND=noninteractive apt-get install -y -qq --no-install-recommends docker-ce docker-ce-cli containerd.io docker-compose-plugin docker-scan-plugin >/dev/null'
+ version_gte 20.10
+ '[' -z '' ']'
+ return 0
+ sh -c 'DEBIAN_FRONTEND=noninteractive apt-get install -y -qq docker-ce-rootless-extras >/dev/null'
+ sh -c 'docker version'
Client: Docker Engine - Community
 Version:           20.10.16
 API version:       1.41
 Go version:        go1.17.10
 Git commit:        aa7e414
 Built:             Thu May 12 09:17:28 2022
 OS/Arch:           linux/amd64
 Context:           default
 Experimental:      true

Server: Docker Engine - Community
 Engine:
  Version:          20.10.16
  API version:      1.41 (minimum version 1.12)
  Go version:       go1.17.10
  Git commit:       f756502
  Built:            Thu May 12 09:15:33 2022
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          1.6.4
  GitCommit:        212e8b6fa2f44b9c21b2798135fc6fb7c53efc16
 runc:
  Version:          1.1.1
  GitCommit:        v1.1.1-0-g52de29d
 docker-init:
  Version:          0.19.0
  GitCommit:        de40ad0

================================================================================

To run Docker as a non-privileged user, consider setting up the
Docker daemon in rootless mode for your user:

    dockerd-rootless-setuptool.sh install

Visit https://docs.docker.com/go/rootless/ to learn about rootless mode.


To run the Docker daemon as a fully privileged service, but granting non-root
users access, refer to https://docs.docker.com/go/daemon-access/

WARNING: Access to the remote API on a privileged Docker daemon is equivalent
         to root access on the host. Refer to the 'Docker daemon attack surface'
         documentation for details: https://docs.docker.com/go/attack-surface/

================================================================================

root@ecs-205380:~# $ sudo apt-get update
$: command not found
root@ecs-205380:~# $sudo apt-get update
Hit:1 http://repo.huaweicloud.com/ubuntu bionic InRelease
Hit:2 http://repo.huaweicloud.com/ubuntu bionic-updates InRelease                                    
Hit:3 http://repo.huaweicloud.com/ubuntu bionic-backports InRelease                                  
Hit:4 http://repo.huaweicloud.com/ubuntu bionic-security InRelease                                   
Hit:5 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic InRelease       
Reading package lists... Done                                                  
root@ecs-205380:~# sudo apt install apt-transport-https ca-certificates curl software-properties-common
Reading package lists... Done
Building dependency tree       
Reading state information... Done
ca-certificates is already the newest version (20210119~18.04.2).
curl is already the newest version (7.58.0-2ubuntu3.18).
software-properties-common is already the newest version (0.96.24.32.18).
apt-transport-https is already the newest version (1.6.14).
0 upgraded, 0 newly installed, 0 to remove and 96 not upgraded.
root@ecs-205380:~# curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
OK
root@ecs-205380:~# sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
Hit:1 http://repo.huaweicloud.com/ubuntu bionic InRelease
Hit:2 http://repo.huaweicloud.com/ubuntu bionic-updates InRelease                    
Hit:3 http://repo.huaweicloud.com/ubuntu bionic-backports InRelease                  
Hit:4 http://repo.huaweicloud.com/ubuntu bionic-security InRelease                                    
Hit:5 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic InRelease                              
Get:6 https://download.docker.com/linux/ubuntu focal InRelease [57.7 kB]       
Get:7 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages [16.7 kB]
Fetched 74.3 kB in 4s (19.1 kB/s)   
Reading package lists... Done
root@ecs-205380:~# 
root@ecs-205380:~# sudo apt update
Hit:1 http://repo.huaweicloud.com/ubuntu bionic InRelease
Hit:2 http://repo.huaweicloud.com/ubuntu bionic-updates InRelease                                        
Hit:3 http://repo.huaweicloud.com/ubuntu bionic-backports InRelease                                      
Hit:4 http://repo.huaweicloud.com/ubuntu bionic-security InRelease                                       
Hit:5 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic InRelease                                 
Hit:6 https://download.docker.com/linux/ubuntu focal InRelease                                           
Reading package lists... Done                                                    
Building dependency tree       
Reading state information... Done
102 packages can be upgraded. Run 'apt list --upgradable' to see them.
root@ecs-205380:~# apt-cache policy docker-ce
docker-ce:
  Installed: 5:20.10.16~3-0~ubuntu-bionic
  Candidate: 5:20.10.16~3-0~ubuntu-focal
  Version table:
     5:20.10.16~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
 *** 5:20.10.16~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
        100 /var/lib/dpkg/status
     5:20.10.15~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:20.10.15~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:20.10.14~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:20.10.14~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:20.10.13~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:20.10.13~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:20.10.12~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:20.10.12~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:20.10.11~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:20.10.11~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:20.10.10~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:20.10.10~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:20.10.9~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:20.10.9~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:20.10.8~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:20.10.8~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:20.10.7~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:20.10.7~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:20.10.6~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:20.10.6~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:20.10.5~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:20.10.5~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:20.10.4~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:20.10.4~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:20.10.3~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:20.10.3~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:20.10.2~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:20.10.2~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:20.10.1~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:20.10.1~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:20.10.0~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:20.10.0~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:19.03.15~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:19.03.15~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:19.03.14~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:19.03.14~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:19.03.13~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:19.03.13~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:19.03.12~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:19.03.12~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:19.03.11~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:19.03.11~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:19.03.10~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:19.03.10~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:19.03.9~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:19.03.9~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:19.03.8~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:19.03.7~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:19.03.6~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:19.03.5~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:19.03.4~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:19.03.3~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:19.03.2~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:19.03.1~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:19.03.0~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:18.09.9~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:18.09.8~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:18.09.7~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:18.09.6~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:18.09.5~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:18.09.4~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:18.09.3~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:18.09.2~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:18.09.1~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     5:18.09.0~3-0~ubuntu-bionic 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     18.06.3~ce~3-0~ubuntu 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     18.06.2~ce~3-0~ubuntu 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     18.06.1~ce~3-0~ubuntu 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     18.06.0~ce~3-0~ubuntu 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
     18.03.1~ce~3-0~ubuntu 500
        500 https://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
root@ecs-205380:~# sudo apt install docker-ce
Reading package lists... Done
Building dependency tree       
Reading state information... Done
Suggested packages:
  aufs-tools cgroupfs-mount | cgroup-lite
Recommended packages:
  libltdl7 pigz
The following packages will be upgraded:
  docker-ce
1 upgraded, 0 newly installed, 0 to remove and 101 not upgraded.
Need to get 21.0 MB of archives.
After this operation, 32.8 kB of additional disk space will be used.
Get:1 https://download.docker.com/linux/ubuntu focal/stable amd64 docker-ce amd64 5:20.10.16~3-0~ubuntu-focal [21.0 MB]
Fetched 21.0 MB in 2s (13.8 MB/s)     
(Reading database ... 111470 files and directories currently installed.)
Preparing to unpack .../docker-ce_5%3a20.10.16~3-0~ubuntu-focal_amd64.deb ...
Unpacking docker-ce (5:20.10.16~3-0~ubuntu-focal) over (5:20.10.16~3-0~ubuntu-bionic) ...
Setting up docker-ce (5:20.10.16~3-0~ubuntu-focal) ...
Processing triggers for systemd (237-3ubuntu10.53) ...
Processing triggers for ureadahead (0.100.0-21) ...
root@ecs-205380:~# sudo systemctl status docker
● docker.service - Docker Application Container Engine
   Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
   Active: active (running) since Sun 2022-06-05 00:39:23 CST; 16s ago
     Docs: https://docs.docker.com
 Main PID: 7211 (dockerd)
    Tasks: 8
   CGroup: /system.slice/docker.service
           └─7211 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock

Jun 05 00:39:23 ecs-205380 dockerd[7211]: time="2022-06-05T00:39:23.423824759+08:00" level=info msg="[grap
Jun 05 00:39:23 ecs-205380 dockerd[7211]: time="2022-06-05T00:39:23.427787848+08:00" level=warning msg="Yo
Jun 05 00:39:23 ecs-205380 dockerd[7211]: time="2022-06-05T00:39:23.427819141+08:00" level=warning msg="Yo
Jun 05 00:39:23 ecs-205380 dockerd[7211]: time="2022-06-05T00:39:23.428075092+08:00" level=info msg="Loadi
Jun 05 00:39:23 ecs-205380 dockerd[7211]: time="2022-06-05T00:39:23.518234233+08:00" level=info msg="Defau
Jun 05 00:39:23 ecs-205380 dockerd[7211]: time="2022-06-05T00:39:23.636634224+08:00" level=info msg="Loadi
Jun 05 00:39:23 ecs-205380 dockerd[7211]: time="2022-06-05T00:39:23.666048577+08:00" level=info msg="Docke
Jun 05 00:39:23 ecs-205380 dockerd[7211]: time="2022-06-05T00:39:23.666095826+08:00" level=info msg="Daemo
Jun 05 00:39:23 ecs-205380 systemd[1]: Started Docker Application Container Engine.
Jun 05 00:39:23 ecs-205380 dockerd[7211]: time="2022-06-05T00:39:23.677921852+08:00" level=info msg="API l

root@ecs-205380:~# 

```

