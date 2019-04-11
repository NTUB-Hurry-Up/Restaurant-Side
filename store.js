'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');

//------------------------------------------
var fetchStore = async function(){
    //存放結果
    let result;  

    //讀取資料庫
    await query('select * from store order by storeid desc')
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
var fetchStorefood = async function(storeid){
    //存放結果
    let result;  

    //讀取資料庫
    await query('SELECT * from food where storeid=$1 order by foodid', [storeid])
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
var fetchStoreTel = async function(storeid){
    //存放結果
    let result;  

    //讀取資料庫
    await query('SELECT store."storeTel" from store where storeid=$1', [storeid])
        .then((data) => {
            if(data.rows.length > 0){
                result = data[0].rows;  //店家資料(物件)
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
module.exports = {fetchStore, fetchStorefood, fetchStoreTel};

