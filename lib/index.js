/*
 * @Description: 
 * @Autor: 24
 * @Date: 2024-04-29 10:18:48
 * @LastEditors: 24
 * @LastEditTime: 2024-04-29 15:25:48
 */
// pages/button/ellipsis/index.js
let version;
if (wx.getAppBaseInfo) {
  version = wx.getAppBaseInfo().SDKVersion
} else {
  version = wx.getSystemInfoSync().SDKVersion
}

function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: String,
      value: ''
    },
    row: {
      type: Number,
      value: 1
    },
    actionText: {
      type: String,
      value: ''
    },
    expandText: {
      type: String,
      value: ''
    }
  },

  attached: function () {
    this.init()
  },

  /**
   * 组件的初始数据
   */
  data: {
    renderText: '',
    isExpand: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init() {
      var query = wx.createSelectorQuery().in(this);

      query.select('.custorm_ellip').fields({
        computedStyle: ['line-height', 'font-size', 'height', 'width', 'font-weight', 'font-family', 'padding-left', 'padding-right'],
        dataset: true,
        size: true,
        rect: true,
        context: true,
      }, (res) => {
        const {
          "font-family": fontFamily,
          "font-size": fontSize,
          "font-weight": fontWeight,
          'padding-left': paddingLeft,
          'padding-right': paddingRight,
          width,
        } = res;
        let content = this.data.content;
        let actionText = this.data.actionText || '展开';
        let ctx;

        if (compareVersion(version, '2.16.1') >= 0) {
          const canvas = wx.createOffscreenCanvas({
            type: '2d',
            width: 300,
            height: 150
          })
          const _this = this;
          ctx = canvas.getContext('2d')
          draw(ctx, _this)
        } else {
          const _this = this;
          const query = wx.createSelectorQuery().in(this)
          query.select('.custorm_myCanvas')
            .fields({
              node: true,
              size: true
            })
            .exec((res) => {
              const canvas = res[0].node
              const ctx = canvas.getContext('2d')
              draw(ctx, _this)
            })
        }

        function draw(ctx, _this) {
          ctx.font = fontWeight + ' ' + fontSize + ' ' + fontFamily;
          var textWidth = ctx.measureText(content).width;
          let maxWidth = _this.data.row * parseFloat(width) + parseFloat(paddingLeft) + parseFloat(paddingRight);
          if (textWidth < maxWidth) {
            _this.setData({
              renderText: _this.content,
              actionText: '',
              expandText: '',
              isExpand: true
            })
            return;
          };

          function renderFilter(left, right) {
            if (right - left <= 1) {
              const middle = Math.round((left + right) / 2)
              var renderwidth = ctx.measureText(content.slice(0, middle) + '...' + actionText).width;
              return content.slice(0, left) + '...'
            }
            const middle = Math.round((left + right) / 2)
            var renderwidth = ctx.measureText(content.slice(0, middle) + '...' + actionText).width;
            if (renderwidth <= maxWidth) {
              return renderFilter(middle, right)
            } else {
              return renderFilter(left, middle)
            }
          }
          const ellipsised = renderFilter(0, _this.data.content.length)

          _this.setData({
            renderText: ellipsised,
            actionText: actionText,
            expandText: _this.data.expandText || '收起'
          })
        }


      }).exec();
    },
    bindSwitch() {
      this.setData({
        isExpand: !this.data.isExpand
      })
    }
  }
})