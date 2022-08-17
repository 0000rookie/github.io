---
title: 'fatal: ''origin'' does not appear to be a git repository'
tags:
  - Git
  - fail
abbrlink: bee4f894
date: 2022-08-16 17:32:38
---

## 发现问题

```bash
fatal: 'origin' does not appear to be a git repository
```

## 分析问题

在给仓库远程提交信息时，发现没找到`origin`这个仓库。

```bash
git push -u origin master
fatal: 'origin' does not appear to be a git repository
fatal: Could not read from remote repository.
```

## 解决问题

```bash
git remote -v                 # 查看远程仓库详细信息，可以看到仓库名称
git remote remove orign       # 删除orign仓库（如果把origin拼写成orign，删除错误名称仓库）
git remote add origin 仓库地址 # 重新添加远程仓库地址
gti push -u origin master     # 提交到远程仓库的master主干
```

