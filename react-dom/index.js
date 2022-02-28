import setAttribute from './setAttribute'

function render(vnode, container) {

  // 检查vnode的值，如果是空则什么都不做
  if (vnode === undefined || vnode === null || vnode === '') {
    return
  }

  // 如果vnode类型是string，则创建文本节点直接插入container
  if (typeof vnode === 'string') {
    const textNode = document.createTextNode(vnode)
    return container.appendChild(textNode)
  }

  const { tag, attrs, childrens } = vnode
  const childrensIsArray = Array.isArray(childrens)

  let dom = document.createElement(tag)

  // 检查attrs，遍历该对象，并使用setAttribute方法设置dom属性
  if (attrs) {
    Object.keys(attrs).forEach((key) => {
      const value = attrs[key]
      setAttribute(dom, key, value)
    })
  }

  if (childrensIsArray && childrens.length) {
    childrens.forEach((item) => {
      render(item, dom)
    })
  }

  container.appendChild(dom)
  console.log(dom)
}

export default {
  render
}