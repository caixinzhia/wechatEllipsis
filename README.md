# 

# wechat_ellipsis

### 介绍

一个小程序文本可控展开收起的组件

### 引入

在`app.json`或`index.json`中引入组件

```json
"usingComponents": {
  "wechat-ellipsis": "wechat-ellipsis"
}
```

## 代码演示

### 一行省略

通过content注入展示的文本, 通过`row`属性控制展示多少行。

```html
<wechat-ellipsis content="这是一行示例文本展示" row="1" />
```
## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 内容 | _string_ | - |
| row | 展示多少行| _number_ | `1` |
| actionText | 展开标签内容 | _string_ | 展开 |
| actionColor | 展开标签字体样式 | _string_ |  cornflowerblue |
| expandText | 收缩标签内容 | _string_ | 收起 |
| expandColor | 收起标签字体样式 | _string_ |  cornflowerblue |
