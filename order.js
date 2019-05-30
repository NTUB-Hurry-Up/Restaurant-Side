'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');

//查詢未完成訂單訂單
// var fetchOrder = async function (storeid, msg3) {
//     //存放結果
//     let result;

//     //讀取資料庫
//     await query('SELECT	a."orderid",a."takeDate",a."takeTime",a."orderDate",a."orderTime",a.userid,c."name",c.phone,b."amount",b."price",d."foodName",d."foodid" FROM "order" AS a, "orderDetail" AS b, "member" AS c, food AS d WHERE a.orderid=b.orderid AND a.userid=c.userid AND b.foodid=d.foodid	AND	a."status"=$1 AND a."storeid"=$2 ORDER BY a.orderid;', [msg3, storeid])
//         .then((data) => {
//             if (data.rows.length > 0) {
//                 result = data.rows;
//             } else {
//                 result = -1;  //找不到資料
//             }
//         }, (error) => {
//             result = -9;  //執行錯誤
//         });
//     //回傳執行結果
//     return result;
// }

//未接受訂單改為接受
var fetchacceptOrder = async function (storeid) {
    //存放結果
    let result;
    //讀取資料庫
    await query('SELECT	a."orderid",a."takeDate",a."takeTime",a."orderDate",a."orderTime",a.userid,c."name",c.phone,b."amount",b."price",d."foodName",d."foodid" FROM "order" AS a, "orderDetail" AS b, "member" AS c, food AS d WHERE a.orderid=b.orderid AND a.userid=c.userid AND b.foodid=d.foodid	AND	a."status"=$1 AND a."storeid"=$2 ORDER BY a.orderid;', ['未接單', storeid])
        .then((data) => {
            if (data.rows.length > 0) {
                result = data.rows;
            } else {
                result = -1;  //找不到資料
            }
        }, (error) => {
            result = -9;  //執行錯誤
        });
    //回傳執行結果
    return result;
}
var acceptOrder = async function () {
    //存放結果
    let result;
    //讀取資料庫
    await query('UPDATE	"order"	SET	status=$3	WHERE   status=$1;', ['未接單', '已接單未製作'])
        .then((data) => {
            result = data.rowCount;  //回傳資料數 
        }, (error) => {
            result = -9;  //執行錯誤
        });
    return result;
}
var rejectOrder = async function () {
    //存放結果
    let result;
    //讀取資料庫
    await query('UPDATE	"order"	SET	status=$2	WHERE   status=$1;', [ '未接單', '已拒絕'])
        .then((data) => {
            result = data.rowCount;  //回傳資料數 
        }, (error) => {
            result = -9;  //執行錯誤
        });
    return result;
}
var completedOrder = async function (storeid, msg3) {
    //存放結果
    let result;
    //讀取資料庫
    await query('UPDATE	"order"	SET	status=$4	WHERE	storeid=$1	AND	orderid=$2	AND	status=$3;', [storeid, msg3, '已接單未製作', '已製作未取餐'])
        .then((data) => {
            result = data.rowCount;  //回傳資料數 
        }, (error) => {
            result = -9;  //執行錯誤
        });
    return result;
}
var collectedOrder = async function (storeid, msg3) {
    //存放結果
    let result;
    //讀取資料庫
    await query('UPDATE	"order"	SET	status=$4	WHERE	storeid=$1	AND	orderid=$2	AND	status=$3;', [storeid, msg3, '已製作未取餐', '已取餐'])
        .then((data) => {
            result = data.rowCount;  //回傳資料數 
        }, (error) => {
            result = -9;  //執行錯誤
        });
    return result;
}
//查看所有訂單
var allOrder = async function (storeid) {
    //存放結果
    let result;
    //讀取資料庫
    await query('SELECT	"orderid","status" FROM "order"	WHERE  storeid=$1;', [storeid])
        .then((data) => {
            if (data.rows.length > 0) {
                result = data.rows;
            } else {
                result = -1;  //找不到資料
            }
        }, (error) => {
            result = -9;  //執行錯誤
        });
    //回傳執行結果
    return result;
}
//查看今日訂單
var todayOrder = async function (storeid, fetchDate) {
    //存放結果
    let result;

    //讀取資料庫
    await query('select a.orderid, c.storeid, c.userid, e."name", e.phone, c."orderDate", c."orderTime", c."takeDate", c."takeTime", c.status, b."foodName", a.quantity, a."unitPrice" from "orderDetail" a, food b , "order" c , store d , member e where a.foodid = b.foodid and c.orderid in (select orderid from "order" where storeid = $1 and "takeDate" = $2 LIMIT 10) and c.orderid = a.orderid and c.userid = e.userid and c.storeid = d.storeid ORDER BY "orderDate"desc, "orderTime"'
        , [storeid, fetchDate])
        .then((data) => {
            if (data.rows.length > 0) {
                result = data.rows;
            } else {
                result = -1;  //找不到資料
            }
        }, (error) => {
            result = -9;  //執行錯誤
        });
    //回傳執行結果
    return result;
}
//匯出
module.exports = { fetchacceptOrder,acceptOrder, rejectOrder, completedOrder, collectedOrder, allOrder, todayOrder };