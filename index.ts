//获取元素
let cells = document.querySelectorAll(".cell")
let gameBord = document.querySelector("#bord")
//获胜信息面板
let message = document.querySelector("#message") as HTMLDivElement
//胜利者
let winner = document.querySelector("#winner") as HTMLParagraphElement
//重新开始按钮
let restart = document.querySelector("#restart") as HTMLButtonElement

//判赢数组
let winsArr = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], //横
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], //竖
  [0, 4, 8],
  [2, 4, 6], //对角线
]

//记下下棋的次数
let steps: number

//创建枚举
enum Player {
  x = "x",
  o = "o",
}

//初始玩家为x
let currentPlayer: Player

//重新开始
restart.addEventListener("click", startGame)

//调用该游戏初始化游戏数据，开始游戏
startGame()

//开始游戏
function startGame() {
  message.style.display = "none"
  //重置下棋次数
  steps = 0
  //重置当前玩家为 x
  currentPlayer = Player.x
  //重置下棋提示
  gameBord.classList.remove(Player.x, Player.o)
  gameBord.classList.add(Player.x)
  cells.forEach((item) => {
    let cell = item as HTMLDivElement
    //清空事件
    cell.classList.remove(Player.o, Player.x)
    //移除单元格点击事件、重新给单元格绑定点击事件
    cell.removeEventListener("click", clickCell)
    cell.addEventListener("click", clickCell, { once: true })
  })
}

//监听棋盘的点击
function clickCell(e: MouseEvent) {
  let target = e.target as HTMLDivElement
  target.classList.add(currentPlayer)

  steps++

  //调用判赢函数判断玩家是否获胜
  let isWin = checkWin(currentPlayer)
  if (isWin) {
    console.log("当前玩家获胜了", currentPlayer)

    message.style.display = "block"
    winner.innerHTML = currentPlayer + " 赢了！"
    //此时游戏已结束，需return阻止后续代码的执行
    return
  }

  //判断平局
  if (steps === 9) {
    message.style.display = "block"
    winner.innerHTML = "平局"
    return
  }

  //实现玩家切换
  currentPlayer = currentPlayer === Player.x ? Player.o : Player.x

  //处理下一步提示
  gameBord.classList.remove(Player.x, Player.o)
  gameBord.classList.add(currentPlayer)
}

//封装判断输赢函数(主要考虑参数和返回值)
function checkWin(player: Player): boolean {
  return winsArr.some(function(item) {
    //先拿到每种胜利情况的三个索引（作为NodeList的索引）
    let cellIndex1 = item[0]
    let cellIndex2 = item[1]
    let cellIndex3 = item[2]

    //判断这三个单元格元素是否同时包含当前玩家的类名
    if (
      hasClass(cells[cellIndex1], player) &&
      hasClass(cells[cellIndex2], player) &&
      hasClass(cells[cellIndex3], player)
    ) {
      return true
    }
    return false
  })
}

//封装hasClass方法 判断某个DOM元素中是否含有某个类名
const hasClass = (el: Element, name: string) => {
  return el.classList.contains(name)
}
