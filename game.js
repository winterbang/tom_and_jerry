import './lib/weapp-adapter'
import Room from './src/room'
import Main from './src/main'

let button = wx.createUserInfoButton({
  type: 'text',
  text: '登录',
  style: {
    left: 10,
    top: 76,
    width: 100,
    height: 40,
    lineHeight: 40,
    backgroundColor: '#ff0000',
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    borderRadius: 4
  }
})
button.onTap((res) => {
  console.log(res)
})

new Room()
// new Main()
// wx.authorize({
//   scope: 'scope.record'
// })
