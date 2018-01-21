import { fillRoundRect, index2ij } from '../lib/index'
const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight
const Margin  = 10
const Padding = 10
const Width = (screenWidth-Padding*2-Margin*2) / 4
const PaddingTop = (screenHeight-Width*4)/2
const BACKGROUND_COLOR = '#ddd5ca'

export default class Chessboard {
  // style = {
  //   top: 20,
  //   margin: 10,
  //   padding: 10,
  //   background: "#bbaba0"
  // }
  constructor(rowNum, columnNum, style={}) {
    this.rowNum = rowNum || 5
    this.columnNum = columnNum || 5
    this.margin  = style.margin || 10
    this.padding = style.padding || 10
    this.top     = style.top
    this.background = "#bbaba0"
    this.space      = 10
    this.setCrosses()
  }

  render (ctx) {
    let { margin, padding, rowNum, columnNum, background } = this
    let width = (screenWidth-padding*2-margin*2) /(rowNum-1)
    ctx.fillStyle = BACKGROUND_COLOR
    ctx.fillRect(0, 0, screenWidth, screenHeight)

    // 展示按钮，文字，时间等附加项
    ctx.fillStyle = '#766e66'
    ctx.font = "38px serif"
    ctx.textBaseline = "bottom"
    ctx.textAlign =  "center"
    ctx.fillText('猫捉老鼠', screenWidth/2, PaddingTop-70)
    // ctx.fillText(time, screenWidth/2, PaddingTop-20)
    // 画数字面板
    fillRoundRect(ctx, margin, PaddingTop-10, screenWidth-margin*2, Width*4+20, 10, background)

    for (let i=1; i <= (rowNum-1)*(columnNum-1); i++) {
      let index = [parseInt((i - 1) / 4), (i - 1) % 4]
      let x = index[1] * Width + padding*1.5 + margin
      let y = index[0] * Width + PaddingTop+padding/2
      fillRoundRect(ctx, x, y, Width-padding, Width-padding, 10, "#cbc0b5")
    }

  }

  // 设置每个交叉点的坐标
  setCrosses () {
    this.crosses = [[null, null, null, null, null], [null, null, null, null, null], [null, null, null, null, null], [null, null, null, null, null], [null, null, null, null, null]] //[...Array(rowNum)].map((v,k) =>[])
    let { rowNum, columnNum, padding, margin} = this
    for( let i=0; i < rowNum*columnNum; i++ ) {
      let ij = index2ij(i)
      // console.log(ij)
      // let i = parseInt((i - 1) / 5)
      // let j = (i - 1) % 5
      let x = ij[1] * Width + padding + margin
      let y = ij[0] * Width + PaddingTop
      this.crosses[ij[0]][ij[1]] = [x, y]
    }
  }

  // update() {
  //   databus.chessboard[ij[0]][ij[1]] = pickedChessman // 更新棋盘的当前棋局
  //   databus.chessboard
  // }
}
