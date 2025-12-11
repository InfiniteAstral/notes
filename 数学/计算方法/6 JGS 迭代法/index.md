# JGS 迭代法

JGS 迭代法是 Jacobi 迭代法的一种改进方法，虽然 Jacobi 迭代法的迭代公式 $\boldsymbol{x^{(k+1)}}=B_J\boldsymbol{x^{(k)}}+\boldsymbol{g}_J$ 看起来可以一步就解出 $\boldsymbol{x^{(k+1)}}$，但是在实际计算中，还是需要一个一个地解方程。

JGS 迭代法的改进之处在于，它在每次迭代中每解一个方程，就代入更新后的变量来计算下一个方程，这样可以加快迭代的收敛速度。

## 迭代公式

::: info 这里省略方程式推导过程
方程式写起来比较麻烦，原理是先解出方程组中的一个方程，然后用已有的解来更新下一个方程中的系数，以此类推，这样就可以逐个解出所有的变量。

从推导后的方程式可以看出，JGS 迭代法的迭代矩阵本身没变，只是对角线以下的部分（$B_1$）与新的 $\boldsymbol{x^{(k+1)}}$ 相乘，对角线以上的部分（$B_2$）与旧的 $\boldsymbol{x^{(k)}}$ 相乘。因此就有下面的 [JGS 迭代公式](#jgs-迭代公式)。
:::

和 Jacobi 迭代法类似，由

- 系数矩阵 $A$：

  $$
  \begin{bmatrix}
   a_{11} & a_{12} & \cdots & a_{1n}\\
   a_{21} & a_{22} & \cdots & a_{2n}\\
   \vdots & \vdots &  & \vdots\\
   a_{n1} & a_{n2} & \cdots & a_{nn}
  \end{bmatrix}
  $$

  ::: details 由系数矩阵 $A$ 可以拆开得到...

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

- **迭代矩阵 $B_J=-D^{-1}(L+U)$**：

  $$
  \begin{bmatrix}
   0 & - \frac{a_{12}}{a_{11}} & \cdots & - \frac{a_{1n}}{a_{11}}\\
   - \frac{a_{21}}{a_{22}} & 0 & \cdots & - \frac{a_{2n}}{a_{22}}\\
   \vdots & \vdots &  & \vdots\\
   - \frac{a_{n1}}{a_{nn}} & - \frac{a_{n2}}{a_{nn}} & \cdots & 0
  \end{bmatrix}
  $$

  ::: tip 其中：

  $$
  B_1=-D^{-1}L=\begin{bmatrix}
   0 & & & \\
   - \frac{a_{21}}{a_{22}} & 0 & & \\
   \vdots & \vdots & \ddots & \\
   - \frac{a_{n1}}{a_{nn}} & - \frac{a_{n2}}{a_{nn}} & \cdots & 0
  \end{bmatrix}
  $$

  $$
  B_2=-D^{-1}U=\begin{bmatrix}
   0 & - \frac{a_{12}}{a_{11}} & \cdots & - \frac{a_{1n}}{a_{11}}\\
    & 0 & \cdots & - \frac{a_{2n}}{a_{22}}\\
    & & \ddots & \vdots\\
    & & & 0
  \end{bmatrix}
  $$

  :::

- **迭代常数向量 $\boldsymbol{g}_J=D^{-1}\boldsymbol{b}$**：
  $$
  \begin{bmatrix}
   \frac{b_1}{a_{11}}\\
   \frac{b_2}{a_{22}}\\
   \vdots\\
   \frac{b_n}{a_{nn}}
  \end{bmatrix}
  $$

<span id="jgs-迭代公式">因此，由上述推导过程，**JGS 迭代法的迭代公式是**：</span>

$$
\boldsymbol{x}^{(k+1)}=B_1\boldsymbol{x}^{(k+1)}+B_2\boldsymbol{x}^{(k)}+\boldsymbol{g}_J
$$

## 等效为简单迭代法

JGS 迭代法的迭代公式 $\boldsymbol{x}^{(k+1)}=B_1\boldsymbol{x}^{(k+1)}+B_2\boldsymbol{x}^{(k)}+\boldsymbol{g}_J$ 并不能直接等效为简单迭代法 $\boldsymbol{x}=B\boldsymbol{x}+\boldsymbol{g}$ 的形式，因为等式的左右两边都有 $\boldsymbol{x}^{(k+1)}$。

因此，代入 $B_1=-D^{-1}L$、$B_2=-D^{-1}U$ 并整理等式，将 $\boldsymbol{x}^{(k+1)}$ 移到左边，得到：

$$
\boldsymbol{x}^{(k+1)}=-(D+L)^{-1}U\boldsymbol{x}^{(k)}+(D+L)^{-1}\boldsymbol{b}
$$

即，

**迭代矩阵 $B_{JGS}$**：

$$B_{JGS}=-(D+L)^{-1}U$$

**迭代向量 $g_{JGS}$**：

$$\boldsymbol{g}_{JGS}=(D+L)^{-1}\boldsymbol{b}$$

则 **JGS 迭代法等效为简单迭代法的迭代公式** 为：

$$
\boldsymbol{x}^{(k+1)}=B_{JGS}\boldsymbol{x}^{(k)}+g_{JGS}
$$

## 收敛性判断

### 充分条件

满足以下条件之一，JGS 迭代法对任意初始向量一定收敛：

1. **原系数矩阵 $A$ 严格对角占优**。
2. **原系数矩阵 $A$ 对称正定**。
3. **迭代矩阵 $B_{JGS}$ 的任一种 [矩阵范数](../5%20Jacobi%20迭代法/index.html#矩阵范数) $\le 1$**。

### 充要条件

**迭代矩阵 $B_{JGS}$ 的谱半径 $<1$**。

### 与 Jacobi 迭代法收敛性的关系

除非**原系数矩阵 $A$ 严格对角占优**，否则 JGS 迭代法的收敛性与 Jacobi 迭代法**无必然联系**。
