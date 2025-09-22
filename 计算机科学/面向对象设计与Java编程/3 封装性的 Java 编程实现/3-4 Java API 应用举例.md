# 3.4 Java API 应用举例

::: tip
本页除目录以外的内容由 Gemini 2.5 Pro 生成，由 [TouHikari](https://github.com/TouHikari/) 审阅并修改。
:::

**Java API（Application Programming Interface，应用程序编程接口）是 Java 提供给开发人员的一套预先定义好的类、接口和方法的集合。这些 API 封装了大量常用的功能，使我们无需关心底层实现的细节，就能轻松地构建复杂的应用程序。**

将 API 想象成一个工具箱，里面装满了各种各样的工具（类和方法）。当我们需要实现某个特定的功能时，比如操作字符串、进行数学计算或处理用户输入，我们只需要从工具箱中拿出相应的工具并使用它即可。这不仅能极大地提高开发效率，还能确保代码的稳定性和可靠性。

在本章节中，我们将介绍一些 Java 中最常用和最重要的 API，包括：

- **`Object` 类**: Java 中所有类的“祖先”，提供了对象的基本行为。
- **`String` 类**: 用于处理和操作文本字符串。
- **`Math` 类**: 提供了进行基本数学运算的静态方法。
- **包装类 (Wrapper Classes)**: 将基本数据类型（如 `int`）转换为对象。
- **`Scanner` 类**: 用于读取用户的输入。
- **`ArrayList` 类**: 一种动态数组，可以方便地添加或删除元素。

通过学习这些核心 API，你将能够更加自如地运用 Java 语言，为开发更复杂的程序打下坚实的基础。

## 3.4.1 类 `Object`

`Object` 类是 Java 中所有类的“根”或“祖先”。这意味着，无论你创建任何一个类，它都直接或间接地继承自 `Object` 类。因此，`Object` 类中定义的方法对于所有 Java 对象都是可用的。

尽管 `Object` 类包含多个方法，但对于初学者来说，最重要和最常用的是 `equals()` 和 `toString()` 这两个方法。

### `equals(Object obj)` 方法

`equals()` 方法用于比较两个对象是否“相等”。在 `Object` 类中，这个方法的默认行为是比较两个对象的内存地址，这与使用 `==` 运算符的效果是一样的。

然而，在很多情况下，我们希望根据对象的内容来判断它们是否相等，而不是它们的内存地址。例如，我们可能认为两个 `Student` 对象，只要它们的学号相同，就是同一个学生。在这种情况下，我们就需要在自己的类中“重写”（Override）`equals()` 方法。

**示例：重写 `equals()` 方法**

假设我们有一个 `Student` 类：

```java
public class Student {
    private String studentId;
    private String name;

    public Student(String studentId, String name) {
        this.studentId = studentId;
        this.name = name;
    }

    // 重写 equals 方法
    @Override
    public boolean equals(Object obj) {
        // 1. 检查 obj 是否为 null
        if (obj == null) {
            return false;
        }
        // 2. 检查 obj 是否是 Student 类的实例
        if (!(obj instanceof Student)) {
            return false;
        }
        // 3. 将 obj 强制转换为 Student 类型
        Student other = (Student) obj;
        // 4. 比较学号是否相同
        return this.studentId.equals(other.studentId);
    }
}
```

现在，我们可以这样比较两个 `Student` 对象：

```java
Student s1 = new Student("1001", "张三");
Student s2 = new Student("1001", "李四");
Student s3 = new Student("1002", "王五");

System.out.println(s1.equals(s2)); // 输出: true，因为学号相同
System.out.println(s1.equals(s3)); // 输出: false，因为学号不同
```

### `toString()` 方法

`toString()` 方法返回一个表示该对象的字符串。`Object` 类的默认实现返回的是“类名@哈希码”的形式，通常对我们来说没有太多实际意义。

为了让对象的字符串表示更加友好和易于理解，我们通常也需要重写 `toString()` 方法。

**示例：重写 `toString()` 方法**

让我们继续在 `Student` 类中重写 `toString()` 方法：

```java
public class Student {
    private String studentId;
    private String name;

    // ... (构造方法和 equals 方法)

    // 重写 toString 方法
    @Override
    public String toString() {
        return "Student[studentId=" + studentId + ", name=" + name + "]";
    }
}
```

现在，当我们尝试打印一个 `Student` 对象时，就会得到一个更具可读性的字符串：

```java
Student s1 = new Student("1001", "张三");
System.out.println(s1); // 输出: Student[studentId=1001, name=张三]
// System.out.println(s1) 实际上会自动调用 s1.toString()
```

通过重写 `equals()` 和 `toString()` 方法，我们可以让我们创建的类表现出更符合预期的行为，这也是面向对象编程中封装和多态思想的重要体现。

## 3.4.2 类 `String`

在 Java 中，`String` 类是用来表示和操作文本（字符串）的最核心的类。几乎所有的 Java 应用程序都会以某种方式使用到字符串，因此熟练掌握 `String` 类是至关重要的。

一个非常重要的概念是：**`String` 对象是不可变的（Immutable）**。这意味着一旦一个 `String` 对象被创建，它的值就不能被改变。当你对一个字符串进行修改时（例如，连接或替换字符），Java 实际上会创建一个全新的 `String` 对象来存放修改后的结果，而原始的字符串对象保持不变。

### 创建字符串

创建字符串最简单的方式是直接赋值：

```java
String greeting = "Hello, World!";
```

### `String` 类的常用方法

`String` 类提供了大量的方法来操作字符串。下面是一些最常用的方法，配有简单的示例。

| 方法定义                                         | 功能                                        |
| ------------------------------------------------ | ------------------------------------------- |
| `int length()`                                   | 返回此字符串的长度                          |
| `char charAt(int index)`                         | 返回指定索引处的 `char` 值                  |
| `String substring(int beginIndex)`               | 从 `beginIndex` 截取到字符串末尾            |
| `String substring(int begin, int end)`           | 截取从 `begin` 到 `end-1` 的子字符串        |
| `boolean equals(Object anObject)`                | 比较字符串内容是否相等（区分大小写）        |
| `boolean equalsIgnoreCase(String anotherString)` | 比较字符串内容是否相等（不区分大小写）      |
| `int indexOf(String str)`                        | 返回子字符串首次出现的索引，未找到则返回 -1 |
| `String toLowerCase()`                           | 将字符串所有字符转换为小写                  |
| `String toUpperCase()`                           | 将字符串所有字符转换为大写                  |
| `String trim()`                                  | 去除字符串前后的空白字符                    |
| `String concat(String str)`                      | 将指定字符串连接到此字符串的结尾            |
| `String[] split(String regex)`                   | 根据匹配的正则表达式 `regex` 来拆分字符串   |
| `static String valueOf(...)`                     | 将其他数据类型转换为字符串                  |

### 方法应用示例

#### 获取长度和字符

```java
String text = "Java Programming";
int len = text.length(); // len 的值为 16
char ch = text.charAt(0); // ch 的值为 'J'
```

#### 比较字符串

比较字符串时，**应该始终使用 `equals()` 方法**，而不是 `==`。`==` 比较的是对象的内存地址，而 `equals()` 比较的是字符串的内容。

```java
String s1 = "hello";
String s2 = "hello";
String s3 = new String("hello");

System.out.println(s1 == s2);      // 输出: true (因为 Java 对字面量字符串有优化)
System.out.println(s1 == s3);      // 输出: false (s1 和 s3 是不同的对象)
System.out.println(s1.equals(s3)); // 输出: true (内容相同)
```

#### 截取与查找

```java
String message = "Welcome to Java";
String sub = message.substring(11); // sub 的值为 "Java"
int index = message.indexOf("to");  // index 的值为 8
```

#### 大小写转换和修剪

```java
String raw = "  Some Text  ";
String lower = raw.toLowerCase(); // lower 的值为 "  some text  "
String upper = raw.toUpperCase(); // upper 的值为 "  SOME TEXT  "
String trimmed = raw.trim();      // trimmed 的值为 "Some Text"
```

### 字符串的连接

在 Java 中，最常用的字符串连接方式是使用 `+` 运算符。

```java
String firstName = "John";
String lastName = "Doe";
String fullName = firstName + " " + lastName; // fullName 的值为 "John Doe"
```

虽然 `concat()` 方法也能实现连接，但 `+` 运算符更灵活，可以连接任何数据类型，而不仅仅是字符串。

### 数据类型转换

#### 其他类型转为字符串

使用 `String.valueOf()` 方法可以将任何基本数据类型或对象转换为字符串。

```java
int number = 123;
String strNumber = String.valueOf(number); // strNumber 的值为 "123"

double price = 99.99;
String strPrice = String.valueOf(price); // strPrice 的值为 "99.99"
```

#### 字符串转为数值类型

当需要将一个字符串（如 "123"）转换为一个数值（如 `int` 类型的 123）时，需要使用相应包装类（Wrapper Class）的 `parseXXX` 方法。

```java
String strInt = "456";
int intValue = Integer.parseInt(strInt); // intValue 的值为 456

String strDouble = "3.14";
double doubleValue = Double.parseDouble(strDouble); // doubleValue 的值为 3.14
```

### 字符串分割

`split()` 方法是一个非常强大的工具，它可以根据你提供的“分隔符”将一个字符串拆分成一个字符串数组。

```java
String csvLine = "Apple,Banana,Orange";
String[] fruits = csvLine.split(","); // 使用逗号作为分隔符
// fruits 数组将包含 ["Apple", "Banana", "Orange"]

for (String fruit : fruits) {
    System.out.println(fruit);
}
```

## 3.4.3 类 `Math`

当需要进行复杂的数学运算时，比如求平方根、绝对值、三角函数等，Java 的 `java.lang.Math` 类就派上了用场。这个类提供了一系列静态方法（Static Methods），让你无需创建 `Math` 类的实例，就可以直接调用这些方法。

因为所有方法都是静态的，所以你只需要通过 `Math.方法名()` 的形式来使用它们。

### `Math` 类的常用方法

| 方法定义                                | 功能                                           |
| --------------------------------------- | ---------------------------------------------- |
| `static double abs(double a)`           | 返回 `double` 值的绝对值                       |
| `static int abs(int a)`                 | 返回 `int` 值的绝对值                          |
| `static double ceil(double a)`          | 返回大于或等于参数的最小整数（向上取整）       |
| `static double floor(double a)`         | 返回小于或等于参数的最大整数（向下取整）       |
| `static long round(double a)`           | 返回参数四舍五入后的 `long` 值                 |
| `static double max(double a, double b)` | 返回两个 `double` 值中较大的一个               |
| `static int min(int a, int b)`          | 返回两个 `int` 值中较小的一个                  |
| `static double pow(double a, double b)` | 返回第一个参数的第二个参数次幂的值 (`a^b`)     |
| `static double sqrt(double a)`          | 返回 `double` 值的正确舍入平方根               |
| `static double random()`                | 返回一个 `[0.0, 1.0)` 范围内的随机 `double` 值 |

### 方法应用示例

#### 取整运算

```java
double num = 3.7;

System.out.println(Math.ceil(num));  // 输出: 4.0 (向上取整)
System.out.println(Math.floor(num)); // 输出: 3.0 (向下取整)
System.out.println(Math.round(num)); // 输出: 4 (四舍五入)
```

#### 最值与乘方

```java
System.out.println(Math.max(10, 20));    // 输出: 20
System.out.println(Math.min(-5.5, -5.6)); // 输出: -5.6
System.out.println(Math.pow(2, 3));      // 输出: 8.0 (2的3次方)
System.out.println(Math.sqrt(64));     // 输出: 8.0 (64的平方根)
```

#### 生成随机数

`Math.random()` 方法对于生成游戏、模拟或测试数据非常有用。它返回一个大于等于 0.0 且小于 1.0 的 `double` 值。

如果你需要生成一个特定范围内的整数，可以使用以下公式：

`int randomNumber = (int) (Math.random() * (max - min + 1)) + min;`

例如，生成一个 1 到 100 之间的随机整数：

```java
int min = 1;
int max = 100;
int randomInt = (int) (Math.random() * (max - min + 1)) + min;
System.out.println("生成的随机整数是: " + randomInt);
```

## 3.4.4 包装类、自动装箱与拆箱

Java 是一种面向对象的语言，但它也包含了一些不属于对象的基本数据类型（Primitive Types），如 `int`、`double`、`char` 等。为了在需要对象的上下文中使用这些基本类型（例如，将它们存储在 `ArrayList` 等集合中），Java 提供了一套特殊的类，称为 **包装类（Wrapper Classes）**。

### 什么是包装类？

每个基本数据类型都有一个对应的包装类，它将基本类型“包装”成一个对象。这样，你就可以像操作其他任何对象一样操作这些值了。

以下是基本数据类型及其对应的包装类：

| 基本数据类型 | 包装类      |
| ------------ | ----------- |
| `byte`       | `Byte`      |
| `short`      | `Short`     |
| `int`        | `Integer`   |
| `long`       | `Long`      |
| `float`      | `Float`     |
| `double`     | `Double`    |
| `char`       | `Character` |
| `boolean`    | `Boolean`   |

### 自动装箱 (Autoboxing)

在早期版本的 Java 中，你需要手动将一个基本类型转换为包装类对象：

```java
// 手动装箱
int primitiveInt = 10;
Integer wrapperInt = Integer.valueOf(primitiveInt);
```

从 Java 5 开始，引入了 **自动装箱（Autoboxing）** 的特性，编译器会自动为你完成这个转换过程。

```java
// 自动装箱
Integer autoBoxedInt = 10; // 编译器自动转换为 Integer.valueOf(10)
```

### 自动拆箱 (Unboxing)

与自动装箱相反，**自动拆箱（Unboxing）** 是将包装类对象自动转换回其对应的基本数据类型。

```java
// 手动拆箱
Integer wrapperInt = new Integer(20);
int primitiveInt = wrapperInt.intValue();

// 自动拆箱
Integer autoUnboxedInt = 20;
int primitiveResult = autoUnboxedInt; // 编译器自动转换为 autoUnboxedInt.intValue()
```

自动装箱和拆箱让代码变得更加简洁易读，尤其是在进行数学运算或与集合框架交互时。

```java
Integer a = 100;
Integer b = 200;
Integer sum = a + b; // a 和 b 自动拆箱进行加法运算，结果 sum 又被自动装箱

System.out.println(sum); // 输出: 300
```

### 包装类的常用方法

包装类除了提供装箱/拆箱的能力外，还包含了很多有用的静态方法。最常见的就是用于在字符串和数值类型之间进行转换。

- **`parseXXX(String s)`**: 将字符串解析为对应的基本数据类型。如果字符串格式不正确，会抛出 `NumberFormatException`。
- **`valueOf(...)`**: 将基本数据类型或字符串转换为包装类对象。

**示例：**

```java
// 使用 parseInt 将字符串转换为 int
String strNumber = "123";
int number = Integer.parseInt(strNumber);

// 使用 valueOf 将字符串转换为 Integer 对象
Integer wrapperNumber = Integer.valueOf("456");

// 使用 toString 将 Integer 转换为字符串
String convertedString = wrapperNumber.toString();
```

理解包装类和自动装箱/拆箱是掌握 Java 集合框架（如 `ArrayList`）和泛型编程的基础，因为这些高级特性通常要求使用对象而不是基本数据类型。

## 3.4.5 类 `Scanner`

在许多应用程序中，我们需要与用户进行交互，获取用户从键盘输入的数据。Java 的 `java.util.Scanner` 类为此提供了一个简单而强大的解决方案。

要使用 `Scanner` 类，你首先需要导入它：

```java
import java.util.Scanner;
```

然后，你需要创建一个 `Scanner` 对象，并将其“连接”到标准输入流 `System.in`，这代表了键盘输入。

```java
Scanner input = new Scanner(System.in);
```

### `Scanner` 类的常用方法

`Scanner` 提供了一系列 `nextXXX()` 方法来读取不同类型的数据。当调用这些方法时，程序会暂停执行，等待用户在控制台输入数据并按下回车键。

| 方法定义               | 功能                                   |
| ---------------------- | -------------------------------------- |
| `String next()`        | 读取下一个“单词”（以空白字符为分隔符） |
| `String nextLine()`    | 读取一整行文本（直到用户按下回车）     |
| `int nextInt()`        | 读取一个整数                           |
| `double nextDouble()`  | 读取一个双精度浮点数                   |
| `boolean hasNext()`    | 检查输入中是否还有下一个“单词”         |
| `boolean hasNextInt()` | 检查下一个输入是否可以被解析为整数     |

### 方法应用示例

#### 读取基本信息

下面是一个简单的例子，演示如何读取用户的姓名、年龄和薪水：

```java
import java.util.Scanner;

public class UserInputDemo {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("请输入您的姓名: ");
        String name = input.nextLine();

        System.out.print("请输入您的年龄: ");
        int age = input.nextInt();

        System.out.print("请输入您的期望薪水: ");
        double salary = input.nextDouble();

        System.out.println("\n--- 用户信息 ---");
        System.out.println("姓名: " + name);
        System.out.println("年龄: " + age);
        System.out.println("薪水: " + salary);

        // 使用完后最好关闭 Scanner
        input.close();
    }
}
```

#### `next()` 与 `nextLine()` 的区别

`next()` 和 `nextLine()` 都可以用来读取字符串，但它们之间有一个重要的区别：

- `next()`: 只读取到第一个空白字符（如空格、Tab、回车）之前的部分。
- `nextLine()`: 读取从当前位置到行尾的所有内容，包括空格。

**一个常见的陷阱**：在调用 `nextInt()`、`nextDouble()` 等方法后，如果紧接着调用 `nextLine()`，`nextLine()` 会读取到 `nextInt()` 留下的换行符（`\n`）并立即返回一个空字符串。

**解决方案**：在 `nextInt()` 之后，额外调用一次 `nextLine()` 来“消耗”掉那个换行符。

```java
Scanner scanner = new Scanner(System.in);

System.out.print("输入一个数字: ");
int num = scanner.nextInt();

// 消耗掉 nextInt() 留下的换行符
scanner.nextLine();

System.out.print("输入一句话: ");
String line = scanner.nextLine();

System.out.println("你输入的数字是: " + num);
System.out.println("你输入的话是: " + line);
```

## 3.4.6 集合入门：`ArrayList`

到目前为止，我们存储数据的方式主要是使用变量或数组。然而，数组有一个很大的局限性：**一旦创建，其长度就是固定的**。如果你想添加更多元素，或者数组中有大量空闲空间，处理起来会很麻烦。

为了解决这个问题，Java 提供了强大的**集合框架（Collection Framework）**。`java.util.ArrayList` 是其中最常用、最基础的一个类。你可以把它想象成一个“可变长度的数组”或“动态数组”。

### `ArrayList` 的特点

- **动态大小**：可以随时向 `ArrayList` 添加或删除元素，它会自动调整容量。
- **只接受对象**：`ArrayList` 不能存储基本数据类型（如 `int`, `double`）。它只能存储对象。但得益于自动装箱，我们可以直接向 `ArrayList<Integer>` 中添加 `int` 类型的值。
- **泛型支持**：在创建 `ArrayList` 时，我们通过泛型（`< >`）来指定它能存储哪种类型的对象，从而在编译时提供类型安全检查。

### 创建 `ArrayList`

要使用 `ArrayList`，你需要先导入它：

```java
import java.util.ArrayList;
```

创建一个用于存储字符串的 `ArrayList`：

```java
// 创建一个空的 ArrayList，专门用来存放 String 对象
ArrayList<String> names = new ArrayList<>();
```

创建一个用于存储整数的 `ArrayList`：

```java
// 注意：这里必须使用包装类 Integer，而不是基本数据类型 int
ArrayList<Integer> numbers = new ArrayList<>();
```

### `ArrayList` 的常用方法

`ArrayList` 提供了丰富的方法来操作其中的元素。

| 方法定义                         | 功能                                       |
| -------------------------------- | ------------------------------------------ |
| `boolean add(E element)`         | 在列表末尾添加一个元素                     |
| `void add(int index, E element)` | 在指定索引位置插入一个元素                 |
| `E get(int index)`               | 获取指定索引位置的元素                     |
| `E set(int index, E element)`    | 替换指定索引位置的元素，并返回旧元素       |
| `E remove(int index)`            | 删除指定索引位置的元素，并返回被删除的元素 |
| `boolean remove(Object o)`       | 删除列表中第一次出现的指定元素             |
| `int size()`                     | 返回列表中的元素数量                       |
| `boolean isEmpty()`              | 检查列表是否为空                           |
| `void clear()`                   | 删除列表中的所有元素                       |
| `boolean contains(Object o)`     | 检查列表是否包含指定元素                   |

### 方法应用示例

下面是一个管理待办事项列表的例子，演示了 `ArrayList` 的基本用法。

```java
import java.util.ArrayList;

public class TodoListDemo {
    public static void main(String[] args) {
        // 1. 创建一个存储待办事项（字符串）的 ArrayList
        ArrayList<String> todoList = new ArrayList<>();

        // 2. 添加任务
        System.out.println("添加任务...");
        todoList.add("学习 Java");
        todoList.add("编写代码");
        todoList.add("阅读书籍");
        System.out.println("当前任务列表: " + todoList);
        System.out.println("任务数量: " + todoList.size());

        // 3. 在指定位置添加任务
        todoList.add(1, "参加会议");
        System.out.println("\n在索引 1 添加 '参加会议' 后: " + todoList);

        // 4. 获取任务
        String firstTask = todoList.get(0);
        System.out.println("\n第一个任务是: " + firstTask);

        // 5. 修改任务
        todoList.set(2, "修复 Bug");
        System.out.println("\n将索引 2 的任务修改为 '修复 Bug' 后: " + todoList);

        // 6. 删除任务
        String removedTask = todoList.remove(3);
        System.out.println("\n删除了任务: '" + removedTask + "'");
        System.out.println("删除后的任务列表: " + todoList);

        // 7. 遍历任务列表
        System.out.println("\n--- 我今天的任务 ---");
        for (String task : todoList) {
            System.out.println("- " + task);
        }

        // 8. 清空列表
        todoList.clear();
        System.out.println("\n清空所有任务后，列表是否为空? " + todoList.isEmpty());
    }
}
```

`ArrayList` 是 Java 编程中不可或缺的工具，它极大地简化了对对象集合的操作，是学习更复杂集合（如 `LinkedList`, `HashMap`）的基石。

## 3.5 总结

本文作为 Java API 的入门介绍，探索了几个最核心、最常用的类，它们是日常 Java 开发的基石：

- **`Object`**: 所有类的超类，理解它的 `equals()` 和 `toString()` 方法是掌握面向对象思想的关键。
- **`String`**: 处理文本的基础，它的不可变性和丰富的操作方法需要熟练掌握。
- **`Math`**: 提供了无需创建对象即可使用的静态数学函数，简化了科学计算。
- **包装类**: 充当了基本数据类型与对象世界之间的桥梁，是泛型和集合框架的必备知识。
- **`Scanner`**: 实现了与用户的轻松交互，是编写控制台应用程序的入口。
- **`ArrayList`**: 作为动态数组，是学习强大集合框架的第一步，解决了固定长度数组的局限性。

Java API 是一个广阔而丰富的宝库。本文提到的只是冰山一角。继续深入学习，还会遇到用于日期和时间处理的 `java.time` 包，用于文件操作的 `java.io` 和 `java.nio` 包，以及用于多线程编程的 `java.util.concurrent` 包等等。
