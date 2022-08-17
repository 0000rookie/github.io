---
title: win10如何开启远程桌面
tags:
  - 教程
categories:
  - 计算机科学
  - 技术杂谈
  - window
abbrlink: 64ed46b0
date: 2022-05-17 12:00:03
---

## 添加用户组

### 查看系统版本

#### 是否是专业版

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022050105.png)

如果不是专业版，请移步重装`专业版系统`再过来开启桌面远程

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022050304.png)



### 查看系统用户

我这里已经有一个用户叫`lilbai`，如果你这里显示的是`Administrator`，也没事，之后的操作`lilbai`的时候,你操作`Administrator`就行

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022050411.png)

### 给用户添加权限

#### 打开系统管理

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022050741.png)

#### 打开本地用户

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022050805.png)

#### 修改密码

接下来我需要对`lilbai`这个账号添加权限，如果你查看系统用户的那一步显示的是`Administrator`，那你就对`Administrator`操作。

因为我忘记了`lilbai`这个账号的密码，我需要重新设置一下。如果你也忘记密码了，可以重新设置一下密码。

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022050907.png)



#### 打开用户属性

如果你查看系统用户的那一步显示的是`Administrator`，那你就对`Administrator`操作，也就是图中的第一个。

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022050837.png)

#### 设置密码永不过期

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022051258.png)

#### 给用户添加组

选择`隶属于`，再点击下方的`添加`

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022051330.png)

#### 添加Users组

输入之后，点击检查名称，检查名称之后会在输入框出现`DESKTOP-5EJQO9A\Users`，`DESKTOP-5EJQO9A`是你电脑的名称，每台电脑都不一样的

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022051407.png)

#### 添加Administrator组

输入之后，点击检查名称

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022051411.png)

在坚持名称之后会出现这样的画面

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022051420.png)

#### 添加Remeto Desktop Users组

输入之后，点击检查名称。

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022051426.png)

#### 添加组完成

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022051956.png)



## 开启远程功能

### 打开远程桌面设置

在键盘按住`win+S`打开搜索，搜索`远程桌面设置`

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022052243.png)

### 启用远程桌面

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022052553.png)

## 测试远程桌面

### 查看电脑IP地址

相关操作我们都准备好了，接下来就是测试远程自己的电脑。我们在学校机房的时候想要远程自己的电脑，但是机房电脑是怎么找到`我的电脑`，学校一大堆电脑，这就需要知道自己电脑的`IP`地址了，`IP`地址可以让机房的电脑查找到`自己的电脑`，那怎么知道自己电脑的`IP`地址呢？

在键盘按住`win+R`，打开这个窗口，输入`cmd`，然后`回车(Enter)`

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022053214.png)

### 输入`ipconfig`

输入`ipconfig`，然后回车，这个`IPv4`就是我们需要的`IP`地址了

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022053650.png)

### 远程电脑

这一步你可以借你舍友的电脑测试一下远程，在你舍友的电脑上操作以下步骤

:::info

要注意的是：你电脑和舍友电脑都要连接学校的内网，否则连接失败

:::

在键盘按住`win+R`，打开这个窗口，输入`mstsc`，然后`回车(Enter)`

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022053820.jpeg)

### 输入`IP`地址

输入刚刚在`cmd`获取的`IPv4`

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022053825.jpeg)

### 输入电脑名字和密码

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022053832.jpeg)



:::success

这样就远程成功了

:::

## 拓展

### 修改电脑名字

#### 重命名电脑

打开`关于`，选择`重命名这台电脑`，修改成自己觉得帅气的名字，修改完要重启电脑重命名才会生效

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022053023.png)

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022053132.png)

### 修改开机密码

类似手机的开机密码，输入几个字母或者数字就能进入手机，但是不改变手机账号的密码。这里也是，不改变电脑账号`lilbai`密码

#### 打开账户

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022050801.jpeg)

#### 添加PIN

添加这个PIN之后，开机的时候可以输入账号lilbai密码，也可以输入PIN密码，就多一个开机方式，同理，你如果添加指纹、人脸也是可以的，如果是人脸识别，这样还不需要输入密码开机，还是挺方便的。

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022050859.jpeg)

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022050904.jpeg)
