---
title: 'fatal: destination path ‘.‘ already exists and is not an empty directory.'
tags:
  - Git
  - fail
abbrlink: 27fdf617
date: 2022-08-16 17:39:35
---

## 发现问题

```bash
fatal: destination path ‘.‘ already exists and is not an empty directory.
```

## 分析问题

正如报错信息所说的，当前目录已经存在了 git 工程，把`.git`删掉即可

## 解决问题

### 方法一

#### 删掉`.git`

```bash
rm -rf .git
```

#### 重新拉取仓库

```bash
git clone 仓库地址
```

### 方法二

使用`rm -rf .git`删掉`.git`无法恢复，如果没有把握，还是新建一个文件夹比较稳妥

```bash
mkdir test
cd test
git clone 仓库地址
```



