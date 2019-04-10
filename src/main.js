import { star5, index2ij } from '../lib/index.js'
import Chessboard from './chessboard'
import Chessman from './chessman'
import Jerry from './jerry'
import Tom from './tom'
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
    this.initChesses()
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      let ij = this.xy2ij(x, y)
      let chessman = databus.chessboard[ij[0]][ij[1]]
      if(ij && chessman && chessman.constructor.name == databus.iam) {
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

      if(ij && databus.canMoved(ij)) {
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

    let animationFrameNumber = window.requestAnimationFrame(
      this.loop.bind(this),
      canvas
    )
    // console.log(animationFrameNumber)
  }

  initChesses () {
    // 初始化棋盘
    this.chessboard.render(ctx)
    this.chessboard.crosses.slice(0, 3).forEach((crosses, i) => {
      crosses.forEach((cross, j) => {
        let jerry = new Jerry(cross[0], cross[1], 20, 'black')
        jerry.render(ctx)
        // let ij = index2ij(idx)
        databus.chessboard[i][j] = jerry
      })
    })

    this.chessboard.crosses.slice(4, 5).forEach((crosses, idx) => {
      // console.log(crosses);
      crosses.slice(1, 4).forEach((cross, index) => {
        let tom = new Tom(cross[0], cross[1], 25, 'white')
        tom.render(ctx)
        let j = crosses.indexOf(cross)
        databus.chessboard[4][j] = tom
      })

    })
  }

  xy2ij (x, y) {
    let i = parseInt((y - Top + Height/2) / Height)
    let j = parseInt((x - Margin + Width/2) / Width)
    if (i < 0 || j < 0 || i > databus.chessboard.length-1) return null
    let chessboard = databus.chessboard

    let chessman = chessboard[i][j]
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
    // 清空画板
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // 画棋盘
    this.chessboard.render(ctx)

    // 计分
    let jerryChessman = new Jerry(Margin+Padding+20, screenHeight-PaddingTop+Height, 20, 'black')
    jerryChessman.render(ctx)
    ctx.fillStyle = '#766e66'
    ctx.font = "38px serif"
    ctx.textBaseline = "middle"
    ctx.textAlign =  "left"
    ctx.fillText(` x ${databus.catchedJerries.length}`, Margin+Padding+20+20, screenHeight-PaddingTop+Height)

    databus.chessboard.forEach((row, idx) => {
      row.forEach((chessman, idx) => {
        if(chessman && chessman !=databus.pickedChessman) chessman.render(ctx)
      })
    })
    if(databus.pickedChessman) databus.pickedChessman.render(ctx)
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
