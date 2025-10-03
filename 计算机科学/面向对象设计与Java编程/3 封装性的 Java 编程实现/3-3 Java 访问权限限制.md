# 3.3 Java 访问权限限制

## 3.3.1 Java 包

**Java 包（Package）是一种组织和管理类的机制，它提供了一个命名空间来避免类名冲突，同时也是访问权限控制的重要基础**。包的概念类似于文件系统中的文件夹，用于将相关的类和接口组织在一起。

### 包的作用

1. **避免命名冲突**：不同包中可以有同名的类
2. **提供访问权限控制**：包是访问权限控制的基本单位
3. **便于代码组织和管理**：将功能相关的类组织在一起
4. **便于代码重用**：通过包可以方便地引用其他包中的类

### 包的命名规范

- 包名通常使用小写字母
- 多个单词之间用点（.）分隔
- 通常使用公司域名的反向形式作为包名前缀，如：`com.company.project`
- 避免使用 Java 关键字作为包名

### 引入和使用包中的类

在 Java 中，当我们需要使用其他包中的类时，有两种主要的方式：使用完全限定名或通过 `import` 语句导入。这两种方式各有优缺点，适用于不同的场景。

#### 在应用程序中使用类的全名，即包名 + 类名

当我们需要使用其他包中的类时，最直接的方法是使用类的完全限定名（全名），即 `包名.类名` 的形式。

```java
// 使用 java.util 包中的 ArrayList 类
java.util.ArrayList<String> list = new java.util.ArrayList<>();

// 使用 java.text 包中的 SimpleDateFormat 类
java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd");
```

这种方式的优点是明确指定了类的来源，但缺点是代码冗长，不够简洁。

#### 通过应用关键字 `import` 导入响应的类/包，在应用程序中可以仅使用类名

为了简化代码，Java 提供了 `import` 语句来导入需要使用的类或包。

**导入单个类：**

```java
import java.util.ArrayList;
import java.text.SimpleDateFormat;

public class Example {
    public static void main(String[] args) {
        // 导入后可以直接使用类名
        ArrayList<String> list = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    }
}
```

**导入整个包：**

```java
import java.util.*;  // 导入 java.util 包中的所有类

public class Example {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        HashMap<String, Integer> map = new HashMap<>();
        Date date = new Date();
    }
}
```

**注意事项：**

- `import` 语句必须放在 `package` 语句之后，类定义之前
- 使用 `*` 导入整个包时，只导入该包中的类，不包括子包中的类
- 如果两个包中有同名的类，需要使用完全限定名来区分

### 自定义包

自定义包是 Java 编程中的重要概念，它允许开发者创建自己的包来组织和管理代码。通过创建自定义包，我们可以更好地组织项目结构，避免类名冲突，并提高代码的可维护性和重用性。

#### 创建自定义包

创建自定义包需要遵循以下步骤：

1. **使用 `package` 语句声明包名**

在 Java 源文件的第一行（注释除外）使用 `package` 语句声明该类所属的包：

```java
package com.example.myproject;

public class MyClass {
    // 类的内容
}
```

2. **创建对应的目录结构**

包名对应着文件系统中的目录结构。例如，包 `com.example.myproject` 对应的目录结构为：

```
src/
└── com/
    └── example/
        └── myproject/
            └── MyClass.java
```

#### 自定义包的使用示例

**创建一个工具包：**

文件：`src/com/example/utils/MathUtils.java`

```java
package com.example.utils;

public class MathUtils {
    public static int add(int a, int b) {
        return a + b;
    }

    public static int multiply(int a, int b) {
        return a * b;
    }
}
```

文件：`src/com/example/utils/StringUtils.java`

```java
package com.example.utils;

public class StringUtils {
    public static boolean isEmpty(String str) {
        return str == null || str.length() == 0;
    }

    public static String reverse(String str) {
        if (isEmpty(str)) return str;
        return new StringBuilder(str).reverse().toString();
    }
}
```

**在其他包中使用自定义包：**

文件：`src/com/example/main/Application.java`

```java
package com.example.main;

import com.example.utils.MathUtils;
import com.example.utils.StringUtils;

public class Application {
    public static void main(String[] args) {
        // 使用 MathUtils
        int sum = MathUtils.add(10, 20);
        int product = MathUtils.multiply(5, 6);

        // 使用 StringUtils
        String text = "Hello World";
        boolean empty = StringUtils.isEmpty(text);
        String reversed = StringUtils.reverse(text);

        System.out.println("Sum: " + sum);
        System.out.println("Product: " + product);
        System.out.println("Is empty: " + empty);
        System.out.println("Reversed: " + reversed);
    }
}
```

#### 编译和运行带包的 Java 程序

**编译：**

```bash
# 在 src 目录下编译
javac com/example/utils/*.java
javac com/example/main/Application.java

# 或者使用 -d 参数指定输出目录
javac -d . com/example/utils/*.java com/example/main/Application.java
```

**运行：**

```bash
# 使用完全限定的类名运行
java com.example.main.Application
```

## 3.3.2 Java 类的访问权限

**在 Java 中，类的访问权限决定了哪些其他类可以访问和使用该类**。Java 为类提供了两种访问权限：

### public 类

**使用 `public` 关键字修饰的类可以被任何其他类访问，无论这些类是否在同一个包中。**

**特点：**

- 可以被任何包中的任何类访问
- 一个 Java 源文件中只能有一个 `public` 类
- `public` 类的类名必须与文件名完全一致

**示例：**

文件：`com/example/model/Student.java`

```java
package com.example.model;

public class Student {
    private String name;
    private int age;

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
```

这个 `Student` 类可以被任何包中的类使用：

文件：`com/example/test/TestStudent.java`

```java
package com.example.test;

import com.example.model.Student;  // 可以导入并使用

public class TestStudent {
    public static void main(String[] args) {
        Student student = new Student("张三", 20);  // 可以创建实例
        System.out.println(student.getName());
    }
}
```

### 默认访问权限（包访问权限）

**没有使用任何访问修饰符的类具有默认访问权限，也称为包访问权限。这种类只能被同一个包中的其他类访问。**

**特点：**

- 只能被同一个包中的类访问
- 不能被其他包中的类访问，即使使用 `import` 语句也无法访问
- 这是 Java 类的默认访问级别

**示例：**

文件：`com/example/util/Helper.java`

```java
package com.example.util;

// 没有 public 修饰符，具有默认访问权限
class Helper {
    public void doSomething() {
        System.out.println("Helper is working...");
    }
}
```

文件：`com/example/util/UtilManager.java`

```java
package com.example.util;

public class UtilManager {
    public void useHelper() {
        Helper helper = new Helper();  // 同一个包，可以访问
        helper.doSomething();
    }
}
```

文件：`com/example/main/Application.java`

```java
package com.example.main;

// [!code error:1]
import com.example.util.Helper;  // 编译错误！不能导入默认访问权限的类

public class Application {
    public static void main(String[] args) {
        // [!code error:1]
        // Helper helper = new Helper();  // 编译错误！不能访问
    }
}
```

### 类访问权限的使用原则

1. **对外提供服务的类使用 `public`**：如果一个类需要被其他包中的类使用，应该声明为`public`
2. **内部辅助类使用默认访问权限**：如果一个类只在当前包内使用，可以使用默认访问权限
3. **一个源文件只能有一个 `public` 类**：这个 `public` 类的名称必须与文件名相同
4. **合理组织包结构**：将相关的类放在同一个包中，便于使用默认访问权限进行封装

### 类访问权限与文件组织

**正确的文件组织：**

```java
// 文件：Student.java
public class Student {  // public类，文件名必须是 Student.java
    // ...
}

class StudentHelper {   // 默认访问权限的辅助类，可以在同一文件中
    // ...
}
```

**错误的文件组织：**

```java
// 文件：MyFile.java
// [!code error:3]
public class Student {  // 错误！public 类名与文件名不一致
    // ...
}

// [!code error:3]
public class Teacher {  // 错误！一个文件中不能有多个 public 类
    // ...
}
```

## 3.3.3 Java 类成员的访问权限

Java 为类的成员（属性、方法、构造器、内部类等）提供了四种访问权限修饰符，**用于控制这些成员的可见性和访问范围**。

### 私有访问控制符 `private`

`private` 是最严格的访问控制符，被 `private` 修饰的成员只能在声明它的类内部访问。

**特点：**

- 只能在当前类内部访问
- 不能被子类继承
- 不能被同一包中的其他类访问
- 是实现封装的重要手段

**使用场景：**

- 类的内部实现细节
- 不希望外部直接访问的属性
- 辅助方法（helper methods）

**示例：**

```java
public class BankAccount {
    private String accountNumber;   // 私有属性
    private double balance;         // 私有属性

    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    // 私有方法，只能在类内部使用
    private boolean isValidAmount(double amount) {
        return amount > 0;
    }

    // 公共方法，提供对私有属性的访问
    public void deposit(double amount) {
        if (isValidAmount(amount)) {  // 调用私有方法
            balance += amount;
        }
    }

    public double getBalance() {
        return balance;  // 访问私有属性
    }
}

class TestAccount {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("123456", 1000.0);

        // [!code error:2]
        // account.balance = 2000;  // 编译错误！不能直接访问私有属性
        // account.isValidAmount(100);  // 编译错误！不能访问私有方法

        account.deposit(500);  // 正确，通过公共方法访问
        System.out.println(account.getBalance());  // 正确
    }
}
```

### 缺省访问控制符（默认访问权限）

没有使用任何访问修饰符的成员具有默认访问权限，也称为包访问权限。

**特点：**

- 可以被同一个包中的所有类访问
- 不能被不同包中的类访问（即使是子类）
- 这是 Java 成员的默认访问级别

**使用场景：**

- 包内类之间需要共享的成员
- 不需要对外公开，但包内需要访问的成员

**示例：**

```java
// 文件：com/example/model/Person.java
package com.example.model;

public class Person {
    String name;       // 默认访问权限
    int age;           // 默认访问权限

    void displayInfo() {  // 默认访问权限
        System.out.println("Name: " + name + ", Age: " + age);
    }
}

// 文件：com/example/model/PersonManager.java
package com.example.model;

public class PersonManager {
    public void managePerson() {
        Person person = new Person();
        person.name = "李四";     // 同一包，可以访问
        person.age = 25;          // 同一包，可以访问
        person.displayInfo();     // 同一包，可以访问
    }
}

// 文件：com/example/test/TestPerson.java
package com.example.test;

import com.example.model.Person;

public class TestPerson {
    public static void main(String[] args) {
        Person person = new Person();
        // [!code error:2]
        // person.name = "王五";    // 编译错误！不同包，不能访问
        // person.displayInfo();    // 编译错误！不同包，不能访问
    }
}
```

### 保护访问控制符 `protected`

`protected` 修饰符提供了比默认访问权限更宽松的访问控制。

**特点：**

- 可以被同一个包中的所有类访问
- 可以被不同包中的子类访问
- 不能被不同包中的非子类访问

**使用场景：**

- 希望子类能够访问和重写的方法
- 子类需要访问的父类属性
- 继承体系中需要共享的成员

**示例：**

```java
// 文件：com/example/base/Animal.java
package com.example.base;

public class Animal {
    protected String species;     // 受保护的属性
    protected int age;

    protected void makeSound() {  // 受保护的方法
        System.out.println("Animal makes a sound");
    }

    protected void sleep() {
        System.out.println("Animal is sleeping");
    }
}

// 文件：com/example/animals/Dog.java
package com.example.animals;

import com.example.base.Animal;

public class Dog extends Animal {
    public Dog(String species, int age) {
        this.species = species;  // 子类可以访问父类的protected成员
        this.age = age;
    }

    @Override
    protected void makeSound() {  // 子类可以重写 protected 方法
        System.out.println("Dog barks: Woof!");
    }

    public void showInfo() {
        System.out.println("Species: " + species + ", Age: " + age);
        makeSound();  // 子类可以调用父类的 protected 方法
        sleep();
    }
}

// 文件：com/example/animals/AnimalCare.java
package com.example.animals;

import com.example.base.Animal;

public class AnimalCare {
    public void careForAnimal(Animal animal) {
        // [!code error:2]
        // animal.species = "Unknown";  // 编译错误！不是子类关系，不能访问 protected 成员
        // animal.makeSound();          // 编译错误！
    }

    public void careForDog(Dog dog) {
        // 通过 Dog 类的公共方法间接访问
        dog.showInfo();
    }
}
```

### 公共的访问控制符 `public`

`public` 是最宽松的访问控制符，被 `public` 修饰的成员可以被任何类访问。

**特点：**

- 可以被任何包中的任何类访问
- 没有访问限制
- 是对外提供服务的主要方式

**使用场景：**

- 类的对外接口（API）
- 需要被外部类访问的方法和属性
- 构造器（如果需要外部创建对象）

**示例：**

```java
// 文件：com/example/service/Calculator.java
package com.example.service;

public class Calculator {
    public static final double PI = 3.14159;  // 公共常量

    public double add(double a, double b) {    // 公共方法
        return a + b;
    }

    public double subtract(double a, double b) {
        return a - b;
    }

    public double multiply(double a, double b) {
        return a * b;
    }

    public double divide(double a, double b) {
        if (b == 0) {
            throw new IllegalArgumentException("Division by zero");
        }
        return a / b;
    }
}

// 文件：com/example/main/Application.java
package com.example.main;

import com.example.service.Calculator;

public class Application {
    public static void main(String[] args) {
        Calculator calc = new Calculator();

        // 可以访问所有 public 成员
        double result1 = calc.add(10, 5);
        double result2 = calc.multiply(3, Calculator.PI);

        System.out.println("Addition result: " + result1);
        System.out.println("Multiplication result: " + result2);
    }
}
```

### 访问权限的继承规则

在继承关系中，访问权限有特殊的规则：

1. **子类不能降低父类方法的访问权限**
2. **子类可以提高父类方法的访问权限**

**示例：**

```java
class Parent {
    protected void method1() { }
    void method2() { }  // 默认访问权限
}

class Child extends Parent {
    // 正确：提高访问权限
    public void method1() { }

    // 正确：保持相同访问权限
    void method2() { }

    // 错误：不能降低访问权限
    // [!code error:1]
    // private void method1() { }  // 编译错误！
}
```

**Java 中类成员访问权限的作用范围：**

|   修饰符    | 同一个类 | 同一个包 | 不同包的子类 | 不同包非子类 |
| :---------: | :------: | :------: | :----------: | :----------: |
|  `private`  |   可以   |          |              |              |
|  `default`  |   可以   |   可以   |              |              |
| `protected` |   可以   |   可以   |     可以     |              |
|  `public`   |   可以   |   可以   |     可以     |     可以     |

**类、属性和方法的访问控制权限：**

<table><thead>
  <tr>
    <th rowspan="2" style="text-align:center;">属性与方法的访问权限</th>
    <th colspan="2" style="text-align:center;">类的访问权限</th>
  </tr>
  <tr>
    <th style="text-align:center;"><code>public</code></th>
    <th style="text-align:center;">缺省</th>
  </tr></thead>
<tbody>
  <tr>
    <td style="text-align:center;"><code>public</code></td>
    <td>所有类</td>
    <td>与当前类在同一个包中的所有类（也包括当前类）</td>
  </tr>
  <tr>
    <td style="text-align:center;"><code>protected</code></td>
    <td>与当前类在同一个包中的所有类（也包括当前类）；当前类的所有子类</td>
    <td>与当前类在同一个包中的所有类（也包括当前类）</td>
  </tr>
  <tr>
    <td style="text-align:center;">缺省</td>
    <td>与当前类在同一个包中的所有类（也包括当前类）</td>
    <td>与当前类在同一个包中的所有类（也包括当前类）</td>
  </tr>
  <tr>
    <td style="text-align:center;"><code>private</code></td>
    <td>当前类</td>
    <td>当前类</td>
  </tr>
</tbody>
</table>
