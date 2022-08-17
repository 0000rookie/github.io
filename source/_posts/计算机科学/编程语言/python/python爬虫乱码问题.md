---
title: python爬虫乱码问题
categories:
  - 计算机科学
  - 编程语言
  - python
abbrlink: 4f9c6caa
date: 2022-05-19 13:29:04
tags:
  - Python
---

## 修改前

```python
import requests
url=input().strip(' \t\n\r')
html = requests.get(url)

print(html.text)
```

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/20220520.jpeg)





## 修改后

```python
import requests
url=input().strip(' \t\n\r')
html = requests.get(url)
html.encoding=('utf-8')
print(html.text)
```

![](http://hikki.test.upcdn.net/202205225656.jpeg)
