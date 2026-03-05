# Taylor 级数展开法

若将 $y(x_{n+1})$ 在 $x_n$ 处泰勒展开，并将其中的 $(x_{n+1}-x_n)$ 用步长 $h$ 代替，有：

$$y(x_{n+1})=y(x_n)+\frac{h}{1!}y'(x_n)+\frac{h^2}{2!}y''(x_n)+\cdots+\frac{h^k}{k!}y^{(k)}(x_n)+O(h^{k+1})$$

常微分方程初值问题 $\left\{\begin{matrix} \frac{\mathrm{d}y}{\mathrm{d}x}=f(x,y)\\ y(x_o)=y_0 \end{matrix}\right.$ 已经给出一阶导数 $y'$，在此基础上求导可以得到更高阶导数。

知道了 $k$ 阶导数，就可以截取上式中的前 $k+1$ 项，忽略高阶无穷小，

代入上述公式，求出 $y(x_{n+1})$ 的近似值。
