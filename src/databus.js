import Jerry from './jerry'
let instance

/**
 * 全局状态管理器
 */
export default class Databus {
  constructor() {
    if ( instance )
      return instance

    instance = this

    // this.pool = new Pool()
    this.iam = 'Tom'
    this.reset()
  }

  reset() {
    this.pickedChessman = null // 当前选中的棋子
    this.pickedChessmanij = [] // 当前选中的索引
    this.chessboard = [[], [], [], [], []]  // 棋局
    this.catchedJerries = []
    // {'01': chessOjb, ''
    //
    // }

    // this.frame      = 0
    // this.timer      = null
    // this.time       = '00:00'
    // this.matrix     = [[], [], [], []]
    // this.clearing   = [3, 3]
    // this.animations = []
    // this.gameStatus = 'READY' // 'STATED' 'SUCCESSED'
  }

  // 更新棋盘的当前棋局
  updateChessboard(ij) {
    let orgij = this.pickedChessmanij
    if(this.chessboard[ij[0]][ij[1]]) this.catchedJerries.push(this.chessboard[ij[0]][ij[1]])
    this.chessboard[ij[0]][ij[1]] = this.pickedChessman
    this.chessboard[orgij[0]][orgij[1]] = null
    this.pickedChessmanij = ij
  }

  canMoved (ij) {
    // 如果是jerry并且目标位置有棋子
    let currIJ = this.pickedChessmanij
    let isJerry = (this.pickedChessman.constructor.name == 'Jerry')
    // 目标位置有棋子时
    // 1.如果当前移动的棋子时jerry则不可移动
    // 2.如果是tom且中间隔着一个空位置，且目标位置是个jerry
    if(this.chessboard[ij[0]][ij[1]]) {
      // 如果是jerry则不可移动
      if(isJerry) return false

      let average
      if(ij[0] == currIJ[0]) {
        average = (ij[1] + currIJ[1])/2
        return (average%1 === 0 && !this.chessboard[ij[0]][average] && this.chessboard[ij[0]][ij[1]].constructor == Jerry)
      } else if(ij[1] == currIJ[1]) {
        average = (ij[0] + currIJ[0])/2
        return (average%1 === 0 && !this.chessboard[average][ij[1]] && this.chessboard[ij[0]][ij[1]].constructor == Jerry)
      }
    }

    // 目标位置在当前选中棋子所在位置的上下左右,且该位置没有棋子
    let up = [currIJ[0]-1, currIJ[1]].join('')
    let down = [currIJ[0]+1, currIJ[1]].join('')
    let left = [currIJ[0], currIJ[1]-1].join('')
    let right = [currIJ[0], currIJ[1]+1].join('')
    return [up, down, left, right].indexOf(ij.join('')) > -1

  }

  removeJerry() {

  }

}
