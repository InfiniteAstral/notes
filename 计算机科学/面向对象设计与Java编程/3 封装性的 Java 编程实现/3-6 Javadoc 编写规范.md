# 3.6 Javadoc 编写规范

## 3.6.1 Javadoc 编写规范

Javadoc 是 Java 中一种用于生成 API 文档的工具。通过在源代码中遵循特定的注释格式，开发者可以轻松地生成专业、规范的 API 文档。

### 基本格式

Javadoc 注释以 `/**` 开始，以 `*/` 结束。它可以应用于类、方法、字段等程序元素。

```java
/**
 * 这是一个 Javadoc 注释的例子。
 */
public class MyClass {
    // ...
}
```

### 注释分类

1.  **类/接口注释**：位于类或接口声明之前，用于描述该类或接口的总体功能。
2.  **方法注释**：位于方法声明之前，用于描述方法的功能、参数、返回值和可能抛出的异常。
3.  **字段注释**：位于字段声明之前，用于描述字段的用途。
4.  **包注释**：通过在包目录下创建 `package-info.java` 文件并添加 Javadoc 注释，可以为整个包提供说明。

### 编写风格

- **简洁明了**：用简洁的语言描述程序元素的功能。
- **使用 HTML 标签**：可以在 Javadoc 中使用 HTML 标签来格式化文本，例如使用 `<p>` 创建段落，使用 `<ul>` 和 `<li>` 创建列表。
- **首句概述**：注释的第一句话应该是一个简明扼要的概述，它将被提取到索引和摘要中。

## 3.6.2 Javadoc 标签编写规范

Javadoc 标签以 `@` 符号开头，用于提供更具体的元数据。

### 常用标签

| 标签          | 描述                                     | 示例                                            |
| :------------ | :--------------------------------------- | :---------------------------------------------- |
| `@author`     | 标识类的作者。                           | `@author John Doe`                              |
| `@version`    | 指定类的版本。                           | `@version 1.0`                                  |
| `@since`      | 说明从哪个版本开始引入。                 | `@since 1.2`                                    |
| `@param`      | 描述方法的参数。                         | `@param name 用户的名字`                        |
| `@return`     | 描述方法的返回值。                       | `@return 处理成功返回 true`                     |
| `@throws`     | 描述方法可能抛出的异常。                 | `@throws IOException 如果发生输入输出错误`      |
| `@deprecated` | 标记一个类或方法为已过时，不推荐使用。   | `@deprecated 请改用 newMethod()`                |
| `@see`        | 引用其他相关的类或方法。                 | `@see java.lang.String`                         |
| `{@link}`     | 在注释中创建一个指向其他程序元素的链接。 | `有关更多信息，请参阅 {@link MyClass#myMethod}` |
| `{@value}`    | 显示静态字段的常量值。                   | `默认值为 {@value #DEFAULT_VALUE}`              |

### 标签的使用

- **位置**：标签必须位于注释的末尾，在主要描述之后。
- **分组**：相同类型的标签应该放在一起。
- **顺序**：通常遵循 `@param`、`@return`、`@throws` 的顺序。

遵循这些规范，就可以编写出清晰、易于理解的 Javadoc 注释，从而生成高质量的 API 文档，方便自己和他人更好地理解和使用你的代码。

## 3.6.3 Javadoc 示例

下面是一个综合运用了 Javadoc 注释和标签的例子：

```java
/**
 * 计算器类，提供基本的数学运算功能。
 * <p>
 * 这个类可以执行加法和减法操作。
 *
 * @author Gemini
 * @version 1.0
 * @since 2024-07-25
 */
public class Calculator {

    /**
     * 默认的初始值。
     * 它的值是 {@value}。
     */
    public static final int DEFAULT_VALUE = 0;

    /**
     * 执行两个整数的加法运算。
     *
     * @param a 第一个加数
     * @param b 第二个加数
     * @return 两个整数的和
     */
    public int add(int a, int b) {
        return a + b;
    }

    /**
     * 计算并返回两个数的差。
     *
     * @param a 被减数
     * @param b 减数
     * @return a 和 b 的差
     * @see #add(int, int)
     * @deprecated 该方法已不推荐使用，请使用 {@link #add(int, int)} 并传入负数代替。
     */
    @Deprecated
    public int subtract(int a, int b) {
        return a - b;
    }
}
```

### 生成的文档效果

当使用 Javadoc 工具处理上述代码后，会生成一个 HTML 格式的 API 文档。在文档中：

- **类文档**会显示作者、版本和起始版本信息。
- **方法文档**会清晰地列出每个参数的说明、返回值的意义以及可能抛出的异常。
- `@deprecated` 标签会使 `subtract` 方法被标记为不推荐使用，并提供替代方案。
- `@see` 和 `{@link}` 标签会生成指向其他代码元素的超链接。
- `{@value}` 标签会直接显示 `DEFAULT_VALUE` 常量的值。

这个示例直观地展示了如何通过规范的 Javadoc 注释来极大地提升代码的可读性和可维护性。
