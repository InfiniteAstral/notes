# 8.4 Java 字节流与字符流的转换

我们已经知道，Java 的 I/O 分为字节流和字符流。字节流操作原始的字节数据，而字符流操作经过编码和解码的字符数据。但在实际开发中，我们经常会遇到需要将这两种流进行转换的场景。

例如：

- 从文件中读取文本数据。文件本身是以字节形式存储的，我们需要用字符流来读取，这就需要将字节流转换为字符流。
- 将文本数据写入网络连接。网络传输的是字节，但我们程序中处理的是字符串，需要将字符流转换为字节流。

为了解决这个问题，Java 提供了两个“**转换流**”（也称为“**桥接流**”）：`InputStreamReader` 和 `OutputStreamWriter`。它们是字节流和字符流之间的桥梁。

## 8.4.1 为什么需要转换流？

根本原因在于**数据源和我们想要处理的数据类型不匹配**。

- **字节流**是底层 I/O 的基础，无论是文件、网络套接字还是内存块，其原始形式都是字节序列。
- **字符流**是为处理文本数据而设计的，它封装了复杂的**字符编码**转换过程。

当我们从一个字节源（如 `FileInputStream`）读取文本时，我们需要一个机制来将这些原始字节**解码**成我们能理解的字符。同样，当我们要将程序中的字符串写入一个字节目标（如 `FileOutputStream`）时，需要一个机制将这些字符**编码**成字节。

转换流正是扮演了这个角色。它们在内部处理字节到字符（或字符到字节）的转换，同时允许我们指定使用哪种**字符集**（如 `UTF-8`, `GBK` 等），从而确保文本数据的正确性，避免乱码。

## 8.4.2 `InputStreamReader`：字节输入流 → 字符输入流

`InputStreamReader` 是一个 `Reader`，它接收一个 `InputStream`（字节输入流）作为其底层数据源。它会从这个字节流中读取字节，并使用指定的字符集将其解码为字符。

**核心作用**：将字节输入流转换为字符输入流。

**构造方法：**

| 方法定义                                                | 功能                                                                                       |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `InputStreamReader(InputStream in)`                     | 创建一个使用平台默认字符集的 `InputStreamReader`。**（不推荐，因为平台默认值可能不确定）** |
| `InputStreamReader(InputStream in, String charsetName)` | 创建一个使用指定字符集的 `InputStreamReader`。例如 `"UTF-8"`, `"GBK"`。**（推荐）**        |
| `InputStreamReader(InputStream in, Charset cs)`         | 创建一个使用给定 `Charset` 对象的 `InputStreamReader`。                                    |
| `InputStreamReader(InputStream in, CharsetDecoder dec)` | 创建一个使用给定字符集解码器的 `InputStreamReader`。                                       |

**示例：以 UTF-8 编码读取文件**

假设我们有一个以 `UTF-8` 编码保存的文本文件 `note.txt`。

```java
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.io.IOException;

public class InputStreamReaderExample {
    public static void main(String[] args) {
        String filePath = "note.txt";
        // 为了提高效率，通常会用 BufferedReader 包装 InputStreamReader
        try (FileInputStream fis = new FileInputStream(filePath);
             InputStreamReader isr = new InputStreamReader(fis, "UTF-8");
             BufferedReader br = new BufferedReader(isr)) {

            String line;
            System.out.println("以 UTF-8 编码读取文件内容：");
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

在这个例子中，数据流动的过程是：

1.  `FileInputStream` 从 `note.txt` 文件中读取原始的**字节**。
2.  `InputStreamReader` 从 `FileInputStream` 获取这些字节，并使用 `UTF-8` 字符集将它们**解码**成**字符**。
3.  `BufferedReader` 从 `InputStreamReader` 获取字符，并进行缓冲，以提供高效的 `readLine()` 方法。

## 8.4.3 `OutputStreamWriter`：字符输出流 → 字节输出流

`OutputStreamWriter` 是一个 `Writer`，它接收一个 `OutputStream`（字节输出流）作为其底层数据目标。它会将程序中的字符根据指定的字符集**编码**为字节，然后写入到底层的字节流中。

**核心作用**：将字符输出流转换为字节输出流。

**构造方法：**

| 方法定义                                                   | 功能                                                                                 |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `OutputStreamWriter(OutputStream out)`                     | 创建一个使用平台默认字符集的 `OutputStreamWriter`。**（不推荐）**                    |
| `OutputStreamWriter(OutputStream out, String charsetName)` | 创建一个使用指定字符集的 `OutputStreamWriter`。例如 `"UTF-8"`, `"GBK"`。**（推荐）** |
| `OutputStreamWriter(OutputStream out, Charset cs)`         | 创建一个使用给定 `Charset` 对象的 `OutputStreamWriter`。                             |
| `OutputStreamWriter(OutputStream out, CharsetEncoder enc)` | 创建一个使用给定字符集编码器的 `OutputStreamWriter`。                                |

**示例：以 GBK 编码写入文件**

```java
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.BufferedWriter;
import java.io.IOException;

public class OutputStreamWriterExample {
    public static void main(String[] args) {
        String filePath = "output_gbk.txt";
        // 同样，为了效率，用 BufferedWriter 包装 OutputStreamWriter
        try (FileOutputStream fos = new FileOutputStream(filePath);
             OutputStreamWriter osw = new OutputStreamWriter(fos, "GBK");
             BufferedWriter bw = new BufferedWriter(osw)) {

            bw.write("你好，世界！");
            bw.newLine();
            bw.write("这段文字将以 GBK 编码保存。");

            System.out.println("文件已成功以 GBK 编码写入。");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

在这个例子中，数据流动的过程是：

1.  程序通过 `BufferedWriter` 写入**字符**（字符串）。
2.  `OutputStreamWriter` 从 `BufferedWriter` 接收这些字符，并使用 `GBK` 字符集将它们**编码**成**字节**。
3.  `FileOutputStream` 接收这些字节，并将它们写入到 `output_gbk.txt` 文件中。

## 8.4.4 序列化与反序列化

除了字节流和字符流的转换，Java I/O 中还有一个重要的概念，即**对象序列化**。它允许我们将 Java 对象转换为字节序列，以便可以将其存储到文件、数据库或通过网络传输。之后，我们还可以将这个字节序列恢复为原始对象。

- **序列化 (Serialization)**：将对象转换为字节序列的过程。由 `ObjectOutputStream` 完成。
- **反序列化 (Deserialization)**：将字节序列恢复为对象的过程。由 `ObjectInputStream` 完成。

### `ObjectOutputStream`：对象序列化

`ObjectOutputStream` 是一个过滤流，它可以将 Java 对象写入到底层 `OutputStream`。

要使一个类的对象能够被序列化，该类必须实现 `java.io.Serializable` 接口。这个接口是一个**标记接口**，没有任何方法，只是用来标记该类的对象是可以被序列化的。

**示例：将对象写入文件**

```java
import java.io.*;

// 必须实现 Serializable 接口
class User implements Serializable {
    // 建议显式声明 serialVersionUID
    private static final long serialVersionUID = 1L;
    String name;
    transient String password; // transient 关键字标记的字段不会被序列化

    public User(String name, String password) {
        this.name = name;
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{name='" + name + "', password='" + password + "'}";
    }
}

public class ObjectSerializationExample {
    public static void main(String[] args) {
        User user = new User("Alice", "123456");

        try (FileOutputStream fos = new FileOutputStream("user.dat");
             ObjectOutputStream oos = new ObjectOutputStream(fos)) {

            oos.writeObject(user); // 将 user 对象写入文件
            System.out.println("对象序列化成功！");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### `ObjectInputStream`：对象反序列化

`ObjectInputStream` 可以从底层 `InputStream` 读取通过 `ObjectOutputStream` 写入的数据和对象。

**示例：从文件中读取对象**

```java
import java.io.*;

public class ObjectDeserializationExample {
    public static void main(String[] args) {
        try (FileInputStream fis = new FileInputStream("user.dat");
             ObjectInputStream ois = new ObjectInputStream(fis)) {

            User user = (User) ois.readObject(); // 从文件读取对象
            System.out.println("对象反序列化成功！");
            System.out.println(user); // 输出：User{name='Alice', password='null'}

        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

**重要注意事项：**

1.  **`Serializable` 接口**：要序列化的类必须实现 `Serializable` 接口。
2.  **`serialVersionUID`**：强烈建议为可序列化的类显式声明一个 `serialVersionUID`。它用于在反序列化时验证发送方和接收方的类版本是否兼容。如果不指定，JVM 会自动生成一个，但它可能因编译器实现不同而异，导致意外的 `InvalidClassException`。
3.  **`transient` 关键字**：如果某个字段不希望被序列化（例如密码、数据库连接等敏感或不可序列化的信息），可以使用 `transient` 关键字修饰它。反序列化后，该字段的值将为 `null`（对象类型）或默认值（基本类型）。
4.  **`ClassNotFoundException`**：`readObject()` 方法可能会抛出 `ClassNotFoundException`，如果找不到序列化对象的类定义。

## 8.4.5 总结

1.  **转换流是桥梁**：`InputStreamReader` 和 `OutputStreamWriter` 是连接字节流和字符流的关键。
2.  **编码是核心**：使用转换流时，**必须**考虑并显式指定正确的字符编码，这是避免乱码问题的根本。
3.  **装饰器模式**：转换流是装饰器模式的又一个绝佳示例。它们包装了底层的字节流，并为其增加了编码/解码的功能。为了获得更好的性能，我们通常会进一步用 `BufferedReader`/`BufferedWriter` 来包装转换流。
4.  **标准实践**：读取文本文件的标准方式是 `new BufferedReader(new InputStreamReader(new FileInputStream(...), "UTF-8"))`。
5.  **对象序列化**：`ObjectOutputStream` 和 `ObjectInputStream` 提供了将 Java 对象与字节流相互转换的能力，是实现对象持久化和网络传输的基础。实现 `Serializable` 接口是对象可序列化的前提。
