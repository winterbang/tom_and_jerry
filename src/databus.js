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

    this.reset()
  }

  reset() {
    this.pickedChessman = null // 当前选中的棋子
    this.pickedChessmanij = [] // 当前选中的索引
    this.chessboard = [[], [], [], [], []]  // 棋局
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

  move (direction) {
    let clearing = this.clearing
    let targetXY = {
      UP:    [clearing[0]+1, clearing[1]],
      DOWN:  [clearing[0]-1, clearing[1]],
      LEFT:  [clearing[0], clearing[1]+1],
      RIGHT: [clearing[0], clearing[1]-1]
    }[direction]
    if(!(targetXY[0] > 3 || targetXY[0] < 0 || targetXY[1] > 3 || targetXY[1] < 0)) {
      let chunk = this.matrix[targetXY[0]][targetXY[1]]
      chunk.updateIndex(clearing)
      this.matrix[clearing[0]][clearing[1]] = chunk
      this.matrix[targetXY[0]][targetXY[1]] = null
      this.clearing = targetXY
      return true
    } else {
      return false
    }
  }

  // 更新棋盘的当前棋局
  updateChessboard(ij) {
    let orgij = this.pickedChessmanij
    this.chessboard[ij[0]][ij[1]] = this.pickedChessman
    this.chessboard[orgij[0]][orgij[1]] = null
    this.pickedChessmanij = ij
  }
}
