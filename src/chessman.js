const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

export default class Chessman {
  constructor (x, y, r, color, style) {
    this.x = x
    this.y = y
    this.r = r || 20
    this.color = color
    this.styleFunc = style
    this.isPicked = false
  }

  render(ctx) {

    let { x, y, r, color } = this

    ctx.beginPath()
    ctx.arc(x, y, r, 0, 360, false)
    ctx.fillStyle = color || "white"
    ctx.fill()

    if (this.styleFunc) this.styleFunc(ctx, x, y)
  }

  /**
   * 根据手指的位置设置棋子的位置
   * 保证手指处于棋子中间
   * 同时限定棋子的活动范围限制在棋盘中
   */
  setAirPosAcrossFingerPosZ(x, y) {
    let { r } = this
    let disX = x - r
    let disY = y - r

    if ( disX < 0 )
      disX = 0

    else if ( disX > screenWidth - r*2 )
      disX = screenWidth - r*2

    if ( disY <= 0 )
      disY = 0

    else if ( disY > screenHeight - r*2 )
      disY = screenHeight - r*2

    this.x = disX
    this.y = disY
  }

  updateXY(x, y) {
    this.x = x
    this.y = y
  }

  area() {
    let { x, y, r } = this 
    return {
      startX: x - r,
      startY: y - r,
      endX: x + r,
      endY: y + r
    }
  }
}
