import { star5 } from '../lib/index'
import Chessboard from './chessboard'
import Chessman from './chessman'

let ctx = canvas.getContext('2d')

export default class Main {
  constructor () {
    this.chessboard = new Chessboard
    this.render()
  }

  render() {
    this.chessboard.render(ctx)

    let style1 = function (ctx, x, y) {
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, 360, false)
      ctx.fillStyle = "red"
      ctx.fill()
    }
    this.chessboard.crosses.slice(0, 15).forEach((cross, idx) => {
      let chessman = new Chessman(cross[0], cross[1], 20, null, style1)
      chessman.render(ctx)
    })

    let style2 = function (ctx, x, y) {
      star5(ctx, x, y, 15, 8)
    }
    this.chessboard.crosses.slice(21, 24).forEach((cross, idx) => {
      let chessman = new Chessman(cross[0], cross[1], 25, 'red', style2)
      chessman.render(ctx)
    })

  }

}
