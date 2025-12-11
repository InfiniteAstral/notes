# 曲线最小二乘拟合

由于直接用例题解释实际解题方法更直观，所以就不再讲解具体的抽象的数学语言，直接来看下面的例题。

## 引例（解题方法）

::: info 例
给出点：

| $x$ |  $19$  |  $25$  |  $31$  |  $38$  |  $44$  |
| :-: | :----: | :----: | :----: | :----: | :----: |
| $y$ | $19.0$ | $32.3$ | $49.0$ | $73.3$ | $97.8$ |

欲用二次函数 $g(x)=a_0+a_1x+a_2x^2$ 拟合。
:::

这五个数据点都满足：

$$
\left\{\begin{matrix}
 a_0 & +19a_1 & +19^2a_2 & =19.0\\
 a_0 & +25a_1 & +25^2a_2 & =32.3\\
 a_0 & +31a_1 & +31^2a_2 & =49.0\\
 a_0 & +38a_1 & +38^2a_2 & =73.3\\
 a_0 & +44a_1 & +44^2a_2 & =97.8
\end{matrix}\right.
$$

写为 $A\boldsymbol{x}=\boldsymbol{b}$ 形式：

$$
\underset{A}{\begin{bmatrix}
 1 & 19 & 19^2\\
 1 & 25 & 25^2\\
 1 & 31 & 31^2\\
 1 & 38 & 38^2\\
 1 & 44 & 44^2
\end{bmatrix}}
\underset{\boldsymbol{x}}{\begin{bmatrix}
 a_1\\
 a_2\\
 a_3
\end{bmatrix}} =
\underset{\boldsymbol{b}}{\begin{bmatrix}
 19.0\\
 32.3\\
 49.0\\
 73.3\\
 97.8
\end{bmatrix}}
$$

称这个无解的方程组为**矛盾方程组**。

则上述矛盾方程组对应的**正规方程组**为：

$$
(A^TA)\boldsymbol{x}=A^T\boldsymbol{b}
$$

即

$$
\underset{A^TA}{\begin{bmatrix}
 5 & 157 & 5327\\
 157 & 5327 & 192331\\
 5327 & 192331 & 7277699
\end{bmatrix}}
\underset{\boldsymbol{x}}{\begin{bmatrix}
 a_1\\
 a_2\\
 a_3
\end{bmatrix}} =
\underset{\boldsymbol{A^Tb}}{\begin{bmatrix}
 271.4\\
 9776.1\\
 369321.5
\end{bmatrix}}
$$

解出这个正规方程组的解 $\boldsymbol{x}=\begin{bmatrix} a_1\\ a_2\\ a_3 \end{bmatrix}$，即为答案。

## 其他拟合

上面的拟合是**使用抛物线**的**二次拟合**。除此之外，还有：

- **线性拟合**：使用**一次函数**拟合
- **三次拟合**：使用**三次函数**拟合
- ……