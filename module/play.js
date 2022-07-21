import * as map from "./map.js"

export function playerMove(direction){
    var playerInfo = getPlayerInfo(); // 获取玩家的位置
    var nextInfo = getNextInfo(playerInfo.row, playerInfo.col, direction); // 获取玩家下一个位置的信息
    if(nextInfo.value === map.WALL){ // 玩家下一个是墙则不能走
        return false;
    }
    if(nextInfo.value === map.SPACE){
        exchange(playerInfo, nextInfo);
        return true;
    }else if(nextInfo.value === map.BOX){
        var nextNextInfo = getNextInfo(nextInfo.row, nextInfo.col, direction); // 获取玩家下下个位置的信息
        if(nextNextInfo.value === map.SPACE){ // 只有玩家下下个位置是空白才可以走
            exchange(nextInfo, nextNextInfo); // 箱子先和空白交换值，然后玩家和空白交换值，虽然值交换了，但是nextInfo那些所保存的位置信息还是以前的
            exchange(playerInfo, nextInfo);
            return true;
        }else{
            return false;
        }
    }
}

/**
 * 所有箱子都在正确位置上则赢
 * @returns 
 */
export function isWin(){
     for(var i = 0; i < map.correct.length; i++){
        var point = map.correct[i]
        if(map.content[point.row][point.col] !== map.BOX){ // 只有一个箱子不在正确位置上就不符合赢的条件
            return false
        }
     }
     return true
}

/**
 * 获取玩家的位置
 * @returns 
 */
function getPlayerInfo(){
    for(var row = 0; row < map.rowNumber; row++){
        for(var col = 0; col < map.colNumber; col++){
            if(map.content[row][col] === map.PLAYER){
                return {
                    row,
                    col
                }
            }
        }
    }
      throw new Error ("地图上竟然没有玩家")
}

/**
 * 交换两个位置的值
 * @param {*} info1 
 * @param {*} info2 
 */
function exchange(info1, info2){
    var temp = map.content[info1.row][info1.col];
    map.content[info1.row][info1.col] = map.content[info2.row][info2.col];
     map.content[info2.row][info2.col] = temp ;
}

/**
 * 获取下一个位置的信息
 * @param {*} row 
 * @param {*} col 
 * @param {*} direction 
 * @returns 
 */
function getNextInfo(row, col, direction){
    if(direction === "left"){
        return{
            row,
            col : col - 1,
            value : map.content[row][col - 1]
        }
    }else if(direction === "right"){
        return{
            row,
            col : col + 1,
            value : map.content[row][col + 1]
        }
    }else if(direction === "up"){
        return{
        row : row - 1,
        col,
        value : map.content[row - 1][col]
    }
    }else{
        return{
        row : row + 1,
        col,
        value : map.content[row + 1][col]
        }
    }
}