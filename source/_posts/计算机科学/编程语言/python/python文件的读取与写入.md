---
title: python文件的读取与写入
tags:
  - Python
categories:
  - 计算机科学
  - 编程语言
  - python
abbrlink: d9e4874a
date: 2022-05-15 17:54:33
---

```python
"""
先给rw.txt文件写入 20行文字
再从rw.txt文件读取这20行文字
"""

with open('../res/rw.txt','a+',encoding='utf-8') as f :
    for line in range(20):
        f.write('这是第'+str(line)+'行\n')

with open('../res/rw.txt','r',encoding='utf-8') as f :
    for line in f:
        print(line,end="")
        
#　"with open('../res/rw.txt','r',encoding='utf-8') as f: " 的好处
# 可以让你变得更懒，它等于
f = open('../res/rw.txt','r',encoding='utf-8')
...
f.close()
# 可以省略掉f.close()，如果代码块短一点不会忘记关闭流文件，但是如果代码块大一点可能就容易忘记f.close()
```

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022052350.jpeg)

## 用文本模式和二进制模式打开的区别

### 用文本模式打开

```python
with open('../res/rw.txt','r',encoding='utf-8') as f :
    print(f.read())
```

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022052358.jpeg)

### 用二进制的模式打开

```python
with open('../res/rw.txt','rb') as f :
    print(f.read())
```

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022052343.jpg)

## 常用读取的2种方法

### 一次性全读取

```python
with open('../res/rw.txt','r',encoding='utf-8') as f :
    print(f.read())
```

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022052358.jpeg)

### 逐行读取

```python
with open('../res/rw.txt','r',encoding='utf-8') as f :
    for line in f:
        print(line,end="")
        print("-"*5+"逐行输出"+"-"*5)
```

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022052329.jpeg)

## 常用写入的2种方法

### 以列表方法写入文件

```python
lis = []
for i in range(10):
    # 将字符串添加值lis列表末尾
    lis.append('这是第'+str(i)+'行\n')
with open('../res/rw.txt', 'a+', encoding='utf-8') as f:
    # 将整个列表写入到rw.txt文件
    f.writelines(lis)
```

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022050455.jpeg)

| 文件打开模式 | 含义                                                        |
| ------------ | ----------------------------------------------------------- |
| r            | 只读模式，如果文件不存在，则返回FileNotFoundError           |
| w            | 覆盖写模式，文件不存在则创建，存在则完全覆盖                |
| x            | 创建写模式。文件不存在则创建，存在则返回异常FileExistsError |
| a            | 追加写模式，文件存在则创建，存在则在后追加内容              |
| b            | 二进制文件模式                                              |
| t            | 文本文件模式。默认值                                        |
| +            | 与r/w/x/a 一同使用，在原功能基础上增加同时读写功能          |



### 以字符串写入文件

```python
lis = []
for i in range(10):
    lis.append('这是第'+str(i)+'行\n')
with open('../res/rw.txt', 'a+', encoding='utf-8') as f:
    # 遍历lis列表
    for line in range(len(lis)):
        # 将lis的每一个字符串写入rw.txt文件
        f.write(lis[line])
```





### 容易忽略的错误

```python
with open('../res/rw.txt','a+',encoding='utf-8') as f :
    for line in range(10):
        f.write('这是第'+str(line)+'行\n')
        print(f.readline())
```

:::info

这段代码哪里出错了呢？为什么没显示？

:::

:::success

答：其实是在文件流还没关闭之前，指针一直都是在文件末尾，你一写入内容，就读取内容，指针在末尾读取的内容自然就为空了，读取内容是按照从左往右，从上往下的嘛，所以你应该把指针往前面一点移动，这时候需要用到seek(offset) ，offset可选 [0,1,2] 0-->文件开头， 1-->当前位置 ， 2--> 文件末尾

:::





