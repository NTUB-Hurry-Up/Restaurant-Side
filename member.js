'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');

//------------------------------------------
// 新增會員資料
//------------------------------------------
var addMember = async function(id, name, phone){
    //存放結果
    let result;  

    //新增會員資料
    await query('insert into member (userid, name, phone) values ($1, $2, $3)', [id, name, phone])
        .then((data) => {
            result = data.rowCount;  //新增資料數 
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
    return result;  
}

//------------------------------------------
// 刪除會員資料
//------------------------------------------
var deleteMember = async function(id){
    //存放結果
    let result;  

    //刪除會員資料
    await query('delete from member where userid = $1', [id])
        .then((data) => {
            result = data.rowCount;  //刪除資料數 
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
    return result;  
}
//------------------------------------------

//匯出
module.exports = {addMember, deleteMember};