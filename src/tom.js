import Chessman from './chessman'
export default class Tome extends Chessman {
  constructor(x, y, r, color) {

    let style = function (ctx, x, y) {
      // star5(ctx, x, y, 15, 8)
      ctx.textBaseline = "middle"
      ctx.font = `${30}px serif`
      ctx.textAlign =  "center"
      ctx.fillStyle = '#756e64'
      ctx.fillText('🐱', x, y)
    }
    
    super(x, y, r, color, style)
  }

}
