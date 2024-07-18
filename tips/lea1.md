# 【小教程】UI适应屏幕大小

## 步骤1

### 在地图中创建一个名为box的ui框架，将所有ui元素设为其子元素，将box框架的大小调整为布满屏幕

## 步骤2

### 在clientindex.js中键入以下代码：

```
/*
 *@compose by h
 */
const box = ui.findChildByName('box');

async function scaleScreen(sH, sW) {
let widthScaleFactor = 1;
let heghtScaleFactor = 1
if (sW < 1360) {
widthScaleFactor = sW / 1480;
}
if (sH < 720) {
heghtScaleFactor = sH / 734;
}
if (!box.uiScale) box.uiScale = UiScale.create();
if(widthScaleFactor>=heghtScaleFactor){
box.uiScale.scale = heghtScaleFactor;
}else if(widthScaleFactor<heghtScaleFactor){
box.uiScale.scale = widthScaleFactor;
}
}
```



## 步骤3

### 接下来，在clientindex.js的事件中执行``scaleScreen(screenHeight, screenWidth)``指令即可使UI适应屏幕
