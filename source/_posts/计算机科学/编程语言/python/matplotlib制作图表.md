---
title: matplotlib制作条形图、直方图
tags:
  - Python
categories:
  - 计算机科学
  - 编程语言
  - python
abbrlink: ed51a5a6
date: 2022-05-09 08:39:48
---

## python散点图

### 编写思路

#### 单个画板思路

1. 导入相关模块
2. 获取数据为列表格式 (这是`Y`的值，每一个`X`都能找到一个对应的`Y`值，称为函数)
3. 设置颜色(可选)
4. 添加画板
5. 设置`Ｘ`轴、`Ｙ`轴长度
6. 设置`X`的数据
7. 给画板添加数据
8. 显示画板

#### 多个画板思路

1. 导入香相关模块

2. 获取`lis`数据为列表格式 (这是`Y`的值，每一个`X`都能找到一个对应的`Y`值，称为函数)

3. 设置颜色(可选)

4. 添加`子图1-子图n`并设置`X`、`Y`轴长度

5. 设置`X`的数据

6. 添加画板

   ```python mark:1-5
   for i in range(len(lis)):
       ax1.scatter(x,lis[i],c=colors[i])
   ```

7. 展示画板

### 源码

```python mark:1-18
import numpy as np
import matplotlib.pyplot as plt
# 从data.csv文件读取四列数据，结果返回是一个类似列表的数据，但类型不是列表，可当它是列表使用
opening,top,bottom,closing=np.loadtxt('data.csv', delimiter=',', usecols=(3,4,5,6), unpack=True)

# 将数据封装为列表，便于将数据循环添加进画板
lis = [opening,top,bottom,closing]
colors = ['green','red','b','k']

fig1 = plt.figure(2) 					# 可有可无
ax1 = plt.subplot(211,ylim=(330,370),xlim=(-5,35)) # 添加上子图 211
ax2=plt.subplot(212) 				# 添加下子图 212
x = np.arange(0,30) 				# 设置x轴
for i in range(len(lis)):
    ax1.scatter(x,lis[i],c=colors[i]) # 给上子图添加数据
    ax2.plot(x,lis[i],c=colors[i]) # 给下子图添加数据
plt.show() 					# 展示画板
```

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022053015.jpeg)



## 期末成绩分布(不读取文件)

### 直方图

#### 编写思路

1. 导入模块
2. 设置数据Y
3. 设置数据X
4. 设置中文字体
5. 设置条形图横还是竖
6. 显示图例
7. 设置X、Y坐标的标签
8. 设置标题
9. 显示面板

```python mark:1-40
import numpy as np
import matplotlib.pyplot as plt

data_y = [112,155,103,72,24,9]
x = ["50分以下","50-60分","60-70分","70-80分","80-90分","90-100分"]
# 解决plt显示中文问题
plt.rcParams['font.sans-serif'] = ['SimHei']
# plt.rcParams['axes.unicode_minus'] = False

# 可以把条形图转至方向(横)
plt.bar(x, data_y, 0.5, label='close', color='#87CEFA')
# plt.barh(x, data_y, 0.5, label='close', color='#87CEFA')

plt.legend() 			#显示图例
plt.xlabel('成绩分布')
plt.ylabel('人数') 		#x轴标签
plt.title('考试成绩统计') #y轴标签
plt.show()
```

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022053009.jpeg)



### 饼图

#### 编写思路

1. 导入相关的模块

2. 设置数据X、Y

3. 初始化颜色列表cols[]

4. 设置中文字体

5. 给饼图设置相关参数

   plt.pie(

   data,									   # 数据
   labels=x, 							   # 数据对应的字段
   colors=cols, 					 	 # 颜色
   startangle=180, 			 	  # 旋转角度
   shadow=	True, 				 # 阴影
   explode=(0,0,0,0,0,0.1), 	  # 突出某一块，有几个数据就设置几个0或者0.1
   autopct='%1.1f%%') 			# 接受特定String，指定数值显示方式，默认为None

6. 设置标题

7. 显示面板



```python mark:1-40
import numpy as np
import matplotlib.pyplot as plt

data = [112,155,103,72,24,9]
x = ['50分以下','50-60分','60-70分','70-80分','80-90分','90-10分']
cols=['c','m','r','b']
# 解决plt中文显示的问题
plt.rcParams['font.sans-serif'] = ['SimHei']
# 制作饼图
plt.pie(data,# 数据
labels=x, # 数据对应的字段
colors=cols, # 颜色
startangle=180, # 旋转角度
shadow=	True, # 阴影
explode=(0,0,0,0,0,0.1), # 突出某一块，有几个数据就设置几个0或者0.1
autopct='%1.1f%%') # 接受特定String，指定数值显示方式，默认为None

plt.title('考试成绩统计')
plt.show()
```

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022054935.jpeg)

## 期末成绩分布(读取文件)

### 饼图~1~{.red}

#### 编写思路

1. 导入相关模块

2. 读取文件数据

   列数1的数据,列数2的数据=np.loadtxt('scores.csv', delimiter=',', usecols=(列数1,列数2), unpack=True)

3. 设置字段(X)

4. 初始化颜色列表

5. 设置中文字体

6. 设置饼图参数

7. 设置标题

8. 显示画板

```python mark:1-45
import numpy as np
import matplotlib.pyplot as plt

# usecols=(读取列数)，默认从0开始
c=np.loadtxt('scores.csv', delimiter=',', usecols=(1), unpack=True)
# 设置分数段的参数，每有一个达到该分数段则+1
s4,s5,s6,s7,s8,s9,s10=0,0,0,0,0,0,0
for i in c:
    if i<=40:
        s4 +=1
    elif i<=50:
        s5+=1
    elif i<=60:
        s6+=1
    elif i<=70:
        s7+=1
    elif i<=80:
        s8+=1
    elif i<=90:
        s9+=1
    elif i<=100:
        s10+=1
i =[s4, s5, s6, s7, s8, s9, s10]
# 设置每个分数段的字段
field = ['0-40分','40-50分','50-60分','60-70分','70-80分','80-90分','90-10分']
cols=['c','m','r','b','w','y','g'] # 设置颜色列表
plt.rcParams['font.sans-serif'] = ['SimHei'] # 设置中文字体

# 设置饼图的基本参数
plt.pie(i,  # 数据
        labels=field,  # 数据对应的字段
        colors=cols,  # 颜色
        startangle=180,  # 旋转角度
        shadow=	True,  # 阴影
        explode=(0,0,0,0,0,0.1,0),  # 突出某一块，抽出
        autopct='%1.1f%%') # 接受特定String，指定数值显示方式，默认为None
plt.title('考试成绩统计') # 设置标题
plt.show()
```

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022052953.jpeg)

### 直方图~2~{.red}

#### 编写思路

1. 导入相关模块
2. 获取文件数据
3. 设置字段(X)
4. 初始化颜色列表
5. 设置中文字体
6. 设置直方图为竖向
7. 显示图例
8. 设置X、Y的标签
9. 设置标题
10. 显示画板

```python mark:1-50
import numpy as np
import matplotlib.pyplot as plt

c=np.loadtxt('scores.csv', delimiter=',', usecols=(1), unpack=True)
s4,s5,s6,s7,s8,s9,s10=0,0,0,0,0,0,0
for i in c:
    if i<=40:
        s4 +=1
    elif i<=50:
        s5+=1
    elif i<=60:
        s6+=1
    elif i<=70:
        s7+=1
    elif i<=80:
        s8+=1
    elif i<=90:
        s9+=1
    elif i<=100:
        s10+=1
i =[s4, s5, s6, s7, s8, s9, s10]
field = ['0-40分','40-50分','50-60分','60-70分','70-80分','80-90分','90-100分']
cols=['c','m','r','b','w','y','g']
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.bar(field, i, 0.5, label='close', color='#87CEFA')
# 可以把条形图转至方向(横)
# plt.barh(x, data_y, 0.5, label='close', color='#87CEFA')
plt.legend() #显示图例
plt.xlabel('成绩分布')
# #x轴标签
plt.ylabel('人数')
# #y轴标签
plt.title('考试成绩统计')
plt.show()
```

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022055044.jpeg)



:::info

相关文件下载[data.csv](https://rookie1679.lanzouf.com/i3hGO04j981c)、[score.csv](https://rookie1679.lanzouf.com/iJTfv04j982d)

:::

