//----------------------------------------
// 載入必要的模組
//----------------------------------------
var linebot = require('linebot');
var express = require('express');
var lodash = require('lodash');
//----------------------------------------
const store_orderRecord = require('./store/view/order/store_orderRecord');
const store_updateOrder = require('./store/view/order/store_updateOrder');
const store_notice = require('./store/view/order/store_notice');
const newOrder = require('./store/view/order/newOrder');

//----------------------------------------
// 填入自己在Line Developers的channel值
//----------------------------------------
var bot = linebot({
    channelId: '1558114146',
    channelSecret: '6a07366d229e7d52f7a6a1a4df0226d8',
    channelAccessToken: '8whZWyp4LQnorg+9GvDs1zVnVFDq+USCtprVzJweXyjXa4uvKYzHuY4DbrQKvIu2JXYIHEuBL73kjyl3P4Vdv41Y4eQGJfljEZbDbfA6BN2vtfCx8RM3OvPAGCgK+rlmiLu3NLoznk3mRbIDyG9MxAdB04t89/1O/w1cDnyilFU='
});
//--------------------------------
// 使用者加入群組或解除封鎖
//--------------------------------
// bot.on('follow', function (event) {
//     event.source.profile().then(
//         function (profile) {
//             //取得使用者資料
//             const userId = profile.userId;
//             const userName = profile.displayName;
//             //呼叫API, 將使用者資料寫入資料庫
//             member.addMember(userId, userName).then(data => {
//                 if (data == -9) {
//                     event.reply('執行錯誤');
//                 } else {
//                     event.reply('已加入會員');
//                 }
//             })
//         }
//     );
// });
// --------------------------------
// 機器人接受訊息的處理
// --------------------------------
bot.on('message', function (event) {
    event.source.profile().then(
        function (profile) {
            // const userName = profile.displayName;
            const storeid = profile.userId;
            const msg = event.message.text;
            var NewArray = new Array();
            var NewArray = msg.split(",");
            var msg1 = NewArray[0];
            var msg2 = NewArray[1];
            var msg3 = NewArray[2];
            var msg4 = NewArray[3];
            console.log(storeid + ";" + msg1 + ";" + msg2 + ";" + msg3 + ";" + msg4)
            //----------------------------------------          
            if (msg1 == "訂單") {
                if (msg2 == "查詢" && (msg3 == "未接單" || msg3 == "製作中" || msg3 == "等待取餐" || msg3 == "已取餐" || msg3 == "已拒絕" || msg3 == "今日訂單")) {
                    var order_status = msg3
                    store_orderRecord.orderRecord(event, storeid, order_status, lodash)
                } else if (msg2 == "更新進度" && (msg3 == "接單" || msg3 == "拒絕" || msg3 == "等待取餐" || msg3 == "已取餐" || msg3 == "逾時未取餐")) {
                    var orderid = msg4
                    var new_status = msg3
                    store_updateOrder.updateOrder(event, storeid, new_status, orderid, lodash)
                } else if (msg2 == "提醒顧客取餐") {
                    store_notice.noticeCus(event, storeid, msg3, lodash)
                }
            }
        }
    );
});
//--------------------------------
// 使用者封鎖群組
//--------------------------------
// bot.on('unfollow', function (event) {
//     //取得使用者資料
//     const userId = event.source.userId;

//     //呼叫API, 將使用者資料刪除
//     member.deleteMember(userId).then(data => {
//         if (data == -9) {
//             event.reply('執行錯誤');    //會員已封鎖群組, 本訊息無法送達
//         } else {
//             event.reply('已退出會員');  //會員已封鎖群組, 本訊息無法送達
//         }
//     });
// });
//----------------------------------------
// 建立一個網站應用程式app
// 如果連接根目錄, 交給機器人處理
//----------------------------------------
const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);
app.get('/orderComplete', function (req, res) {
    res.send('OK');
    console.log(req.query.orderid);
    newOrder.newOrder(req.query.orderid)
});
app.get('/LP_noticeStore', function (req, res) {
    res.send('OK');
    console.log(req.query.orderid+", "+req.query.transactionId);
    LP_noticeStore.LP_noticeStore(req.query.orderid, req.query.transactionId)
});
//----------------------------------------
// 可直接取用檔案的資料夾
//----------------------------------------
app.use(express.static('public'));
//----------------------------------------
// 監聽3000埠號, 
// 或是監聽Heroku設定的埠號
//----------------------------------------
var server = app.listen(process.env.PORT || 3000, function () {
    const port = server.address().port;
    console.log("正在監聽埠號:", port);
});