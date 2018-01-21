import { star5, index2ij } from '../lib/index.js'
import Chessboard from './chessboard'
import Chessman from './chessman'
import Databus from './databus'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight
const Margin  = 10
const Padding = 10
const Width = (screenWidth-Padding*2-Margin*2) / 4
const Height= Width
const PaddingTop = (screenHeight-Width*4)/2
const Top = (screenHeight-Width*4 + Padding*2)/2


let ctx = canvas.getContext('2d')
let databus = new Databus()

export default class Main {
  constructor () {
    this.chessboard = new Chessboard()
    // this.render()
    this.restart()
  }

  restart () {
    this.init()
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      let ij = this.xy2ij(x, y)
      if(ij && databus.chessboard[ij[0]][ij[1]]) {
        databus.pickedChessman = databus.chessboard[ij[0]][ij[1]]
        databus.pickedChessmanij = ij
      }

    }).bind(this))

    canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      if(databus.pickedChessman) {
        databus.pickedChessman.setAirPosAcrossFingerPosZ(x, y)
      }
    }).bind(this))

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()
      let pickedChessman = databus.pickedChessman
      if (!pickedChessman) return
      let ij = this.xy2ij(pickedChessman.x, pickedChessman.y)
      if(ij && !databus.chessboard[ij[0]][ij[1]]) {
        // 目标位置在棋盘上，并且当前位置没有对象则更新棋局
        let xy = this.chessboard.crosses[ij[0]][ij[1]] // 获取目标位置的坐标
        databus.pickedChessman.updateXY(xy[0], xy[1])  // 更新所移动棋子的坐标到目标位置的坐标
        databus.updateChessboard(ij)                   // 更新棋局
        databus.pickedChessman = null
      } else {
        // 回到初始位置
        let ij = databus.pickedChessmanij
        let xy = this.chessboard.crosses[ij[0]][ij[1]]
        databus.pickedChessman.updateXY(xy[0], xy[1])
      }
    }).bind(this))

    window.requestAnimationFrame(
      this.loop.bind(this),
      canvas
    )
  }

  init () {
    this.chessboard.render(ctx)
    let style1 = function (ctx, x, y) {
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
    this.chessboard.crosses.slice(0, 3).forEach((crosses, i) => {
      crosses.forEach((cross, j) => {
        let chessman = new Chessman(cross[0], cross[1], 20, 'black', style1)
        chessman.render(ctx)
        // let ij = index2ij(idx)
        databus.chessboard[i][j] = chessman
      })
    })

    let style2 = function (ctx, x, y) {
      // star5(ctx, x, y, 15, 8)

      ctx.textBaseline = "middle"
      ctx.font = `${30}px serif`
      ctx.textAlign =  "center"
      ctx.fillStyle = '#756e64'
      ctx.fillText('🐱', x, y)
    }
    this.chessboard.crosses.slice(4, 5).forEach((crosses, idx) => {
      // console.log(crosses);
      crosses.slice(1, 4).forEach((cross, index) => {
        let chessman = new Chessman(cross[0], cross[1], 25, 'white', style2)
        chessman.render(ctx)
        let j = crosses.indexOf(cross)
        databus.chessboard[4][j] = chessman
      })

    })
  }

  xy2ij (x, y) {
    let i = parseInt((y - Top + Height/2) / Height)
    let j = parseInt((x - Margin + Width/2) / Width)
    if (i < 0 || j < 0 || i > databus.chessboard.length-1) return null
    // console.log(i,j, 'ij');
    let chessboard = databus.chessboard
    // console.log(databus.chessboard, '==========');
    // console.log(chessboard[i], 'databus.chessboard[i]');

    let chessman = chessboard[i][j]
    // console.log(chessman, 'chessman');
    if (!chessman) return [i,j]
    let area = chessman.area()

    if( x >= area.startX
         && x <= area.endX
         && y >= area.startY
         && y <= area.endY ) {
      // x, y 是某个棋子的坐标区域，则返回对应的棋子在棋盘中的索引
      return [i,j]
    } else {
      // x, y不是某个棋子的坐标，则返回null
      return null
    }


  }

  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.chessboard.render(ctx)

    databus.chessboard.forEach((row, idx) => {
      row.forEach((chessman, idx) => {
        if(chessman) chessman.render(ctx)
      })
    })
  }

  loop () {
    // this.monitorAchieve()
    this.render()

    window.requestAnimationFrame(
      this.loop.bind(this),
      canvas
    )
  }
}
