# 数值积分

若给出若干个 $[a,b]$ 上的节点，则 $f(x)$ 在这段区间上的定积分近似为：

$$
\int_a^b f(x) \mathrm{d}x = \sum_{i=0}^{n} A_i f(x_i) + E[f]
$$

其中，$A_i$ 是求积系数（分割的小矩形的长度），$E[f]$ 是求积公式的截断误差。

## 常用的数值积分公式

- **中点求积公式**：
  $$
  M(f)=\int_a^b f(x) \mathrm{d}x \approx (b-a)f(\frac{a+b}{2})
  $$
- **梯形求积公式**：
  $$
  T(f)=\int_a^b f(x) \mathrm{d}x \approx \frac{b-a}{2}[f(a)+f(b)]
  $$
- **Simpson 求积公式**：
  $$
  S(f)=\int_a^b f(x) \mathrm{d}x \approx \frac{b-a}{6}[f(a)+4f(\frac{a+b}{2})+f(b)]
  $$
- **Cotes 求积公式**：

  $$
  C(f)=\int_a^b f(x) \mathrm{d}x \approx \frac{b-a}{90}[7f(x_1)+32f(x_2)+12f(x_3)+32f(x_4)+7f(x_5)]
  $$

  ::: tip Cotes 系数：
  |$n$ 次数| Cotes 系数|
  |:---:|:---|
  |0| $1$|
  |1| $\frac{1}{2}$ $\frac{1}{2}$|
  |2| $\frac{1}{6}$ $\frac{4}{6}$ $\frac{1}{6}$|
  |3| $\frac{1}{8}$ $\frac{3}{8}$ $\frac{3}{8}$ $\frac{1}{8}$|
  |4| $\frac{7}{90}$ $\frac{32}{90}$ $\frac{12}{90}$ $\frac{32}{90}$ $\frac{7}{90}$|
  |$\cdots$|$\cdots$|

  **性质**：

  1. 每一行的总和都为 $1$；
  2. 每一行都是对称的；
  3. $n \ge 8$ 时开始出现负数。
     :::

## 常用的数值积分公式的截断误差

::: info 复习：[插值余项](../7%20Lagrange%20插值/index.md#插值余项-误差)

$$
R_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}\omega_{n+1}(x)
$$

:::

- **中点求积公式**：
  $$
  E_M(f)=\frac{(b-a)^3}{24}f''(\xi)
  $$
- **梯形求积公式**：
  $$
  E_T(f)=-\frac{(b-a)^3}{12}f''(\xi)
  $$
- **Simpson 求积公式**：
  $$
  E_S(f)=-\frac{(b-a)^5}{2880}f^{(4)}(\xi)
  $$
- **Cotes 求积公式**：
  $$
  E_C(f)=-\frac{(b-a)^7}{1935360}f^{(6)}(\xi)
  $$

## 代数精确度

以上的求积公式，若对于任意的**不高于 $m$ 项的多项式**均能精确成立，而对于某个 $m+1$ 次多项式不能精确成立，则称其有 $m$ 次代数精确度。

::: tip 求积公式具有 $m$ 次代数精确度的充要条件
其对 $f(x)=1,x,x^2,\cdots,x^m$ 都精确成立，而对 $f(x)=x^{m+1}$ 不能精确成立。
:::

::: danger 注意
拥有奇数 $n+1$ 个节点的求积公式，其代数精确度也至少为 $n+1$。

具有 $n+1$ 个节点的求积公式，其代数精确度最高为 $2n+1$。
:::

## 复化求积法

- **复化中点求积公式**：
  $$
  M_n(f)=\int_a^b f(x) \mathrm{d}x \approx hf(x_{i+\frac{1}{2}})
  $$
  截断误差：
  $$
  E_{M_n}(f)=\frac{(b-a)h^2}{24}f''(\xi)
  $$
- **复化梯形求积公式**：
  $$
  T_n(f)=\int_a^b f(x) \mathrm{d}x \approx \frac{h}{2}[f(a)+2\sum_{i=1}^{n-1}f(x_i)+f(b)]
  $$
  截断误差：
  $$
  E_{T_n}(f)=-\frac{(b-a)h^2}{12}f''(\xi)
  $$
- **复化 Simpson 求积公式**：
  $$
  S_n(f)=\int_a^b f(x) \mathrm{d}x \approx \frac{h}{6}[f(a)+2\sum_{i=1}^{n-1}f(x_i)+4\sum_{i=1}^{n-1}f(x_{i+\frac{1}{2}})+f(b)]
  $$
  截断误差：
  $$
  E_{S_n}(f)=-\frac{(b-a)h^4}{2880}f^{(4)}(\xi)
  $$
