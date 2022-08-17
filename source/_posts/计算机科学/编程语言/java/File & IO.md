---
title: File & IO 文件的读写
abbrlink: 1299fac0
date: 2022-08-16 23:11:15
tags:
---

:::info

字节流三步走：

1. 创建字节输出流对象
2. 写数据
3. 释放资源
4. 

:::

## 字节流写数据的三种方式

```java
void write(int b);							//以此写一个字节数据
void write(byte[]b);						// 一次写一个字节数组数据
void write(byte[]b,int off,int len);		//一次写一个字节数组的部分数据
```

