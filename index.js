//获取元素
var cells = document.querySelectorAll(".cell");
var gameBord = document.querySelector("#bord");
//获胜信息面板
var message = document.querySelector("#message");
//胜利者
var winner = document.querySelector("#winner");
//重新开始按钮
var restart = document.querySelector("#restart");
//判赢数组
var winsArr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6], //对角线
];
//记下下棋的次数
var steps;
//创建枚举
var Player;
(function (Player) {
    Player["x"] = "x";
    Player["o"] = "o";
})(Player || (Player = {}));
//初始玩家为x
var currentPlayer;
//重新开始
restart.addEventListener("click", startGame);
//调用该游戏初始化游戏数据，开始游戏
startGame();
//开始游戏
function startGame() {
    message.style.display = "none";
    //重置下棋次数
    steps = 0;
    //重置当前玩家为 x
    currentPlayer = Player.x;
    //重置下棋提示
    gameBord.classList.remove(Player.x, Player.o);
    gameBord.classList.add(Player.x);
    cells.forEach(function (item) {
        var cell = item;
        //清空事件
        cell.classList.remove(Player.o, Player.x);
        //移除单元格点击事件、重新给单元格绑定点击事件
        cell.removeEventListener("click", clickCell);
        cell.addEventListener("click", clickCell, { once: true });
    });
}
//监听棋盘的点击
function clickCell(e) {
    var target = e.target;
    target.classList.add(currentPlayer);
    steps++;
    //调用判赢函数判断玩家是否获胜
    var isWin = checkWin(currentPlayer);
    if (isWin) {
        console.log("当前玩家获胜了", currentPlayer);
        message.style.display = "block";
        winner.innerHTML = currentPlayer + " 赢了！";
        //此时游戏已结束，需return阻止后续代码的执行
        return;
    }
    //判断平局
    if (steps === 9) {
        message.style.display = "block";
        winner.innerHTML = "平局";
        return;
    }
    //实现玩家切换
    currentPlayer = currentPlayer === Player.x ? Player.o : Player.x;
    //处理下一步提示
    gameBord.classList.remove(Player.x, Player.o);
    gameBord.classList.add(currentPlayer);
}
//封装判断输赢函数(主要考虑参数和返回值)
function checkWin(player) {
    return winsArr.some(function (item) {
        //先拿到每种胜利情况的三个索引（作为NodeList的索引）
        var cellIndex1 = item[0];
        var cellIndex2 = item[1];
        var cellIndex3 = item[2];
        //判断这三个单元格元素是否同时包含当前玩家的类名
        if (hasClass(cells[cellIndex1], player) &&
            hasClass(cells[cellIndex2], player) &&
            hasClass(cells[cellIndex3], player)) {
            return true;
        }
        return false;
    });
}
//封装hasClass方法 判断某个DOM元素中是否含有某个类名
var hasClass = function (el, name) {
    return el.classList.contains(name);
};
