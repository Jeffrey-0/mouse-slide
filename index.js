var directionName = ['left', 'top', 'right', 'bottom']
// 接口函数,鼠标移动
function mouseSlide (className ,time) { // eslint-disable-line
  var items = document.getElementsByClassName(className || 'item')
  var titles = []
  for (var i = 0; i < items.length; i += 1) {
    titles[i] = items[i].getElementsByTagName('div')[0]
    if (time) {
      titles[i].style.animationDuration = time + 'ms'
    }
  }
  // 添加事件
  for (var j = 0; j < items.length; j += 1) {
    ;(function (j) {
      items[j].onmouseleave = function () {
        mouseout(items, titles, j)
      }
      items[j].onmouseenter = function () {
        mouseover(items, titles, j)
      }
    })(j)
  }
}
// 鼠标悬停事件
function mouseover (items, titles, i) {
  var d = direction(items, i)
  titles[i].className = directionName[d] + '-over'
}
// 鼠标离开事件
function mouseout (items, titles, i) {
  var d = direction(items, i)
  titles[i].className = directionName[d] + '-out'
}
// 获取当前鼠标相对文档的位置
function getMousePos (event) {
  var e = event || window.event
  var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft
  var scrollY = document.documentElement.scrollTop || document.body.scrollTop
  var x = e.pageX || e.clientX + scrollX || e.offsetX
  var y = e.pageY || e.clientY + scrollY || e.offsetY
  return { x: x, y: y }
}
// 判断方向
function direction (items, i) {
  var width = items[i].offsetWidth
  var height = items[i].offsetHeight
  var top = items[i].offsetTop
  var left = items[i].offsetLeft
  var mousePos = getMousePos()
  var x = mousePos.x - left
  var y = mousePos.y - top
  if (y >= height / width * x) {
    if (y >= height - height / width * x) {
      return 3
    } else {
      return 0
    }
  } else {
    if (y >= height - height / width * x) {
      return 2
    } else {
      return 1
    }
  }
}
// 解决ie8不支持getElementsByClassName
if (!document.getElementsByClassName) {
  document.getElementsByClassName = function (className, element) {
    var children = (element || document).getElementsByTagName('*')
    var elements = []
    for (var i = 0; i < children.length; i += 1) {
      var child = children[i]
      if (child.className.indexOf(className) !== -1) {
        elements.push(child)
      }
    }
    return elements
  }
}
