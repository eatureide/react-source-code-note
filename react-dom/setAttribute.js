
function setAttribute(dom, key, value = '') {

  // 如果key是className
  const isClassName = key === 'className'
  // 如果key是事件并且是函数
  const isEvent = /on\w+/.test(key) && typeof value === 'function'
  // 如果key是样式style
  const isStyle = key === 'style'

  // 转换为class
  if (isClassName) {
    key = 'class'
  }

  // 设置事件
  if (isEvent) {
    key = key.toLowerCase()
    dom[key] = value
  }

  // 设置样式
  if (isStyle) {
    if (typeof value === 'object') {
      const styleObject = value
      Object.keys(styleObject).forEach((key) => {
        let val = styleObject[key]
        if (typeof val === 'number') {
          val = val + 'px'
        }
        dom.style[key] = val
      })
      return
    }
    dom.style.cssText = value
  }

  // 如果都不是，则直接设置属性
  if (!isClassName && !isEvent) {

    if (value) {
      dom.setAttribute(key, value)
    }

    if (!value) {
      dom.setAttribute(key)
    }
  }

}

export default setAttribute