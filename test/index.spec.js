/*
 * @Description: 
 * @Autor: 24
 * @Date: 2024-04-29 11:20:48
 * @LastEditors: 24
 * @LastEditTime: 2024-04-29 15:26:56
 */

const simulate = require('miniprogram-simulate');
const path = require('path');
const Counter = simulate.load(path.resolve(__dirname, '../lib/index')) // 此处必须传入绝对路径
describe('Ellipsis component', () => {
  it('should render ellipsis when text exceeds max rows', () => {
    const width = 100;
    const component = simulate.render(Counter, {
      props: {
        content: 'This is a long text that should be ellipsised',
        row: "1",
        actionText: '展开',
        expandText: '收起',
      },
      style: `.custorm_ellip { width: ${width}px; }`
    }) // 渲染成自定义组件树实例
    // TODO
     const textElement = component.querySelector('.custorm_ellip_content')
     const renderedText = textElement.textContent;
  });
});

