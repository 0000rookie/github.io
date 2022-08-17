---
title: 安装qt5的时候报错
tags:
  - Python
  - fail
categories:
  - 计算机科学
  - 编程语言
  - python
abbrlink: af3d5cf5
date: 2022-04-23 00:46:46
---

## 报错内容: ERROR: spyder 4.0.1 requires pyqtwebengine<5.13; python_version >= 3, which is
  not installed. ERROR: spyder 4.0.1 has requirement pyqt5<5.13; python_version >= 3, but you'll have pyqt5 5.15.6 which is incompatible.

原因是`Spyder`不是最新版本

```bash mark:1-8
>>>pip install pyqt5 #报错内容如下
ERROR: spyder 4.0.1 requires pyqtwebengine<5.13; python_version >= "3", which is not installed. 
ERROR: spyder 4.0.1 has requirement pyqt5<5.13; python_version >= "3", but you'll have pyqt5 5.15.6 which is incompatible.
```



## 查询spyder版本

更新版本，通过`pip install spyder==*`查询版本

```bash mark:1-2
>>>pip install spyder==*
ERROR: Could not find a version that satisfies the requirement spyder==* (from versions: 2.3.0, 2.3.1, 2.3.2, 2.3.3, 2.3.4, 2.3.5.2, 2.3.6, 2.3.7, 2.3.8, 2.3.9, 3.0.0b2, 3.0.0b3, 3.0.0b4, 3.0.0b5, 3.0.0b6, 3.0.0b7, 3.0.0, 3.0.1, 3.0.2, 3.1.0, 3.1.1, 3.1.2, 3.1.3, 3.1.4, 3.2.0, 3.2.1, 3.2.2, 3.2.3, 3.2.4, 3.2.5, 3.2.6, 3.2.7, 3.2.8, 3.3.0, 3.3.1, 3.3.2, 3.3.3, 3.3.4, 3.3.5, 3.3.6, 4.0.0b1, 4.0.0b2, 4.0.0b3, 4.0.0b4, 4.0.0b5, 4.0.0b6, 4.0.0b7, 4.0.0rc1, 4.0.0rc2, 4.0.0rc3, 4.0.0, 4.0.1, 4.1.0, 4.1.1, 4.1.2, 4.1.3, 4.1.4, 4.1.5, 4.1.6, 4.2.0, 4.2.1, 4.2.2, 4.2.3, 4.2.4, 4.2.5, 5.0.0a1, 5.0.0a2, 5.0.0a3, 5.0.0a4, 5.0.0a5, 5.0.0a6, 5.0.0a7, 5.0.0, 5.0.1, 5.0.2, 5.0.3, 5.0.4, 5.0.5, 5.1.0, 5.1.1, 5.1.2, 5.1.3, 5.1.4, 5.1.5, 5.2.0, 5.2.1, 5.2.2, 5.3.0)
ERROR: No matching distribution found for spyder==*
```

## 安装5.3.0版本

```bash mark:1-2
>>>pip install spyder==5.3.0
```

