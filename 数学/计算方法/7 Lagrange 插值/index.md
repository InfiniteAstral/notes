# Lagrange 插值

## 插值函数

**Lagrange 插值函数**：

$$L(x)=y_0l_0(x)+y_1l_1(x)+y_2l_2(x)+\cdots+y_il_i(x)+\cdots+y_nl_n(x)$$

**其插值基函数**：

$$l_i(x)=\prod_{j=0,j\neq i}^n\frac{x-x_j}{x_i-x_j}$$

::: info 例题及其解析

> [!INFO] 例
> 已知 $f(0)=0$，$f(1)=1$，$f(4)=2$，建立 Lagrange 二次插值多项式，求 $f(2)$ 的近似值。

Lagrange 二次插值多项式：

$$L_2(x)=f(0)l_0(x)+f(1)l_1(x)+f(4)l_2(x)$$

其中，

$$l_0(x)=\frac{x-x_1}{x_0-x_1}\cdot \frac{x-x_2}{x_0-x_2}$$

$$l_1(x)=\frac{x-x_0}{x_1-x_0}\cdot \frac{x-x_2}{x_1-x_2}$$

$$l_2(x)=\frac{x-x_0}{x_2-x_0}\cdot \frac{x-x_1}{x_2-x_1}$$

代入整理化简：

$$L_2(x)=-\frac{1}{6}x^2+\frac{7}{6}x$$

所以

$$f(2)\approx L_2(2)=1.6667$$
:::

::: danger 注意
给定 $n+1$ 个互异节点，其不超过 $n$ 次的插值多项式**存在且唯一**（无论哪种插值方法）。
:::

## 插值余项（误差）

$$R_n(x)=f(x)-L(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}\omega_{n+1}(x)$$

其中，$f(x)$ 为原函数，

$L(x)$ 为 $[a,b]$ 上 $f(x)$ 的 $n$ 次插值多项式函数，

$\xi$ 为 $[a,b]$ 上的某个数，

$\omega_{n+1}(x)=(x-x_0)(x-x_1)\cdots(x-x_n)$ 为 $n+1$ 次多项式。

## 性质

1. 若这 $n$ 个插值节点**符合一个不超过 $n$ 次的多项式**，则 Lagrange 插值多项式 $L(x)$ **就是这个多项式本身**。
2. Lagrange 基函数具有**单位分解特性**，即：
   对 $[x_0,x_n]$ 间任一点 $x$，有 $\sum_{i=1}^{n}l_i(x)=1$。
