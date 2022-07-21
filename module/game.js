import { playerMove, isWin } from "./play.js";
import showUi from "./ui.js";
showUi();
var over = false; // 判断游戏是否胜利的锁
window.onkeydown = function(e){
    if(over){
        return
    }
    var resault = false; // 判断是否变换移动成功的锁
    if(e.key === "ArrowUp"){
        resault = playerMove("up")
    }else if(e.key === "ArrowDown"){
        resault = playerMove("down")
    }else if(e.key === "ArrowLeft"){
        resault = playerMove("left")
    }else if(e.key === "ArrowRight"){
        resault = playerMove("right")
    }
    if(resault){
        showUi() // 每次位置变换成功页面都要重新渲染一次
        if(isWin()){
            window.alert("游戏胜利")
            over = true;
        }
        return 
    }
}