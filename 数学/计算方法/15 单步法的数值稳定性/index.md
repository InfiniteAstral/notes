# 单步法的数值稳定性

称以下常微分方程初值问题：$\left\{\begin{matrix} y'=\lambda y\\ y(x_0)=y_0 \end{matrix}\right.$ 为模型方程，

其中 $\lambda$ 为复常数，且实部小于 $0$。

那么：

- [Euler 公式](../12%20Euler%20方法及其改进/index.md)满足 $|1+\lambda h|\le 1$ 时，方法稳定
- [梯形公式](../11%20数值积分/index.md/#常用的数值积分公式)对于任意步长 $h$ 都稳定
- [Euler-梯形预估矫正公式](../12%20Euler%20方法及其改进/index.md/#euler-梯形预估矫正方法)满足 $|1+\lambda h+\frac{1}{2}(\lambda h)^2|\le 1$ 时，方法稳定
