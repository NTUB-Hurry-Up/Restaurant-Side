'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');

//------------------------------------------
//查看店家資訊
var fetchStoreinfo = async function(storeid){
    //存放結果
    let result;  

    //讀取資料庫
    await query('SELECT "storeName","storeAdd","storeTel" FROM store WHERE	storeid=$1',[storeid])
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
//更新店名
var updateStorename = async function(storeid,msg4){
    //存放結果
    let result;  
    await query('UPDATE	store	SET	"storeName"=$1	WHERE	storeid=$2;',[msg4,storeid])
    .then((data) => { 
        result = data.rowCount;  //回傳資料數 
    }, (error) => {
        result = -9;  //執行錯誤
    });
    return result;
}
//------------------------------------------
//更新地址
var updateStoreAdd = async function(storeid,msg4){
    //存放結果
    let result;  
    
    await query('UPDATE	store	SET	"storeAdd"=$1	WHERE	storeid=$2;',[msg4,storeid])
    .then((data) => { 
        result = data.rowCount;  //回傳資料數 
    }, (error) => {
        result = -9;  //執行錯誤
    });
    return result;
}
//------------------------------------------
//更新電話
var updateStoreTel = async function(storeid,msg4){
    //存放結果
    let result;  
    
    await query('UPDATE	store	SET	"storeTel"=$1	WHERE	storeid=$2;',[msg4,storeid])
    .then((data) => { 
        result = data.rowCount;  //回傳資料數 
    }, (error) => {
        result = -9;  //執行錯誤
    });
    return result;
}
//------------------------------------------
var fetchStorefood = async function(storeid){
    //存放結果
    let result;  

    //讀取資料庫
    await query('SELECT foodName,foodPrice from food where storeid=$1 order by foodName', [storeid])
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
/*var fetchStoreTel = async function(storeid){
    //存放結果
    let result;  

    //讀取資料庫
    await query('SELECT store."storeTel" from store where storeid=$1', [storeid])
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows[0];  //店家資料(物件)
            }else{
                result = -1;  //找不到資料
            }    
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
    return result;
}*/
//匯出
module.exports = {fetchStoreinfo,updateStorename,updateStoreAdd,updateStoreTel,fetchStorefood};

