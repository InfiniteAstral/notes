# Jacobi 迭代法

## 范数

### 向量范数

- **$1$ 范数**：向量各分量的绝对值之和。
  $${\left \| x \right \|}_1=\sum_{i=1}^{n} \left | x_i \right |$$
- **$2$ 范数**：向量的模。
  $${\left \| x \right \|}_2=\sqrt{\sum_{i=1}^{n} x_i ^2}$$
- **$\infty$ 范数**：向量中绝对值最大的分量。
  $${\left \| x \right \|}_\infty=\max_{1\le i\le n} \left | x_i \right |$$

### 矩阵范数

- **列范数**：每一列各元素之和的最大一项。
  $${\left \| A \right \|}_1=\max_{1\le j\le n} \sum_{i=1}^{n} \left | a_{ij} \right |$$
- **行范数**：每一行各元素之和的最大一项。
  $${\left \| A \right \|}_\infty=\max_{1\le i\le n} \sum_{j=1}^{n} \left | a_{ij} \right |$$
- **谱范数**：矩阵 $A^TA$ 的最大特征值的平方根。
  $${\left \| A \right \|}_2=\sqrt{\max{\lambda(A^TA)}}$$
- **$F$ 范数**：矩阵 $A$ 所有元素的平方和。
  $${\left \| A \right \|}_F=\sqrt{\sum_{i=1}^{n} \sum_{j=1}^{n} a_{ij}^2}$$

## Jacobi 迭代法

::: info 原理推导过程
Jacobi 迭代法类似简单迭代法：想办法将 $A\boldsymbol{x}=\boldsymbol{b}$ 转换为 $\boldsymbol{x}=B\boldsymbol{x}+\boldsymbol{g}$ 的形式。

$$
\begin{matrix}
 \left\{\begin{matrix}
 a_{11}x_1 & +a_{12}x_2 & +a_{13}x_3 & +a_{14}x_4 & =b_1\\
 a_{21}x_1 & +a_{22}x_2 & +a_{23}x_3 & +a_{24}x_4 & =b_2\\
 \vdots\\
 a_{n1}x_1 & +a_{n2}x_2 & +a_{n3}x_3 & +a_{n4}x_4 & =b_n
\end{matrix}\right. & \Leftrightarrow & \left\{\begin{matrix}
 x_1 & = & - \frac{a_{12}x_2+a_{13}x_3+\cdots+a_{1n}x_n}{a_{11}} & +\frac{b_1}{a_{11}}\\
 x_2 & = & - \frac{a_{21}x_1+a_{23}x_3+\cdots+a_{2n}x_n}{a_{22}} & +\frac{b_2}{a_{22}}\\
 \vdots\\
 x_n & = & - \frac{a_{n1}x_1+a_{n2}x_2+\cdots+a_{n,n-1}x_{n-1}}{a_{nn}} & +\frac{b_n}{a_{nn}}\\
\end{matrix}\right.\\
  & & \\
 A\boldsymbol{x}=\boldsymbol{b} & \Leftrightarrow & \boldsymbol{x^{(k+1)}}=B_J\boldsymbol{x^{(k)}}+\boldsymbol{g}_J
\end{matrix}
$$

:::

所以，由

- 系数矩阵 $A$：
  $$
  \begin{bmatrix}
   a_{11} & a_{12} & \cdots & a_{1n}\\
   a_{21} & a_{22} & \cdots & a_{2n}\\
   \vdots & \vdots &  & \vdots\\
   a_{n1} & a_{n2} & \cdots & a_{nn}
  \end{bmatrix}
  $$
- 常数向量 $\boldsymbol{b}$：
  $$
  \begin{bmatrix}
   b_1\\
   b_2\\
   \vdots\\
   b_n
  \end{bmatrix}
  $$

**可以得出**：

- **迭代矩阵 $B_J$**：
  $$
  \begin{bmatrix}
   0 & - \frac{a_{12}}{a_{11}} & \cdots & - \frac{a_{1n}}{a_{11}}\\
   - \frac{a_{21}}{a_{22}} & 0 & \cdots & - \frac{a_{2n}}{a_{22}}\\
   \vdots & \vdots &  & \vdots\\
   - \frac{a_{n1}}{a_{nn}} & - \frac{a_{n2}}{a_{nn}} & \cdots & 0
  \end{bmatrix}
  $$
- **迭代常数向量 $\boldsymbol{g}_J$**：
  $$
  \begin{bmatrix}
   \frac{b_1}{a_{11}}\\
   \frac{b_2}{a_{22}}\\
   \vdots\\
   \frac{b_n}{a_{nn}}
  \end{bmatrix}
  $$

::: tip 或者，可以使用矩阵计算：
由系数矩阵 $A$

$$
\begin{bmatrix}
 a_{11} & a_{12} & \cdots & a_{1n}\\
 a_{21} & a_{22} & \cdots & a_{2n}\\
 \vdots & \vdots &  & \vdots\\
 a_{n1} & a_{n2} & \cdots & a_{nn}
\end{bmatrix}
$$

可以拆开得到：

- **下三角矩阵 $L$**：
  $$
  \begin{bmatrix}
   0 & & & \\
   a_{21} & 0 & & \\
   \vdots & \vdots & \ddots & \\
   a_{n1} & a_{n2} & \cdots & 0
  \end{bmatrix}
  $$
- **上三角矩阵 $U$**：
  $$
  \begin{bmatrix}
   0 & a_{12} & \cdots & a_{1n}\\
    & 0 & \cdots & a_{2n}\\
    &  & \ddots & \vdots\\
    &  &  & 0
  \end{bmatrix}
  $$
- **对角矩阵 $D$**：
  $$
  \begin{bmatrix}
    a_{11} &  &  & \\
    & a_{22} &  & \\
    &  & \ddots & \\
    &  &  & a_{nn}
  \end{bmatrix}
  $$

> [!WARNING] 注意
> 此处的 $L$ 和 $U$ 与 [矩阵的 LU 分解](../4%20矩阵的%20LU%20分解/index.html) 中的 $L$ 和 $U$ 不同！

于是，**迭代矩阵 $B_J$** 为：

$$B_J=-D^{-1}(L+U)$$

**常数向量 $\boldsymbol{g}_J$** 为：

$$\boldsymbol{g}_J=D^{-1}\boldsymbol{b}$$

:::

## 收敛性判断

### 充分条件

满足以下条件之一，Jacobi 迭代法对任意初始向量一定收敛：

1. **原系数矩阵 $A$ 严格对角占优**（对角元绝对值 $>$ 本行/列其他所有元素的绝对值之和）。
2. **迭代矩阵 $B_J$ 的任一种 [矩阵范数](#矩阵范数) $<1$**。

### 充要条件

**迭代矩阵 $B_J$ 的谱半径 $<1$**。
