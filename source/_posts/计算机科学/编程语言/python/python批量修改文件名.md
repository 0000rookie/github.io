---
title: python批量修改文件名
tags:
  - Python
categories:
  - 计算机科学
  - 编程语言
  - python
abbrlink: 3050703f
date: 2022-06-12 17:22:15
---

## 批量修改文件名

```python 批量修改文件名
import os
# path 这个是你要改文件夹里面的文件名
path = "./外链压缩/"
lsname = os.listdir(path)
n = 0
for i in lsname:
	oldname = path + os.sep+lsname[n]
	# 我这里将文件名按顺序改成 "1-n.jpg"
	# 如果你想改成 "测试1 - 测试n.jpg",就将下式改成
	# newname = path+os.sep+"测试"+str(n+1)+'.jpg'
	newname = path+os.sep+str(n+1)+'.jpg'
	os.rename(oldname,newname)
	n+=1
```

效果图

![](http://hikki.test.upcdn.net/202206122328.jpeg)

