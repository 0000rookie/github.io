---
title: python基础
tags: 
  - Python
categories:
  - 计算机科学
  - 编程语言
  - python
abbrlink: 81b2f4bf
date: 2022-04-21 22:44:51
---

## input的多样式输入

```python
# 直接在列表中输入，然后再输出列表
data = [input('姓名：'), input('电话：'), input('学校：')]
print(data)
```

但是输出的是带有列表的格式啊，改一下

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/20220519.jpg)

```python
data = [input('姓名：'), input('电话：'), input('学校：')]
for i in data:
    print(i)
```

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/20220520.jpg)

## 格式化输出

```python mark:1-8
>>>ls="这是字符串"
>>>print("{}".format(ls))
>>>print("%ls"   %ls )
这是字符串
这是字符串
# 总结:第二种和C语言输出类似，但是在""后没有逗号的，注意是没有逗号的
```

## 列表出现相同字符次数统计

```python
# 例子1
>>>ls=[1,1,1,4,5,6,7]
>>>print(ls.count(1))
3

# 例子2
>>>ls=["123","123","111","456"]
>>>print(ls.count("123"))
2

# 总结: count可以计算列表中相同的字符串
```

## 判断字符是否在列表内

```python mark:1-5
>>>ls=["123","123","111","456"]
>>>print("123" in ls)
True
# 总结: 通过“ "字符串" in 数组 ”形式可以检查字符串是否在列表中
```

## 运算符

```python mark:1-5
# i**n 等于2的n次方
>>>sum=2
>>>print(sum**3)
8
```

