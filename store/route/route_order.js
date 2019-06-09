'use strict';

//引用操作資料庫的物件
const query = require('./../../asyncDB');

var fetchOrderRecord = async function (storeid, status, takeDate) {
    //存放結果
    let result;
    //讀取資料庫
    if (status != "今日訂單") {
        await query('select a.orderid, c.storeid, c.userid, e."name", e.phone, c."orderDate", c."orderTime", c."takeDate", c."takeTime", c.status, b."foodName", a.quantity, a."unitPrice" from "orderDetail" a, food b, "order" c, store d, member e where a.foodid = b.foodid and c.orderid in ( select orderid from "order" where storeid = $1 and status = $2 LIMIT 10 ) and c.orderid = a.orderid and c.userid = e.userid and c.storeid = d.storeid ORDER BY "takeDate" desc, "takeTime" desc', [storeid, status])
            .then((data) => {
                if (data.rows.length > 0) {
                    result = data.rows;
                } else {
                    result = -1;  //找不到資料
                }
            }, (error) => {
                result = -9;  //執行錯誤
            });
    } else if (status == "今日訂單") {
        await query('select a.orderid, c.storeid, c.userid, e."name", e.phone, c."orderDate", c."orderTime", c."takeDate", c."takeTime", c.status, b."foodName", a.quantity, a."unitPrice" from "orderDetail" a, food b, "order" c, store d, member e where a.foodid = b.foodid and c.orderid in ( select orderid from "order" where storeid = $1 and "takeDate" = $2 LIMIT 10 ) and c.orderid = a.orderid and c.userid = e.userid and c.storeid = d.storeid ORDER BY "takeTime" desc', [storeid, takeDate])
            .then((data) => {
                if (data.rows.length > 0) {
                    result = data.rows;
                } else {
                    result = -1;  //找不到資料
                }
            }, (error) => {
                result = -9;  //執行錯誤
            });
    }

    //回傳執行結果
    return result;
}
var fetchOrder = async function (orderid) {
    //存放結果
    let result;
    //讀取資料庫
    await query('select a.orderid, c.storeid, c.userid, e."name", e.phone, c."orderDate", c."orderTime", c."takeDate", c."takeTime", c.status, b."foodName", a.quantity, a."unitPrice" from "orderDetail" a, food b, "order" c, store d, member e where c.orderid = $1 and a.foodid = b.foodid and c.orderid = a.orderid and c.orderid = a.orderid and c.userid = e.userid and c.storeid = d.storeid', [orderid])
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
var updateOrder = async function (storeid, orderid, status) {
    //存放結果
    let result;
    //讀取資料庫
    await query('UPDATE "order" SET status=$3 WHERE storeid=$1	AND	orderid=$2 RETURNING orderid, status;', [storeid, orderid, status])
        .then((data) => {
            if (data.rows.length > 0) {
                result = data.rows[0];
            } else {
                result = -1;  //找不到資料
            }
        }, (error) => {
            result = -9;  //執行錯誤
        });
    return result;
}
//未接受訂單改為接受
var fetchacceptOrder = async function (storeid) {
    //存放結果
    let result;
    //讀取資料庫
    await query('select a.orderid, c.storeid, c.userid, e."name", e.phone, c."orderDate", c."orderTime", c."takeDate", c."takeTime", c.status, b."foodName", a.quantity, a."unitPrice" from "orderDetail" a, food b , "order" c , store d , member e where a.foodid = b.foodid and c.orderid in (select orderid from "order" where storeid = $1 and status=$2 LIMIT 10) and c.orderid = a.orderid and c.userid = e.userid and c.storeid = d.storeid ORDER BY "orderDate"desc, "orderTime"', [storeid, '未接單'])
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
var rejectOrder = async function (storeid, orderid) {
    //存放結果
    let result;
    //讀取資料庫
    await query('UPDATE "order" SET status=$5 WHERE storeid=$1	AND	orderid=$2;', [storeid, orderid])
        .then((data) => {
            result = data.rowCount;  //回傳資料數 
        }, (error) => {
            result = -9;  //執行錯誤
        });
    return result;
}
var acceptOrder = async function (storeid, msg3) {
    //存放結果
    let result;
    //讀取資料庫
    await query('UPDATE	"order"	SET	status=$4	WHERE	storeid=$1	AND	orderid=$2	AND	status=$3;', [storeid, msg3, '未接單', '製作中'])
        .then((data) => {
            result = data.rowCount;  //回傳資料數 
        }, (error) => {
            result = -9;  //執行錯誤
        });
    return result;
}
var rejectOrder = async function (storeid, msg3) {
    //存放結果
    let result;
    //讀取資料庫
    await query('UPDATE	"order"	SET	status=$5	WHERE	storeid=$1	AND	orderid=$2	AND	status=$3 OR status=$4;', [storeid, msg3, '未接單', '製作中', '已拒絕'])
        .then((data) => {
            result = data.rowCount;  //回傳資料數 
        }, (error) => {
            result = -9;  //執行錯誤
        });
    return result;
}

var fetchCompletedOrder = async function (storeid) {
    //存放結果
    let result;
    //讀取資料庫
    await query('select a.orderid, c.storeid, c.userid, e."name", e.phone, c."orderDate", c."orderTime", c."takeDate", c."takeTime", c.status, b."foodName", a.quantity, a."unitPrice" from "orderDetail" a, food b , "order" c , store d , member e where a.foodid = b.foodid and c.orderid in (select orderid from "order" where storeid = $1 and status=$2 LIMIT 10) and c.orderid = a.orderid and c.userid = e.userid and c.storeid = d.storeid ORDER BY "orderDate"desc, "orderTime"', [storeid, '製作中'])
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
var completedOrder = async function (storeid, msg3) {
    //存放結果
    let result;
    //讀取資料庫
    await query('UPDATE	"order"	SET	status=$4	WHERE	storeid=$1	AND	orderid=$2	AND	status=$3;', [storeid, msg3, '製作中', '等待取餐'])
        .then((data) => {
            result = data.rowCount;  //回傳資料數 
        }, (error) => {
            result = -9;  //執行錯誤
        });
    return result;
}
var fetchCollectedOrder = async function (storeid) {
    //存放結果
    let result;
    //讀取資料庫
    await query('select a.orderid, c.storeid, c.userid, e."name", e.phone, c."orderDate", c."orderTime", c."takeDate", c."takeTime", c.status, b."foodName", a.quantity, a."unitPrice" from "orderDetail" a, food b , "order" c , store d , member e where a.foodid = b.foodid and c.orderid in (select orderid from "order" where storeid = $1 and status=$2 LIMIT 10) and c.orderid = a.orderid and c.userid = e.userid and c.storeid = d.storeid ORDER BY "orderDate"desc, "orderTime"', [storeid, '等待取餐'])
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


var collectedOrder = async function (storeid, msg2) {
    //存放結果
    let result;
    //讀取資料庫
    await query('UPDATE	"order"	SET	status=$4	WHERE	storeid=$1	AND	orderid=$2	AND	status=$3;', [storeid, msg2, '等待取餐', '已取餐'])
        .then((data) => {
            result = data.rowCount;  //回傳資料數 
        }, (error) => {
            result = -9;  //執行錯誤
        });
    return result;
}
var uncollectedOrder = async function (storeid, msg2) {
    //存放結果
    let result;
    //讀取資料庫
    await query('UPDATE	"order"	SET	status=$4	WHERE	storeid=$1	AND	orderid=$2	AND	status=$3;', [storeid, msg2, '等待取餐', '逾時未取餐'])
        .then((data) => {
            result = data.rowCount;  //回傳資料數 
        }, (error) => {
            result = -9;  //執行錯誤
        });
    return result;
}
//查看所有訂單
// var allOrder = async function (storeid) {
//     //存放結果
//     let result;
//     //讀取資料庫
//     await query('SELECT	"orderid","status" FROM "order"	WHERE  storeid=$1;', [storeid])
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
module.exports = { fetchacceptOrder, fetchCompletedOrder, fetchCollectedOrder, acceptOrder, rejectOrder, completedOrder, collectedOrder, uncollectedOrder, todayOrder, fetchOrderRecord, fetchOrder, updateOrder };