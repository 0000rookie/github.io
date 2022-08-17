---
title: win10鼠标右键文件、文件夹、桌面菜单添加程序
categories:
  - 计算机科学
  - 技术杂谈
  - window
abbrlink: 23cd0b3
date: 2022-07-10 16:00:20
tags:
---



## 了解添加程序所在的目录地址

**空白处右键**(或者桌面空白处)： `HKEY_CLASSES_ROOT/Directory/background/shell`

**文件夹右键**： `HKEY_CLASSES_ROOT/Directory/shell`

**文件上右键**： `HKEY_CLASSES_ROOT/*/shell`

`需求：`在文件夹右键菜单添加一个`VS Code`

![](http://hikki.test.upcdn.net/2022/07/11-21:17:1515.jpg)

## 打开注册表

### win+R

输入`regedit`回车

![](http://hikki.test.upcdn.net/2022/07/1020014141.png)

打开 `HKEY_CLASSES_ROOT/Directory/shell`这个路径。

选择`shell`

![](http://hikki.test.upcdn.net/2022/07/10-20025757.png)

## 新建项并命名为VS Code

![](http://hikki.test.upcdn.net/2022/07/11-21:21:4242.png)

## 将项名改为VS Code

点击新建的项，双击右边的`(默认)`，将数值数据改为`VS Code`

![](http://hikki.test.upcdn.net/2022/07/11-21:23:077.png)

## 新建字符串值

在右边空白处`右键`新建一个字符串值

![](http://hikki.test.upcdn.net/2022/07/11-21:23:3737.png)

## 修改新建的字符串值

将新建的字符串值得名称改为`Icon`。

值改为你的软件安装地址(是带有`.exe`后缀的)

![](http://hikki.test.upcdn.net/2022/07/11-21:23:4343.png)

## 在VS Code下新建子项

选择`VS Code`，右键新建一个项，并改名为`command`

![](http://hikki.test.upcdn.net/2022/07/11-21:23:5252.png)

## 编辑command的值

选中`command`，双击右边的`默认`，修改数值数据为以下格式：

`"你的软件安装路径" "--working-dir" "%1"`(直接复制过去只修改自己的安装路径即可)

```yaml
"E:\studyAPP\Microsoft VS Code\Code.exe" "--working-dir" "%1"
```

![](http://hikki.test.upcdn.net/2022/07/11-21:23:5656.png)

:::info

添加成功

:::

