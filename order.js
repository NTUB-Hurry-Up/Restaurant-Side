'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');

//查詢未完成訂單訂單
var fetchOrder = async function(storeId, msg3){
    //存放結果
    let result;  

    //讀取資料庫
    await query('SELECT	"orderid","storeid","takeDate","takeTime" FROM "order" WHERE "status"=$1 AND "storeid"=$2;', [msg3,storeId])
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows; 
            }else{
                result = -1;  //找不到資料
            }    
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
    return result;  
}
//
var AccpetOrder = async function(storeId, msg3){
    //存放結果
    let result;  

    //讀取資料庫
    await query('SELECT	"orderid","storeid","takeDate","takeTime" FROM "order" WHERE "status"=$1 AND "storeid"=$2;', [msg3,storeId])
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows; 
            }else{
                result = -1;  //找不到資料
            }    
        }, (error) => {
            result = -9;  //執行錯誤
        });


    //回傳執行結果
    return result;  
}

var CompletedOrder = async function(storeId, msg3){
    //存放結果
    let result;  

    //讀取資料庫
    await query('SELECT	"orderid","storeid","takeDate","takeTime" FROM "order" WHERE "status"=$1 AND "storeid"=$2;', [msg3,storeId])
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows; 
            }else{
                result = -1;  //找不到資料
            }    
        }, (error) => {
            result = -9;  //執行錯誤
        });
    //回傳執行結果
    return result;  
}
//匯出
module.exports = {fetchOrder, AccpetOrder};