### 盒模型

width、height、padding、border、margin

+ 标准盒子模型中，width 和 height 指的是内容区域的宽度和高度。增加内边距、边框和外边距不会影响内容区域的尺寸，但是会增加元素框的总尺寸。

+ IE盒子模型中，width 和 height 指的是内容区域+border+padding的宽度和高度。

### css居中

+ 文字居中, 设置 line-height text-align

```css
.parent {
   height: 200px;
   line-height: 200px;
   text-align: center;
}
```

+ 绝对定位 + transform: 根据百分比

```css
.parent {
    position: relative;
    height: 200px;
}
.child {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
```

+ 绝对定位 + margin: auto

```css
.parent {
    position: relative;
    height: 200px;
}
.child {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
```
```css
.parent {
    display: flex;
}
.child {
    margin: auto;
}
```

+ display: flex
```css
.parent {
    display: flex;
    align-items: center;        /* 垂直居中 */
    justify-content: center;    /* 水平居中 */
}
```

### 让一个元素隐藏
```css
.hidden {
    width: 0;
    height: 0;
}
```
```css
.hidden {
    opacity: 0;
}
```
```css
.hidden {
    display: none;
}
```
```css
.hidden {
    visibility: hidden;
}
```
```css
.hidden {
    transform: translateX(10000000000px)
}
```
```css
.hidden {
    transform: translateY(10000000000px)
}
```