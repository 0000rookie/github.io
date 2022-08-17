---
title: "File & Dir文件与文件夹"
abbrlink: 2b075c80
date: 2022-08-15 22:16:34
tags:
---

## 生成File对象的三个方法

```java
package File;

import java.io.File;

public class FilePath {

    public static void main(String[] args) {

        method3();
        method2();
        method1();
    }
}
```

### File(path)

````java
    private static void method1() {
        String path = "p:\\test\\test.txt";
        File file = new File(path);
        System.out.println(file);
    }
````

### File(path1,path2)

```java
private static void method2() {
    String path1 = "p:\\test";
    String path2 = "test.txt";
    File file = new File(path1,path2);
    System.out.println(file);
}
```

### File(file,path)

```java
private static void method3() {
    File file = new File("p:\\test");
    String path = "test.txt";
    File file1 = new File(file,path);
    System.out.println(file1);
}
```

## 创建文件夹/文件

`public boolean createNewFile()`：创建一个新的空的文件
`public boolean mkdir()`：创建一个单级文件夹
`public boolean mkdirs()`：创建一个多级文件夹

```java
package File;

import java.io.File;
import java.io.IOException;

public class FilePath {

    public static void main(String[] args) throws IOException {

        newmkdirs();
        createFile();
    }
}
```



### 创建文件夹`file.mkdir()`与`file.mkdirs()`

```java
private static void newmkdirs() {
    File file = new File("p:\\test\\a\\b\\c");
    boolean results = file.mkdir();     // 只能创建单个文件夹
    boolean results2 = file.mkdirs();   // 可以创建多级文件夹
    System.out.println(results);
    System.out.println(results2);
}
```

### 创建文件`file.createNewFile()`

```java
private static void createFile() throws IOException {
    //1. createNewFile()只能创建文件，不能创建文件夹
    //2. 如果文件创建成功，则返回true，否则为false
    File file = new File("p:\\test\\a.txt");
    boolean resulte = file.createNewFile();
    System.out.println(resulte);
}
```



## 删除

### `file.delete()`删除文件和空文件夹

注意点：

1. 不走回收站
2. 如果删除得是文件，则直接删除，如果是文件夹，则只能删除空文件夹
3. 如果想删除有内容的文件夹，则需要先删除文件夹里面的全部内容才能删除该文件夹(用递归删除)

**总的来说只能删除文件和空文件夹**

```java
private static void delfile() {
    /**
     * 注意点：
     *
     * 1. 不走回收站
     * 2. 如果删除得是文件，则直接删除，如果是文件夹，则只能删除空文件夹
     * 3. 如果想删除有内容的文件夹，则需要先删除文件夹里面的全部内容才能删除该文件夹(用递归删除)
     */

    //        删除成功返回true，否则返回false
    File file = new File("p:\\test\\test.txt");
    boolean results = file.delete();
    System.out.println(results);
}
```

## 文件或者文件夹是否存在

`public boolean isDirectory（）`：测试此抽象路径名表示的`File`是否为目录
`public boolean isFile（）`：测试此抽象路径名表示的`File`是否为文件
`public boolean exists（）`：测试此抽象路径名表示的`File`是否存在
`public string getName（）`：返回由此抽象路径名表示的文件或目录的名称

### public boolean isDirectory()

```java
private static void isdir() {
    // 如果是文件夹，则返回true，反之返回false
    File file = new File("p:\\test\\a.txt");
    boolean results = file.isDirectory();
    System.out.println(results);
}
```



### public boolean isFile()

```java
private static void is_File() {
    // 如果是文件，返回true ，反之不是文件，返回false
    File file = new File("p:\\test");
    boolean results = file.isFile();
    System.out.println(results);
}
```

### public boolean exists()

```java
private static void is_path() {
    // 如果路径存在，则返回true，反之返回false
    File file = new File("p:\\test");
    boolean results = file.exists();
    System.out.println(results);
}
```

### public string getName()

```java
private static void isPathName() {
    // 如果路径存在，则返回文件名或者文件夹名
    File file = new File("p:\\test\\test.txt");
    String results = file.getName();
    System.out.println(results);
}
```

## 获取文件夹内容

### `file.listFile()`

:::info

**listFile方法注意事项：**

1. 当调用者不存在时，返回`null`
2. 当调用者是一个文件时，返回`null`
3. 当调用者是一个空文件夹时，返回一个长度为`0`的数组
4. 当调用者是一个有内容的文件夹时，将里面的文件和文件夹的路径放在File数组中返回
5. 当调用者是一个有隐藏文件的文件夹时，将里面所有文件和文件夹的路径都放在File数组中返回，并且是`包含隐藏内容`

:::

```java
private static void getDirContent() {
    // 获取文件夹内容
    File file = new File("p:\\test\\a.txt");
    File[] files = file.listFiles();
    if (files != null)
       for (File path:files) {
           System.out.println(path);

       }
}
```

### 练习

#### 练习一：在当前模块下的aaa文件夹中创造一个a.txt文件

##### 方法一

```java
    private static void newDirFile1() throws IOException {
        // 练习一：在当前模块下的aaa文件夹中创造一个a.txt文件
        File file = new File("./aaa/a.txt");
        File newaaa = new File("./aaa");
        boolean mkdir = newaaa.mkdir();
        boolean newFile = file.createNewFile();
        System.out.println(newFile);
    }
```

##### 方法二

```java
private static void newDirFile2() throws IOException {
    // 练习一：在当前模块下的aaa文件夹中创造一个a.txt文件
    File file1 = new File("./aaa");
    if(!file1.exists())
        file1.mkdirs();
    File file = new File(file1,"a.txt");
    boolean newFile = file.createNewFile();
    System.out.println(newFile);
}
```



### 练习二：在当前模块新建多级文件夹a/b/c/a.txt，然后再把它删除

```java
package File;

import java.io.File;
import java.io.IOException;

public class ListFile {
    public static void main(String[] args) throws IOException {
//        在当前模块新建多级文件夹a/b/c/a.txt，然后再把他删除
        //新建文件夹
        File file = new File("./a/b/c");
        if (!file.exists()) file.mkdirs();
        File file1 = new File(file,"a.txt");
        file1.createNewFile();
        // 删除文件夹

        File a = new File("./a");
        deleteDir(a);
    }

    private static void deleteDir(File a) {
        // 先删掉文件夹内容
        File[] files = a.listFiles();
        for (File file:files) {
            if (file.isFile())
                // 如果是文件，直接删除
                file.delete();
            else
                // 如果是文件夹，则用递归进入文件夹再删除文件或者空文件夹
                deleteDir(file);
        }
        // 删掉a文件夹
        a.delete();
    }
}
```



### 练习三：用HashMap集合来统计某文件夹内文件类型的个数

```java
private static void getCountFileType() {
    // 用HashMap集合来统计某文件夹内文件类型的个数
    File file = new File("p:\\test");
    HashMap<String,Integer> hm = new HashMap<>();
    getCount(hm,file);
    System.out.println(hm);
}
```

```java
private static void getCount(HashMap<String, Integer> hm, File file) {
    File[] files = file.listFiles();
    for (File f : files) {
        if(f.isFile()){
            String fileName = f.getName();
            String[] fileNameArr = fileName.split("\\.");
            if(fileNameArr.length == 2){
                String fileEndName = fileNameArr[1];
                if(hm.containsKey(fileEndName)){
                    //已经存在
                    //将已经出现的次数获取出来
                    Integer count = hm.get(fileEndName);
                    //这种文件又出现了一次.
                    count++;
                    //把已经出现的次数给覆盖掉.
                    hm.put(fileEndName,count);
                }else{
                    //不存在
                    //表示当前文件是第一次出现
                    hm.put(fileEndName,1);
                }
            }
        }else{
            getCount(hm,f);
        }
    }
}
```











