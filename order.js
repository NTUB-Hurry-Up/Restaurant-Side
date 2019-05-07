'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');

//查詢未完成訂單訂單
var fetchOrder = async function(storeid, msg3){
    //存放結果
    let result;  

    //讀取資料庫
    await query('SELECT	"orderid","storeid","takeDate","takeTime" FROM "order" WHERE "status"=$1 AND "storeid"=$2;', [msg3,storeid])
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

//未接受訂單改為接受
var acceptOrder = async function(storeid,msg3){
    //存放結果
    let result;  
    //讀取資料庫
    await query('UPDATE	"order"	SET	status=$4	WHERE	storeid=$1	AND	orderid=$2	AND	status=$3;',[storeid,msg3,'未接單','已接單未製作'])
    .then((data) => { 
        result = data.rowCount;  //回傳資料數 
    }, (error) => {
        result = -9;  //執行錯誤
    });
    return result; 
}
var rejectOrder = async function(storeid,msg3){
    //存放結果
    let result;  
    //讀取資料庫
    await query('UPDATE	"order"	SET	status=$4	WHERE	storeid=$1	AND	orderid=$2	AND	status=$3;',[storeid,msg3,'未接單','已拒絕'])
    .then((data) => { 
        result = data.rowCount;  //回傳資料數 
    }, (error) => {
        result = -9;  //執行錯誤
    });
    return result; 
}
var completedOrder = async function(storeid,msg3){
    //存放結果
    let result;  
    //讀取資料庫
    await query('UPDATE	"order"	SET	status=$4	WHERE	storeid=$1	AND	orderid=$2	AND	status=$3;',[storeid,msg3,'已接單未製作','已製作未取餐'])
    .then((data) => { 
        result = data.rowCount;  //回傳資料數 
    }, (error) => {
        result = -9;  //執行錯誤
    });
    return result; 
}
//查看所有訂單
var allOrder = async function(storeid){
    //存放結果
    let result;  
    //讀取資料庫
    await query('SELECT	"orderid","status" FROM "order"	WHERE  storeid=$1;',[storeid])
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
//查看今日訂單
var todayOrder = async function(storeid,fetchDate,fetchTime){
    //存放結果
    let result;  

    //讀取資料庫
    await query('SELECT	* FROM	"order"	WHERE storeid=$1 AND "takeDate"=$2 AND "takeTime" BETWEEN $3 AND $4;'
    ,[storeid,fetchDate,'00:00:00',fetchTime])
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
module.exports = {fetchOrder,acceptOrder,rejectOrder,completedOrder,allOrder,todayOrder};