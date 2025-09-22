# 3.2 Java 类与对象

::: tip
本页除目录以外的内容由 Gemini 2.5 Pro 生成，由 [TouHikari](https://github.com/TouHikari/) 审阅并修改。
:::

## 3.2.1 类的定义

在面向对象编程中，**类（Class）** 是创建对象的蓝图或模板。它定义了一类对象的共同**属性（数据）和行为（方法）**。可以将类看作是一种自定义的数据类型，一旦定义了类，就可以用它来创建任意多个具有相同结构和行为的对象。

### 类声明：创建一个新的对象类型（引用类型）

在 Java 中，使用 `class` 关键字来声明一个类。类声明的基本语法如下：

```java
[修饰符] class 类名 {
    // 类体
}
```

- **修饰符（Modifiers）**：可以控制类的访问级别（如 `public`、`protected`、`private`）或其他特性（如 `abstract`、`final`）。如果省略修饰符，则**默认为包级私有（package-private）**，即只有在同一个包中的其他类才能访问。
- **`class` 关键字**：表明你正在定义一个类。
- **类名（Class Name）**：通常遵循大驼峰命名法（UpperCamelCase），例如 `MyClass`。

**示例：**

```java
public class Dog {
    // 类体
}
```

这个例子声明了一个名为 `Dog` 的公共类。`public` 意味着这个类可以被任何地方的其他类访问。

### 类体

类体位于花括号 `{}` 内部，包含了类的所有成员，主要分为两部分：**属性（Fields）** 和 **方法（Methods）**。

#### 数据类型

在定义属性和方法时，需要使用 Java 的数据类型。Java 的数据类型分为两大类：

1.  **基本数据类型（Primitive Types）**：这是 Java 语言内置的八种基本类型，它们直接存储数据值。

    - **整数类型**: `byte`, `short`, `int`, `long`
    - **浮点类型**: `float`, `double`
    - **字符类型**: `char`
    - **布尔类型**: `boolean`（值为 `true` 或 `false`）

2.  **引用数据类型（Reference Types）**：除了基本数据类型外，其他所有类型都是引用类型。引用类型不直接存储数据值，而是存储对象的内存地址。
    - **类（Class）**：例如我们定义的 `Dog` 类，或者 Java 标准库提供的 `String`, `System` 等。
    - **接口（Interface）**
    - **数组（Array）**

#### 类型转换

在编程中，有时需要在不同数据类型之间转换数据。

- **自动类型转换（隐式转换）**：当一个小范围的数据类型赋值给一个大范围的数据类型时，Java 会自动进行转换。
  ```java
  int myInt = 100;
  long myLong = myInt; // 自动将 int 转换为 long
  ```
- **强制类型转换（显式转换）**：当一个大范围的数据类型赋值给一个小范围的数据类型时，必须进行强制转换，这可能会导致精度丢失。
  ```java
  double myDouble = 9.78;
  int myInt = (int) myDouble; // 强制将 double 转换为 int，myInt 的值为 9
  ```

#### 属性的定义

**属性（Fields）**，也称为**成员变量（Member Variables）**，**用于存储对象的状态**。它们在类体中声明。

**语法：**

```java
[修饰符] 数据类型 属性名 [= 初始值];
```

**示例：**

```java
public class Dog {
    // 属性
    String name;
    int age;
    String breed;
    boolean isHappy;
}
```

在这个 `Dog` 类中，我们定义了四个属性：`name`（名字），`age`（年龄），`breed`（品种），和 `isHappy`（是否开心）。每个 `Dog` 对象都会拥有自己的一套这些属性。

#### 方法的定义

**方法（Methods）用于定义对象的行为**。方法是一段可执行的代码块，可以接收输入（参数）并可能返回一个结果。

**语法：**

```java
[修饰符] 返回值类型 方法名([参数列表]) {
    // 方法体
    [return 返回值;]
}
```

- **返回值类型（Return Type）**：方法执行完毕后返回的数据类型。如果方法不返回任何值，则使用 `void`。
- **方法名（Method Name）**：通常遵循小驼峰命名法（lowerCamelCase），例如 `myMethod`。
- **参数列表（Parameter List）**：方法可以接受的输入值。每个参数都包含数据类型和参数名。

**示例：**

```java
public class Dog {
    String name;
    int age;

    // 方法
    public void bark() {
        System.out.println("汪汪！");
    }

    public void sayHello() {
        System.out.println("你好，我叫 " + name);
    }

    public int getAgeInHumanYears() {
        return age * 7;
    }
}
```

- `bark()` 方法没有参数，也不返回值（`void`），它只是打印一条消息。
- `sayHello()` 方法利用了对象的 `name` 属性。
- `getAgeInHumanYears()` 方法计算并返回狗的等效人类年龄。

#### 构造方法的定义

**构造方法（Constructor）** 是一种特殊的方法，**用于创建和初始化对象**。它的名称必须与类名完全相同，并且没有返回值类型（连 `void` 也没有）。

**特点：**

- 如果你**不定义任何构造方法，Java 会为你提供一个默认的无参构造方法**。
- 一旦你定义了任何构造方法，Java 就不再提供默认构造方法。
- **构造方法可以重载**（后面会讲）。

**语法：**

```java
[修饰符] 类名([参数列表]) {
    // 初始化代码
}
```

**示例：**

```java
public class Dog {
    String name;
    int age;

    // 无参构造方法
    public Dog() {
        name = "无名氏";
        age = 1;
        System.out.println("一只新的小狗诞生了！");
    }

    // 带参数的构造方法
    public Dog(String dogName, int dogAge) {
        name = dogName;
        age = dogAge;
        System.out.println("一只名叫 " + name + " 的小狗诞生了！");
    }
}
```

这个 `Dog` 类有两个构造方法。一个不接受任何参数，用于创建默认的狗对象；另一个接受名字和年龄作为参数，用于创建具有特定初始状态的狗对象。

## 3.2.2 对象的相关操作

一旦定义了类，我们就可以使用它来创建和操作**对象（Objects）**。**对象是类的具体实例（Instance）**。

### 对象变量的声明

要使用对象，首先需要声明一个该类类型的变量。这个变量并不存储对象本身，而是存储对对象的引用（内存地址）。

**语法：**

```java
类名 变量名;
```

**示例：**

```java
Dog myDog;
```

这行代码声明了一个名为 `myDog` 的变量，它可以引用一个 `Dog` 类型的对象。此时，`myDog` 的值为 `null`，因为它还没有指向任何实际的对象。

### 对象的创建

使用 `new` 关键字和类的构造方法来创建一个新的对象。

**语法：**

```java
变量名 = new 类名([构造方法参数]);
```

通常，声明和创建会合并为一步：

```java
类名 变量名 = new 类名([构造方法参数]);
```

**示例：**

```java
// 使用无参构造方法创建对象
Dog myDog1 = new Dog(); // 输出: 一只新的小狗诞生了！

// 使用带参数的构造方法创建对象
Dog myDog2 = new Dog("旺财", 3); // 输出: 一只名叫 旺财 的小狗诞生了！
```

- `new Dog()` 会调用 `Dog` 类的无参构造方法，创建一个 `Dog` 对象，并将其内存地址赋给 `myDog1`。
- `new Dog("旺财", 3)` 会调用带参数的构造方法。

### 对象的使用

通过对象变量，我们可以访问对象的属性和调用其方法。使用点号 `.` 操作符来完成。

**语法：**

- 访问属性：`变量名.属性名`
- 调用方法：`变量名.方法名([参数])`

**示例：**

```java
Dog myDog = new Dog("豆豆", 2);

// 访问属性
System.out.println("小狗的名字是: " + myDog.name); // 输出: 小狗的名字是: 豆豆
myDog.age = 3; // 修改属性值
System.out.println("小狗的年龄是: " + myDog.age); // 输出: 小狗的年龄是: 3

// 调用方法
myDog.bark(); // 输出: 汪汪！
myDog.sayHello(); // 输出: 你好，我叫 豆豆
int humanYears = myDog.getAgeInHumanYears();
System.out.println("相当于人类年龄: " + humanYears); // 输出: 相当于人类年龄: 21
```

### 对象的清除

Java 具有自动**垃圾回收（Garbage Collection, GC）** 机制。这意味着你不需要手动销毁或释放对象所占用的内存。

当一个对象不再被任何变量引用时，它就变成了“垃圾”。Java 的垃圾回收器会在适当的时候自动检测并回收这些垃圾对象所占用的内存空间。

**如何让对象变为垃圾？**

将对象变量赋值为 `null` 即可断开该变量与对象之间的引用关系。

```java
Dog myDog = new Dog("小白", 1);
// ... 使用 myDog 对象 ...

myDog = null; // 断开引用，此时 "小白" 对象如果没有其他引用指向它，就可能被垃圾回收
```

你无法预测垃圾回收器何时会运行，也无法强制它运行。这是 Java 虚拟机（JVM）自动管理的。

## 3.2.3 方法的形式参数和实际参数的传递方式

在调用方法时，我们会将值传递给方法的参数。理解参数是如何传递的至关重要。

- **形式参数（Formal Parameters）**：在定义方法时，在方法名后的括号里声明的参数。它们是方法内部的局部变量。
- **实际参数（Actual Parameters）**：在调用方法时，传递给方法的具体值或变量。

Java 中的参数传递方式只有一种：**值传递（Pass by Value）**。

这意味着当调用方法时，实际参数的值会被复制一份，然后传递给形式参数。方法内部对形式参数的任何修改，都不会影响到方法外部的实际参数。

**1. 传递基本数据类型**

当传递基本数据类型时，实际参数的值被复制给形式参数。

```java
public class ParameterPassingExample {

    public static void main(String[] args) {
        int num = 10;
        System.out.println("调用方法前: " + num); // 输出: 10
        modifyValue(num);
        System.out.println("调用方法后: " + num); // 输出: 10
    }

    public static void modifyValue(int value) {
        value = 20;
        System.out.println("方法内部: " + value); // 输出: 20
    }
}
```

**分析：**

- `main` 方法中的 `num` 是实际参数。
- 调用 `modifyValue(num)` 时，`num` 的值 `10`被复制给了形式参数 `value`。
- 方法内部修改的是 `value` 的值，这只是一个副本，`main` 方法中的 `num` 丝毫未受影响。

**2. 传递引用数据类型**

当传递引用数据类型（如对象）时，情况稍微复杂一些，但本质仍然是值传递。此时，传递的是**引用的值**（即对象的内存地址）的副本。

```java
class Wallet {
    int money;
    Wallet(int money) { this.money = money; }
}

public class ParameterPassingExample {

    public static void main(String[] args) {
        Wallet myWallet = new Wallet(100);
        System.out.println("调用方法前，钱包里的钱: " + myWallet.money); // 输出: 100

        modifyWallet(myWallet);

        System.out.println("调用方法后，钱包里的钱: " + myWallet.money); // 输出: 50
    }

    public static void modifyWallet(Wallet wallet) {
        // wallet 是 myWallet 引用的副本，它们指向同一个 Wallet 对象
        wallet.money = 50; // 通过副本引用修改了对象内部的数据
    }
}
```

**分析：**

- `main` 方法中的 `myWallet` 是一个引用，它指向一个 `Wallet` 对象。
- 调用 `modifyWallet(myWallet)` 时，`myWallet` 这个引用的值（内存地址）被复制给了形式参数 `wallet`。
- 现在，`myWallet` 和 `wallet` 这两个引用都指向**同一个** `Wallet` 对象。
- 因此，在 `modifyWallet` 方法内部通过 `wallet` 修改 `money` 属性，实际上就是修改了 `main` 方法中 `myWallet` 指向的那个对象的 `money` 属性。

**一个重要的陷阱：**

如果在方法内部让形式参数引用一个新的对象，这不会影响原始的实际参数。

```java
public static void main(String[] args) {
    Wallet myWallet = new Wallet(100);
    System.out.println("调用方法前，钱包对象: " + myWallet);

    tryToChangeReference(myWallet);

    System.out.println("调用方法后，钱包对象: " + myWallet);
    System.out.println("调用方法后，钱包里的钱: " + myWallet.money); // 输出: 100
}

public static void tryToChangeReference(Wallet wallet) {
    // 让形式参数 wallet 指向一个全新的 Wallet 对象
    wallet = new Wallet(1000);
    System.out.println("方法内部，新的钱包对象: " + wallet);
}
```

**分析：**

- `tryToChangeReference` 方法内部，`wallet = new Wallet(1000);` 这行代码只是让形式参数 `wallet`（那个引用的副本）指向了一个全新的对象。
- `main` 方法中的 `myWallet` 仍然指向原来的那个 `Wallet(100)` 对象，没有受到任何影响。

## 3.2.4 方法重载

**方法重载（Method Overloading）** 是指在同一个类中，可以定义多个同名但参数列表不同的方法。这样可以让一个方法名具有多种功能，提高代码的可读性和灵活性。

**构成方法重载的条件：**

1.  **方法名必须相同**。
2.  **参数列表必须不同**。参数列表的不同体现在：
    - 参数的**个数**不同。
    - 参数的**类型**不同。
    - 参数的**顺序**不同（如果参数类型不同的话）。

**注意：** 方法的返回值类型、修饰符、异常类型都**不能**作为区分重载方法的依据。

**示例：**

```java
public class Calculator {

    // 两个整数相加
    public int add(int a, int b) {
        System.out.println("调用 int, int 版本");
        return a + b;
    }

    // 三个整数相加（参数个数不同)
    public int add(int a, int b, int c) {
        System.out.println("调用 int, int, int 版本");
        return a + b + c;
    }

    // 两个双精度浮点数相加（参数类型不同)
    public double add(double a, double b) {
        System.out.println("调用 double, double 版本");
        return a + b;
    }

    // 一个整数和一个双精度浮点数相加（参数顺序和类型)
    public double add(int a, double b) {
        System.out.println("调用 int, double 版本");
        return a + b;
    }

    // 一个双精度浮点数和一个整数相加（参数顺序和类型)
    public double add(double a, int b) {
        System.out.println("调用 double, int 版本");
        return a + b;
    }

    // 这是错误的，不能构成重载，因为只有返回值类型不同
    /*
    public double add(int a, int b) {
        return (double)(a + b);
    }
    */
}
```

**如何调用重载方法？**

Java 编译器会根据你调用方法时提供的**实际参数的类型、个数和顺序**来自动匹配最合适的一个重载方法。

```java
public static void main(String[] args) {
    Calculator calc = new Calculator();

    calc.add(5, 10);          // 调用 add(int, int)
    calc.add(5, 10, 15);      // 调用 add(int, int, int)
    calc.add(3.14, 2.71);     // 调用 add(double, double)
    calc.add(5, 3.14);        // 调用 add(int, double)
}
```

方法重载最常见的应用就是类的**构造方法重载**，它允许我们用多种方式来创建和初始化对象，就像前面 `Dog` 类的例子一样。

## 3.2.5 `static` 关键字的含义和 `main()` 方法

`static` 是 Java 中一个非常重要的关键字，它**用于修饰类的成员（属性和方法），使它们属于类本身，而不是类的某个特定对象**。

### 类变量和实例变量

- **实例变量（Instance Variables）**：没有 `static` 修饰的成员变量。它们属于类的每个独立对象。每创建一个对象，就会为实例变量分配一套新的内存空间。必须通过对象实例来访问。
- **类变量（Class Variables）**：用 `static` 修饰的成员变量。它们属于整个类，所有该类的对象共享同一个类变量。类变量在类加载时就被初始化，只有一份内存空间。可以通过类名直接访问，也可以通过对象实例访问（但不推荐）。

**示例：**

```java
public class Circle {
    // 实例变量，每个 Circle 对象都有自己的 radius
    double radius;

    // 类变量，所有 Circle 对象共享这一个 PI 值
    static final double PI = 3.14159;

    public Circle(double r) {
        this.radius = r;
    }

    // 实例方法，计算当前圆的面积
    public double getArea() {
        return PI * radius * radius; // 实例方法可以访问类变量
    }
}

public class TestCircle {
    public static void main(String[] args) {
        Circle c1 = new Circle(1.0);
        Circle c2 = new Circle(2.0);

        System.out.println("c1 的半径: " + c1.radius); // 1.0
        System.out.println("c2 的半径: " + c2.radius); // 2.0

        // 访问类变量
        System.out.println("PI 的值: " + Circle.PI); // 推荐方式
        System.out.println("通过 c1 访问 PI: " + c1.PI); // 不推荐
    }
}
```

### 实例方法和类方法

- **实例方法（Instance Methods）**：没有 `static` 修饰的方法。它们操作对象的状态，可以访问实例变量和类变量。必须通过对象实例来调用。
- **类方法（Class Methods）**：用 `static` 修饰的方法。它们不依赖于任何特定对象的状态。**类方法不能直接访问实例变量或实例方法**，因为它不知道要操作哪个对象。但它可以访问类变量和其他类方法。可以通过类名直接调用。

**示例：**

```java
public class Car {
    // 实例变量
    String brand;
    // 类变量
    static int numberOfCars = 0;

    public Car(String brand) {
        this.brand = brand;
        numberOfCars++; // 每创建一个对象，计数器加一
    }

    // 实例方法
    public void showBrand() {
        System.out.println("这是一辆 " + this.brand + " 牌的汽车。");
        // 实例方法可以访问类变量
        System.out.println("当前总共有 " + numberOfCars + " 辆车。");
    }

    // 类方法
    public static void showTotalCars() {
        // 类方法不能访问实例变量 brand
        // System.out.println(brand); // 这行会编译错误！

        System.out.println("汽车总数是：" + numberOfCars);
    }
}

public class TestCar {
    public static void main(String[] args) {
        Car.showTotalCars(); // 输出: 0

        Car car1 = new Car("奔驰");
        car1.showBrand();

        Car car2 = new Car("宝马");
        car2.showBrand();

        Car.showTotalCars(); // 输出: 2
    }
}
```

### `main()` 方法

`main` 方法是 Java 应用程序的入口点。当你运行一个 Java 程序时，JVM 会寻找并执行这个 `main` 方法。

它的完整定义是：

```java
public static void main(String[] args) {
    // 程序代码
}
```

- **`public`**：访问修饰符，表示这个方法可以被 JVM 从任何地方调用。
- **`static`**：因为 `main` 方法是程序的入口，此时还没有创建任何对象，所以 JVM 需要能够通过类名直接调用它，而不需要先创建类的实例。
- **`void`**：返回值类型，表示 `main` 方法执行完毕后不返回任何值给 JVM。
- **`main`**：方法名，这是 JVM 约定的固定名称。
- **`String[] args`**：参数列表。这是一个字符串数组，用于接收在命令行运行程序时传递给程序的参数。

## 3.2.6 `final` 关键字

`final` 关键字用于表示“最终的”、“不可改变的”。它可以用来修饰类、方法和变量。

### `final` 修饰成员变量

当 `final` 修饰一个变量时，这个变量就变成了**常量**，它的值在初始化之后就不能再被修改。

- **初始化时机**：`final` 变量必须在声明时或在构造方法中进行初始化。
- **命名规范**：常量名通常全部大写，并用下划线分隔单词，例如 `MAX_VALUE`。

```java
public class ConstantExample {
    // 声明时初始化
    public final int CONSTANT_A = 10;

    public final int CONSTANT_B;

    // 在构造方法中初始化
    public ConstantExample(int b) {
        this.CONSTANT_B = b;
    }

    public void changeConstant() {
        // 下面这行代码会导致编译错误
        // CONSTANT_A = 20;
    }
}
```

### `final` 修饰成员方法

当 `final` 修饰一个方法时，这个方法将**不能被子类重写（Override）**。

这通常用于确保父类中某个方法的行为不会被子类改变，以保证程序的稳定性和安全性。

```java
public class Parent {
    public final void showMessage() {
        System.out.println("This is a final method from Parent.");
    }
}

public class Child extends Parent {
    // 下面的方法会导致编译错误，因为 final 方法不能被重写
    /*
    @Override
    public void showMessage() {
        System.out.println("Child tries to override the final method.");
    }
    */
}
```

### `final` 修饰类

当 `final` 修饰一个类时，这个类将**不能被任何其他类继承**。

Java 中很多核心类库都是 `final` 的，例如 `String`, `Integer` 等，这样做是为了防止开发者继承这些类并改变其核心行为，从而保证了系统的安全和稳定。

```java
public final class FinalClass {
    // ...
}

// 下面的类定义会导致编译错误，因为 FinalClass 不能被继承
/*
public class SubClass extends FinalClass {
    // ...
}
*/
```

## 3.2.7 Java 的编译单元

在 Java 中，**编译单元（Compilation Unit）** 通常指一个 `.java` 源文件。Java 的源代码是以一个个 `.java` 文件来组织的。

**关于编译单元的重要规则：**

1.  **一个编译单元可以包含多个类**：你可以在一个 `.java` 文件中定义多个类。
2.  **最多一个 `public` 类**：在一个 `.java` 文件中，最多只能有一个类被声明为 `public`。
3.  **文件名与 `public` 类名匹配**：如果一个 `.java` 文件中包含一个 `public` 类，那么该文件的文件名必须与这个 `public` 类的类名完全相同（包括大小写）。
4.  **编译结果**：当使用 `javac` 编译器编译一个 `.java` 文件时，文件中的**每一个类**都会被编译成一个独立的 `.class` 文件。`.class` 文件包含了该类的字节码，可以被 JVM 执行。

**示例：**

假设我们有一个名为 `MyProgram.java` 的文件：

```java
// 文件名: MyProgram.java

// 这是 public 类，所以文件名必须是 MyProgram.java
public class MyProgram {
    public static void main(String[] args) {
        System.out.println("Hello from MyProgram!");
        Helper.sayHi();
    }
}

// 这是另一个非 public 类，定义在同一个文件中
class Helper {
    static void sayHi() {
        System.out.println("Hi from Helper!");
    }
}
```

当我们编译这个文件：

```shell
javac MyProgram.java
```

编译后会生成两个文件：

- `MyProgram.class`
- `Helper.class`

然后我们可以运行 `MyProgram`：

```shell
java MyProgram
```

**输出：**

```
Hello from MyProgram!
Hi from Helper!
```

这个机制使得 Java 的代码组织非常清晰，每个类都有其对应的字节码文件，便于 JVM 加载和执行。
