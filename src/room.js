let ctx = canvas.getContext('2d')
export default class Room {
  constructor(no=null, game) {
    // this.game = entryGame
    this.no = no
    // this.roomRef = null
    this.status = null// creating, created, playing, entering, faild
    // no ? this.joined() : this.create()
    this.addInput(100, 100)
  }

  renderForm(ctx) {

    let { x, y, r, color } = this

    ctx.beginPath()
    ctx.arc(x, y, r, 0, 360, false)
    ctx.fillStyle = color || "white"
    ctx.fill()
  }

  addInput(x, y) {

    function handleEnter(e) {
      var keyCode = e.keyCode;
      if (keyCode === 13) {
        drawText(this.value, parseInt(this.style.left, 10), parseInt(this.style.top, 10))
        document.body.removeChild(this)
        hasInput = false
      }
    }
    var input = ctx.createElement('input');

    input.type = 'text';
    input.style.position = 'fixed';
    input.style.left = (x - 4) + 'px';
    input.style.top = (y - 4) + 'px';

    input.onkeydown = handleEnter;

    ctx.appendChild(input);

    input.focus();

    // hasInput = true;
  }

  init () {
    let id = new Fingerprint().get();
    return {
      tom: id, jerry: "",
      move: {
        from: "",
        to: "",
        iam: ""
      },
      created_at: Date.parse( new Date())
    }
  }

  create() {
    this.status = 'creating'
    this.no = this._generateRoomNo()
    roomsRef.once('value').then( (snapshot) => {
      while (snapshot.child(this.no).exists()) {
        this.no = this._generateRoomNo()
      }
      this.roomRef = roomsRef.child(this.no)
      this.roomRef.set(this.init()).then(() => {
        this._initEven()
        this.status = 'created'
        $('.loading').trigger("changeText")
      }).catch(function(err){
        this.status = 'faild'
        console.info('update data failed', err.code, err);
      });
    })
  }

  joined() {
    databus.iam = 'Jerry'
    let id = new Fingerprint().get();
    this.roomRef = roomsRef.child(this.no)
    this._initEven()
    this.roomRef.child(`jerry`).set(id).then(() => {
      this.status = 'playing'
      $('.loading').trigger("hide")
      this.game.start()
    })
  }

  _generateRoomNo () {
    return Math.floor(Math.random() * (9999 - 1000) + 1000).toString().slice(1)
  }

  _initEven() {
    this.roomRef.on("child_changed", (snapshot, prev) => {
      let changedVal = snapshot.val()
      let changedKey = snapshot.key()
      switch (changedKey) {
        case 'move':
          if(changedVal.to && changedVal.from) {
            databus.updateChessboard(changedVal.to, changedVal.from, changedVal.iam)                   // 更新棋局
            databus.myTurn = !(changedVal.iam == databus.iam)
          }
          break;
        case 'jerry':
          if(databus.iam == 'Tom') databus.myTurn = true
          this.status = 'playing'
          $('.loading').trigger("hide")
          this.game.start()
          break;
        default:
      }
    });

  }
}
