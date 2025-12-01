# 矩阵的 LU 分解

## 什么是 LU 分解

我们知道，**含有多个未知数的唯一解线性方程组**（形如 $A\boldsymbol{x}=\boldsymbol{b}$）直接解起来**非常麻烦和困难**，为了**简化计算**，可以**将系数矩阵 $A$ 分解为下三角矩阵和上三角矩阵的乘积 $LU$**，即：

$$A=LU$$

这样，就可以先求解方程组

$$L\boldsymbol{y}=\boldsymbol{b}$$

得到中间解 $\boldsymbol{y}$，再代入

$$U\boldsymbol{x}=\boldsymbol{y}$$

求解 $\boldsymbol{x}$，即为原方程组的解。

由于 $L$ 和 $U$ 都是三角矩阵，所以计算 $\boldsymbol{y}$ 和 $\boldsymbol{x}$ 时可以逐个求出各分量（解出一个分量后就可以代入用于计算下一个分量，从而得到完整的解），这对于计算机来说是高效的计算方法。

::: details 一个实际例子
有唯一解的线性方程组：

$$
\left\{\begin{matrix}
 4x_1 & +2x_2 & +1x_3 & +5x_4 & =1\\
 8x_1 & +7x_2 & +5x_3 & +10x_4 & =1\\
 4x_1 & +8x_2 & +3x_3 & +6x_4 & =1\\
 6x_1 & +8x_2 & +4x_3 & +9x_4 & =1
\end{matrix}\right.
$$

表示为 $A\boldsymbol{x}=\boldsymbol{b}$ 的矩阵形式：

$$
A=\begin{bmatrix}
 4 & 2 & 1 & 5\\
 8 & 7 & 5 & 10\\
 4 & 8 & 3 & 6\\
 6 & 8 & 4 & 9
\end{bmatrix},
\boldsymbol{b}=\begin{bmatrix}
 1\\
 1\\
 1\\
 1
\end{bmatrix}
$$

变换为 $A=LU$ 形式：

$$
A=\begin{bmatrix}
 4 & 2 & 1 & 5\\
 8 & 7 & 5 & 10\\
 4 & 8 & 3 & 6\\
 6 & 8 & 4 & 9
\end{bmatrix}=
\underset{L}{\begin{bmatrix}
 1 &   &   & \\
 2 & 1 &   & \\
 1 & 2 & 1 & \\
 \frac{3}{2} & \frac{5}{3} & \frac{5}{4} & 1
\end{bmatrix}}
\underset{U}{\begin{bmatrix}
 4 & 2 & 1 & 5\\
   & 3 & 0 & 0\\
   &   & 2 & 1\\
   &   &   & \frac{1}{4}
\end{bmatrix}}
$$

再按照 $L\boldsymbol{y}=\boldsymbol{b}$，$U\boldsymbol{x}=\boldsymbol{y}$ 的顺序求解即可。

::: info 紧凑格式
上文中 $L$ 和 $U$ 的 [紧凑格式](#紧凑格式) 为：

$$
(L|U)=\begin{bmatrix}
 4 & 2 & 1 & 5\\
 2 & 3 & 0 & 0\\
 1 & 2 & 2 & 1\\
 \frac{3}{2} & \frac{5}{3} & \frac{5}{4} & \frac{1}{4}
\end{bmatrix}
$$

:::

$L$ 的对角元素**均为 $1$**，$U$ 的对角元素为**其实际值**。即：

$$
L=\begin{bmatrix}
 1 &   &   &  & \\
 L_{21} & 1 &  &  & \\
 L_{31} & L_{32} & 1 &  & \\
 \vdots & \vdots & \vdots & \ddots & \\
 L_{i1} & L_{i2} & L_{i3} & \cdots & 1
\end{bmatrix},
U=\begin{bmatrix}
 U_{11} & U_{12} & U_{13} & \cdots & U_{1j}\\
  & U_{22} & U_{23} & \cdots & U_{2j}\\
  &  & \ddots & \vdots & \vdots\\
  &  &   & U_{i-1,j-1} & U_{i-1,j}\\
  &  &   &   & U_{ij}
\end{bmatrix}
$$

## 紧凑格式 $(L|U)$

将 $L$ 和 $U$ 合并在同一个矩阵中的格式称为**紧凑格式**，记为 $(L|U)$。

1. **由 $L$ 和 $U$ 合并**：

   紧凑格式 $(L|U)$ 中，第 $i$ 行第 $j$ 列的元素 $L_{ij}$ 对应 $L$ 中第 $i$ 行第 $j$ 列的元素，$U_{ij}$ 对应 $U$ 中第 $i$ 行第 $j$ 列的元素。

   所以，

   $$
   L=\begin{bmatrix}
    1 &   &   &  & \\
    L_{21} & 1 &  &  & \\
    L_{31} & L_{32} & 1 &  & \\
    \vdots & \vdots & \ddots & \ddots & \\
    L_{i1} & L_{i2} & L_{i3} & \cdots & 1
   \end{bmatrix},
   U=\begin{bmatrix}
    U_{11} & U_{12} & U_{13} & \cdots & U_{1j}\\
     & U_{22} & U_{23} & \cdots & U_{2j}\\
     &  & \ddots & \vdots & \vdots\\
     &  &   & U_{i-1,j-1} & U_{i-1,j}\\
     &  &   &   & U_{ij}
   \end{bmatrix}
   $$

   合并为紧凑格式：

   $$
   (L|U)=\begin{bmatrix}
    U_{11} & U_{12} & U_{13} & \cdots & U_{1j}\\
    L_{21} & U_{22} & U_{23} & \cdots & U_{2j}\\
    L_{31} & L_{32} & \ddots & \vdots & \vdots\\
    \vdots & \vdots & \ddots & U_{i-1,j-1} & U_{i-1,j}\\
    L_{i1} & L_{i2} & L_{i3} & \cdots & U_{ij}
   \end{bmatrix}
   $$

2. **由系数矩阵 $A$ 直接计算**：

   矩阵的 LU 分解也可通过系数矩阵 $A$ 直接计算得到紧凑格式 $(L|U)$，也是考试中考察的重点，见下文 [由系数矩阵得出紧凑格式的操作方法](#由系数矩阵得出紧凑格式的操作方法)。

## 由系数矩阵得出紧凑格式的操作方法

::: tip 先行后列，先 $U$ 后 $L$
所求得的矩阵即为紧凑格式 $(L|U)$，要求得 $L$ 和 $U$，将 $(L|U)$ 拆开即可。
:::

| <p style="white-space:nowrap;">对应紧凑格式元素位置</p> | 计算的元素                | 计算方法                                                                   |
| :------------------------------------------------------ | :------------------------ | :------------------------------------------------------------------------- |
| 第 1 行                                                 | $(L\|U)_{1j}$             | $= A_{1j}$                                                                 |
| 第 1 列                                                 | $(L\|U)_{i1}\quad i\ge 2$ | $= A_{i1} {\div} (L\|U)_{11}$                                              |
| 第 2 行及以后                                           | $(L\|U)_{ij}\quad j\ge i$ | $= A_{ij} - \sum_{k=1}^{i-1} (L\|U)_{kj} (L\|U)_{ik}$                      |
| 第 2 列及以后                                           | $(L\|U)_{ij}\quad i\ge j$ | $= (A_{ij} - \sum_{k=1}^{j-1} (L\|U)_{ik} (L\|U)_{kj}) {\div} (L\|U)_{jj}$ |
