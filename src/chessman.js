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

}
