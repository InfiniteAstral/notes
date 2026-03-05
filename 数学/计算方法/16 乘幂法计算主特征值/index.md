# 乘幂法计算主特征值

**任意**选定一个初始向量，然后**用它不断地右乘要求主特征值的矩阵**，

直到当前一步的向量与上一步的向量的**各分量比值趋于一个确定的数**，

这个数即为**矩阵的主特征值**，

此时的向量就是**对应的特征向量**。

::: info 例：已知矩阵 $A=\begin{bmatrix} 10 & 1 & -2\\ 1 & 3 & 1\\ 6 & 1 & -3\end{bmatrix}$，求它的主特征值。

选定初始向量 $u=\begin{bmatrix} 1\\ 1\\ 1\end{bmatrix}$，用它右乘矩阵 $A$：

$$
\overset{A}{\begin{bmatrix} 10 & 1 & -2\\ 1 & 3 & 1\\ 6 & 1 & -3\end{bmatrix}} \overset{u}{\begin{bmatrix} 1\\ 1\\ 1\end{bmatrix}}=\begin{bmatrix} 9\\ 5\\ 4\end{bmatrix}
$$

再用所得的向量右乘矩阵 $A$：

$$
A \begin{bmatrix} 9\\ 5\\ 4\end{bmatrix}=\begin{bmatrix} 87\\ 28\\ 47\end{bmatrix}
$$

重复该操作：

$$
A \begin{bmatrix} 87\\ 28\\ 47\end{bmatrix}=\begin{bmatrix} 804\\ 218\\ 209\end{bmatrix}
$$

$$
A \begin{bmatrix} 804\\ 218\\ 209\end{bmatrix}=\begin{bmatrix} 7440\\ 1867\\ 3815\end{bmatrix}
$$

$$
A \begin{bmatrix} 7440\\ 1867\\ 3815\end{bmatrix}=\begin{bmatrix} 68637\\ 16856\\ 35062\end{bmatrix}
$$

此时，由于 $\frac{68637}{7440}\approx \frac{16856}{1867}\approx \frac{35062}{3815}\approx 9$，则 $9$ **近似**为矩阵 $A$ 的**主特征值**，$\begin{bmatrix} 68637\\ 16856\\ 35062\end{bmatrix}$ 就是**对应的特征向量**。

> [!INFO] 实际要近似到什么程度，取决于精度要求。

:::
