'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');
var fetchStoreFood = async function(storeid){
    //存放結果
    let result;  

    //讀取資料庫
    await query('SELECT "foodName","foodPrice"	FROM	food	WHERE	storeid=$1 order by "foodName";', [storeid])
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows;  //店家資料(物件)
            }else{
                result = -1;  //找不到資料
            }    
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
    return result;
}
//------------------------------------------
var updateFoodName = async function(storeid,msg4,msg5){
    //存放結果
    let result;  
    
    await query('UPDATE	food SET "foodName"=$3	WHERE	storeid=$2	AND	"foodName"=$1;',[msg4,storeid,msg5])
    .then((data) => { 
        result = data.rowCount;  //回傳資料數 
    }, (error) => {
        result = -9;  //執行錯誤
    });
    return result;
}
//------------------------------------------
var updateFoodPrice = async function(storeid,msg4,msg5){
    //存放結果
    let result;  
    
    await query('UPDATE	food SET "foodPrice"=$3	WHERE	storeid=$2	AND	"foodName"=$1;',[msg4,storeid,msg5])
    .then((data) => { 
        result = data.rowCount;  //回傳資料數 
    }, (error) => {
        result = -9;  //執行錯誤
    });
    return result;
}
//上架餐點
var launchedFood = async function(storeid,msg4){
    //存放結果
    let result;  
    
    await query('UPDATE	food	SET	"isSale"=$4	WHERE	"storeid"=$1	AND	"foodName"=$2	AND	"isSale"=$3;',[storeid,msg4,'N','Y'])
    .then((data) => { 
        result = data.rowCount;  //回傳資料數 
    }, (error) => {
        result = -9;  //執行錯誤
    });
    return result;
}




module.exports = {fetchStoreFood,updateFoodName,updateFoodPrice,launchedFood};