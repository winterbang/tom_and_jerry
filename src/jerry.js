import Chessman from './chessman'
export default class Jerry extends Chessman {
  constructor(x, y, r, color) {
    let style = function (ctx, x, y) {
      // ctx.beginPath()
      // ctx.arc(x, y, 8, 0, 360, false)
      // ctx.fillStyle = "red"
      // ctx.fill()
      ctx.textBaseline = "middle"
      ctx.font = `${30}px serif`
      ctx.textAlign =  "center"
      ctx.fillStyle = '#756e64'
      ctx.fillText('🐭', x, y)
    }
    super(x, y, r, color, style)
  }


}
