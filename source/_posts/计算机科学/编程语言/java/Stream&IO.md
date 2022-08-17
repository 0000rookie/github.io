---
title: Stream & IO
abbrlink: '11810039'
date: 2022-08-14 22:43:02
tags:
---

## stream流的获取

:::info

 **stream流的获取**
单列集合：集合对象.stream();
双列集合：不能直接获取，需要间接获取
				集合对象.keySet().stream();
				集合对象.entrySet().stream();
数组   ：
				Arrays.stream(数组名);
同种类型的多个数据：
				Stream(数据1,数据2,数据3......);

:::

### 单列集合

```java
//单列集合
ArrayList<String> list = new ArrayList<>();
list.add("这是");
list.add("\t\t单列集合");
list.stream().forEach(s-> System.out.print(s));
```

### 双列集合

```java
// 双列集合，顺序随机
HashMap<String,Integer> t = new HashMap<>();
t.put("\n这是",18);
t.put("\t\t双列集合",17);
// keySet，双列集合不能直接获取Stream
// 1. 先获取所有的键，2.再把这个Set集合中的所有的键放到Stream中
t.keySet().stream().forEach(s-> System.out.print(s));
// 输出结果：
    //这是		双列集合

// entrySet便利键值对，1. 先获取都爱所有的键值对对象 2. 再把舍管Set集合中的所有的兼职对对象放到Stream流中
t.entrySet().stream().forEach(s-> System.out.print(s));
//输出结果：
    //这是=18		双列集合=17
```

### 数组

```java
// 数组
String [] arr = {"\n这","\t是","\t数","\t组"};
Arrays.stream(arr).forEach(s-> System.out.print(s));
```

### 同种类型多个数据

```java
//同种数据类型的多个数据
Stream.of("\n同种","\t类型","\t多个","\t数据").forEach(s-> System.out.print(s));
```

## StreamFilter方法

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.function.Predicate;
import java.util.stream.Stream;

public class StreamFilter {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("吴小白");
        list.add("吴小白");
        list.add("王炸");
        list.add("冷檬");
    }
}
```

### 过滤流中的字符

```java
// 未简化前
list.stream().filter(
        new Predicate<String>() {
            @Override
            public boolean test(String s) {
                boolean result = s.startsWith("吴");
                return result;
            }
        }
).forEach(s-> System.out.println(s));

// lambda 简化后
list.stream().filter(s->s.startsWith("吴")).forEach(s-> System.out.println(s));
```

### **四种方法：**

 * `Stream<T>limit(long maxSize)`:   		截取指定参数个数的数据,提取前三个数据
 * `Stream<T>skip(long n)`:          跳过指定参数个数的数据,跳过前三个对象
 * `static<T>Stream<T>concat(Stream a,Stream b)`:    合并`a`和`b`两个流为一个流
 * `Stream<T>distinct()`:            去除流中重复的元素。依赖`hashCode`和`equals`方法

### 案例

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.function.Predicate;
import java.util.stream.Stream;

public class StreamFilter {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("吴小白");
        list.add("吴小白");
        list.add("小陈");
        list.add("王大爷");
        list.add("王炸");
        list.add("冷檬");
    }
}
```



#### Stream<T>limit(long maxSize)

```java
//Stream<T>limit(long maxSize):截取指定参数个数的数据,提取前三个数据
list.stream().limit(3).forEach(s-> System.out.println(s));
```

#### Stream<T>skip(long n)

```java
//Stream<T>skip(long n):跳过指定参数个数的数据,跳过前三个对象
list.stream().skip(3).forEach(s-> System.out.println(s));
```

#### Stream<T>distinct()

```java
//Stream<T>distinct():去除流中重复的元素。依赖（hashCode和equals方法
list.stream().distinct().forEach(s-> System.out.println(s));
```

#### static<T>Stream<T>concat(Stream a,Stream b)

```java
//static<T>Stream<T>concat(Stream a,Stream b):合并a和b两个流为一个流
        ArrayList<String> list2 = new ArrayList<>();
        list.add("吴小白");
        list.add("吴小白");
        list.add("小陈");
        list.add("王大爷");
        list.add("王炸");
        list.add("冷檬");

        //stream3.forEach(s-> System.out.println(s));
        //简化
        Stream.concat(list.stream(),list2.stream()).forEach(s-> System.out.println(s));
```

## stream()流中的数据统计与操作

```java
import java.util.ArrayList;
import java.util.function.Consumer;

public class forEachMethod {

    public static void main(String[] args) {

        ArrayList<String> list = new ArrayList<>();
        list.add("吴小白");
        list.add("吴大王");
        list.add("张大师");
        list.add("王炸");
        
    }
}
```

### 统计流中的元素个数

```java
// long cout(): 返回流中的元素数
long conut = list.stream().count();
System.out.println(conut);
```

### 对流中的每个数据进行操作

:::info

`void forEach(Consumer action)`:对此流的每个元素执行操作
`Consumer`接口中的方法`void accept(Tt)`:对给定的参数执行此操作
在`forEach`方法的底层，会循环获取到流中的每一个数据，
并循环调用`accept`方法，并把每一个数据传递给`accept`方法
`s`就依次表示了流中的每一个数据，
所以，我们只要在`accept`方法中，写上处理的业务逻辑就可以了

:::

```java
list.stream().forEach(
        new Consumer<String>() {
            @Override
            public void accept(String s) {
                System.out.println(s);
            }
        }
);

System.out.println("------------------");
// lambda表达式简化
list.stream().forEach(
        (String s)->{
            System.out.println(s);
        }
);
// lambda表达式简化最终版
System.out.println("------------------");
list.stream().forEach(s-> System.out.println(s));
```

## 将stream流中修改的数据保存

**Stream流的收集方法**
`R collect(Collector collector)`
**工具类`Collectors`提供了具体的收集方式**

- `public static<T>Collector toList())`:把元素收集到`List`集合中
- `public static<T>Collector toSet()`:把元素收集到`Set`集合中
- `public static Collector toMap(Function keyMapper,Function valueMapper)`：把元素收集到`Map`集合中

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class changgeStream {

    public static void main(String[] args) {

        // 在stream流中无法直接修改集合中的数据

        ArrayList<Integer> list1 = new ArrayList<>();
        for (int i = 1; i <=10 ; i++) {
            list1.add(i);
        }
        list1.add(2);
        list1.add(2);
        list1.add(2);
        list1.add(2);
        list1.add(2);

        // filter负责过滤数据
        //collect负责手机数据
        //Collect.tolist()在底层创建一个List集合，并将所有的数据添加到List集合中

        Liststream(list1);
        Setsream(list1);
    }
}
```

### Liststream(list1)

:::info

不过滤重复的数据

:::

```java
private static void Liststream(ArrayList<Integer> list1) {
    List<Integer> list = list1.stream().filter(number -> number %2 ==0).collect(Collectors.toList());
    System.out.println(list);
}
```

### Setsream

:::info

如果存在重复的数据则`会过滤掉`

:::

```java
private static void Setsream(ArrayList<Integer> list1) {
    Set<Integer> set = list1.stream().filter(number ->number % 2== 0).collect(Collectors.toSet());
    System.out.println(set);
}
```

## 练习

### Actor实体类

```java Actor实体类
package Bean;

public class Actor {
    private String name;
    public Actor(){

    }

    public String getName() {
        return name;
    }

    public Actor(String name) {
        this.name = name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Actor{" +
                "name='" + name + '\'' +
                '}';
    }
}
```

### 主函数

```java main函数
import Bean.Actor;

import java.util.ArrayList;
import java.util.stream.Stream;

public class Exercise {
    public static void main(String[] args) {
        ArrayList<String> manList = new ArrayList<>();
        manList.add("闰土");
        manList.add("茅台");
        manList.add("蘑菇头");
        manList.add("妹大爷");
        manList.add("猪小明");
        manList.add("王炸");
        ArrayList<String> womanList =new ArrayList<>();
        womanList.add("球球");
        womanList.add("毛毛");
        womanList.add("冷檬");
        womanList.add("腿腿");
        womanList.add("小美");
        womanList.add("小丽");
        /**
         * 现在有两个ArrayList集合，分别存储6名男演员名称和6名女演员名称，要求完成如下的换作
         * 1,男演员只要名字为3个字的前两人
         * 2,女演员只要姓小的，并且不要第一个
         * 3,把过滤后的男演员姓名和女演员姓名合并到一起
         * 4,把上一步操作后的元素作为构造方法的参数创建演员对象，遍历数据
         * 演员类Actor,里面有一个成员变量，一从带参构造方法，以及成员变量对应的get/set方法
         */
//         1. 男演员只要名字为3个字的前两人
        Stream<String> list1 =  manList.stream().filter(name ->name.length() == 3).limit(2);

//        2,女演员只要姓小的，并且不要第一个
        Stream<String> list2 = womanList.stream().filter(name->name.startsWith("小")).skip(1);

//        3,把过滤后的男演员姓名和女演员姓名合并到一起
        Stream.concat(list1,list2).forEach(name -> {
            Actor actor =new Actor(name);
            System.out.println(actor);
        });

    }
}

// 	输出结果：
// 			Actor{name='蘑菇头'}
// 			Actor{name='妹大爷'}
// 			Actor{name='小丽'}
```























