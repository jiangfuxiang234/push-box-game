import * as map from "./map.js";

var gameContainer = document.getElementById("game");
var pieceWidth = 45; // 一个小方格的尺寸
var pieceHeight = 45;

/**
 * 设置游戏容器的宽高
 */
function setGameContainer(){ 
    gameContainer.style.width = pieceWidth * map.colNumber + "px";
    gameContainer.style.height = pieceHeight * map.rowNumber + "px"
}

/**
 * 判断是否在正确位置上
 * @param {*} row 
 * @param {*} col 
 * @returns true 或 false
 */
function isCorrect (row, col){
  return  map.correct.find(p => p.row === row && p.col === col) !== undefined
}

/**
 * 根据行和列，设置每一个小方格
 * @param {*} row 
 * @param {*} col 
 * @returns 
 */
function setPiece(row, col){
    var value = map.content[row][col];// 取出地图相应位置的值
    var resault = isCorrect(row, col);
    var div = document.createElement("div");
    div.className = "item"; // 公共类样式 
      // 调整小方格的位置
    div.style.left = pieceWidth * col + "px"; 
    div.style.top = pieceHeight * row + "px";
    
    // 给每一个小方格添加相应的类
    if(value === map.PLAYER){
        div.classList.add("player")
    } else if(value === map.WALL){
        div.classList.add("wall")
    }else if(value === map.BOX){
        if(resault){
            div.classList.add("correct-box")
        }else{
            div.classList.add("box")
        }
    }else{ // 空白方格
        if(resault){
            div.classList.add("correct")
        }else{
            return
        }
    }
    gameContainer.appendChild(div)

}

/**
 * 根据地图在页面上设置相应的元素
 */
function setContent(){
    gameContainer.innerHTML = "";
    for(var row = 0; row < map.rowNumber; row++){
        for(var col = 0; col < map.colNumber; col++){
            setPiece(row, col)
        }
    }
}
export default function(){
    setGameContainer();
    setContent();
}