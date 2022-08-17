---
title: Python组合数据类型
tags:
  - Python
categories:
  - 计算机科学
  - 编程语言
  - python
abbrlink: cd7b33aa
date: 2022-04-08 01:26:19
---



:::info

每天记录自己学习情况

:::





## 列表检查是否存在重复元素

编写函数，用列表为参数，判断有无重复元素，若有就返回`True`，否则，返回`False`，并调用函数来验证。可使用以下列表来进行验证：

lst_1 = [1, 3, 4, 5, 1, 45]

lst_2 = ['N', 'B', 'A', '2022']

```python mark:1,2-27
lst_1 = [1, 3, 4, 5, 1, 45]
lst_2 = ['N', 'B', 'A', '2022']
lst_1.sort()
lst_2.sort()

def prin(x):
    print("[", end="")
    for i in range(len(x)):
        print(x[i], end="")
        if i < len(x) - 1:
            print(end=",")
        else:
            print("]", end="  ")
    for l in range(len(x)):
        if x[l] == x[l - 1]:
            FF = "有重复元素"
            break
        else:
            FF = "无重复元素"
    print(FF)

prin(lst_1)
prin(lst_2)

```



## 集合检查是否存在重复元素

编写函数，用列表为参数，利用集合元素的无重复性来判断列表有无重复元素，若有就返回`True`，否则，返回`False`，并调用函数来验证

```python mark:1,2-25
lst_1 = [1, 2, 4, 5, 1, 4445]
lst_2 = ['N', 'B', 'A', '2022']

def lstt(x):
    lst1 = list(set(x))
    if len(lst1) < len(x):
        return True
    else:
        return False

result1 = lstt(lst_1)
result2 = lstt(lst_2)

def print1(result, lst):
    if result == True:
        print('列表：{}有 重复元素'.format(lst))
    else:
        print('列表：{}无 重复元素'.format(lst))

print1(result1, lst_1)
print1(result2, lst_2)

```

## 生日悖论

现假定一年只有`365`天，不考虑闰年情况。请先阅读[生日悖论](https://baike.baidu.com/item/%E7%94%9F%E6%97%A5%E6%82%96%E8%AE%BA/2715290) 相关知识，再按下列要求编程模拟检验：
(1)编写函数`createBirthday()：`使用随机函数生成某人的生日，结果为字符串，由`01.01`到`12.31`表示，月份.天均为两位数，中间用点号(.)隔开；
(2)编写函数`groupBirthdays(n)：`调用`createBirthday()`生成团队成员的生日，用列表方式返回，其中：`n为`团队成员数；
(3)主函数：输入团队成员数，调用`groupBirthdays(n)`和创建`isRepeat()`函数查重，模拟`100000`次，计算至少有两人生日相同的比例

```python mark:1,2-45
import random as r

num = 100000
def createBirthday():
    birthday = []
    month = str(r.randint(1, 12)).rjust(2, '0')
    day = str(r.uniform(0.01, 0.31))[1:4]
    birthday = month + day
    # print(birthday)
    # print(type(birthday))
    return birthday

def groupBirthdays(n):
    lst = []
    for i in range(n):
        lst.append(createBirthday())
    # print(lst)
    return lst

def isRepeat(x):
    if len(x) == len(set(x)):
        return False  # 不重复
    else:
        return True  # 重复

def main():
    x = int(input("请输入团队人数："))
    nums = 0
    for i in range(100000):
        times = isRepeat(groupBirthdays(x))
        if times == True:
            nums += 1
        else:
            continue
    y = str(nums / 100000 * 100)[:5]
    print("假设一个团队有{}人，用随机模拟{}次，其中至少有两人生日相同的比例为{}%".format(x, 100000, y))

for i in range(3):
    main()
```

## 文字出现频率

编写程序，对文档”习总书记在北京大学师生座谈会上的讲话.txt”进行分析，按出现频率的降序打印字符(前20位)。

```python mark:1,2-16
import jieba

txt = open("F:\\习总书记在北京大学师生座谈会上的讲话 .txt","r",encoding='gbk',errors='ignore').read()
lst = jieba.lcut(txt)
cout = {}
for ls in lst:
    ls = ls.replace(' ','')
    if len(ls) == 1:
        continue
    else:
        cout[ls] = cout.get(ls,0)+1
items = list(cout.items())
items.sort(key=lambda x: x[1], reverse=True)
for item in range(20):
    word, count = items[item]
    print("词语:【{}】,出现次数:{}".format(word, count))
```

:::warning

以上如有错误，欢迎留言指出

:::
