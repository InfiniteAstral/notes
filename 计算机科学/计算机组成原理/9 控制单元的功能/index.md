# 第 9 章 控制单元的功能

## 例题部分

### 例 9.1：设 CPU 内部采用非总线结构，如图所示。![未采用CPU内部总线方式的数据通路和控制信号](https://static.owo.cab/notes/image/cs/poco/chapter09/未采用CPU内部总线方式的数据通路和控制信号.webp)<br>1. 写出取指周期的全部微操作。<br>2. 写出取数指令 `LDA M`、存数指令 `STA M`、加法指令 `ADD M`（`M` 均为主存地址）在执行阶段所需的全部微操作。<br>3. 当上述指令均为间接寻址时，写出执行这些指令所需的全部微操作。<br>4. 写出无条件转移指令 `JMP Y` 和结果为零则转指令 `BAZ Y` 在执行阶段所需的全部微操作。

1. 取指周期的全部微操作如下：

   $$
   \begin{array}{ll}
   \text{PC} \to \text{MAR} & \text{现行指令地址} \to \text{MAR}\\
   1 \to \text{R} & \text{命令存储器读}\\
   \text{M(MAR)} \to \text{MDR} & \text{现行指令从存储器中读至 MDR}\\
   \text{MDR} \to \text{IR} & \text{现行指令} \to \text{IR}\\
   \text{OP(IR)} \to \text{CU} & \text{指令的操作码} \to \text{CU 译码}\\
   \text{(PC)} + 1 \to \text{PC} & \text{形成下一条指令的地址}\\
   \end{array}
   $$

2. ① 取数指令 `LDA M` 执行阶段所需的全部微操作如下：

   $$
   \begin{array}{ll}
   \text{Ad(IR)} \to \text{MAR} & \text{指令的地址码字段} \to \text{MAR}\\
   1 \to \text{R} & \text{命令存储器读}\\
   \text{M(MAR)} \to \text{MDR} & \text{操作数从存储器中读至 MDR}\\
   \text{MDR} \to \text{ACC} & \text{操作数} \to \text{ACC}
   \end{array}
   $$

   ② 存数指令 `STA M` 执行阶段所需的全部微操作如下：

   $$
   \begin{array}{ll}
   \text{Ad(IR)} \to \text{MAR} & \text{指令的地址码字段} \to \text{MAR}\\
   1 \to \text{W} & \text{命令存储器写}\\
   \text{ACC} \to \text{MDR} & \text{欲写入的数据} \to \text{MDR}\\
   \text{MDR} \to \text{M(MAR)} & \text{数据写至存储器中}
   \end{array}
   $$

   ③ 加法指令 `ADD M` 执行阶段所需的全部微操作如下：

   $$
   \begin{array}{ll}
   \text{Ad(IR)} \to \text{MAR} & \text{指令的地址码字段} \to \text{MAR}\\
   1 \to \text{R} & \text{命令存储器读}\\
   \text{M(MAR)} \to \text{MDR} & \text{操作数从存储器中读至 MDR}\\
   \text{(ACC)} + \text{(MDR)} \to \text{ACC} & \text{两数相加结果送 ACC}
   \end{array}
   $$

3. 当上述指令为间接寻址时，需增加间址周期的微操作。这 3 条指令在间址周期的微操作是相同的，即

   $$
   \begin{array}{ll}
   \text{Ad(IR)} \to \text{MAR} & \text{指令的地址码字段} \to \text{MAR}\\
   1 \to \text{R} & \text{命令存储器读}\\
   \text{M(MAR)} \to \text{MDR} & \text{有效地址从存储器中读至 MDR}
   \end{array}
   $$

   进入执行周期，3 条指令的第一个微操作均为 $\text{MDR} \to \text{MAR}$（有效地址送 $\text{MAR}$），其余微操作
   不变。

4. ① 无条件转移指令 `JMP Y` 执行阶段的微操作如下：

   $$
   \begin{array}{ll}
   \text{Ad(IR)} \to \text{PC} & \text{转移（目标）地址 Y} \to \text{PC}
   \end{array}
   $$

   ② 结果为零则转指令 `BAZ Y` 执行阶段的微操作如下：

   $$
   \begin{array}{ll}
   Z \cdot \text{Ad(IR)} \to \text{PC} & \text{当 } Z = 1 \text{ 时，转移（目标）地址 Y} \to \text{PC}\\
   & \text{（Z 为标记触发器，结果为 0 时 Z = 1）}
   \end{array}
   $$

## 练习题部分

### 9.2：控制单元的功能是什么？其输入受什么控制？

1. 控制单元的主要**功能**是**发出各种不同的控制信号**。
2. 其输入受**时钟信号**、**指令寄存器的操作码字段**、**标志**和**来自系统总线的控制信号**的控制。

### 9.3：什么是指令周期、机器周期和时钟周期？三者有何关系？

1. **指令周期**是 **CPU 取出并执行一条指令所需的全部时间**，即完成一条指令的时间。
2. **机器周期**是**所有指令执行过程中的一个基准时间**，通常以存取周期作为机器周期。
3. **时钟周期**是**机器主频的倒数**，也可称为**节拍**，它是控制计算机操作的**最小单位时间**。
4. **一个指令周期包含若干个机器周期**，**一个机器周期又包含若干个时钟周期**，每个指令周期内的机器周期数可以不等，每个机器周期内的时钟周期数也可以不等。

### 9.4：能不能说 CPU 的主频越快，计算机的运行速度就越快？为什么？

**不能说机器的主频越快，机器的速度就越快。**

因为机器的速度**不仅与主频有关**，**还与机器周期中所含的时钟周期以及指令周期中所含的机器周期数有关**。同样主频的机器，由于机器周期所含的时钟周期数不同，机器的速度也不同。机器周期中所含时钟周期数少的机器，速度更快。

此外，机器的速度还**与其他很多因素有关**，如**主存的速度**、**机器是否配有 Cache**、**总线的数据传输率**、**硬盘的速度**以及机器是否采用流水技术等等。机器速度还可以用 MIPS（每秒执行百万条指令数）和 CPI（执行一条指令所需的时钟周期数）来衡量。
