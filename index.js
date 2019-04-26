//----------------------------------------
// 載入必要的模組
//----------------------------------------
var linebot = require('linebot');
var express = require('express');

const member = require('./member');
const order = require('./order');
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
bot.on('follow', function (event) {
    event.source.profile().then(
        function (profile) {
            //取得使用者資料
            const userId = profile.userId;
            const userName = profile.displayName;
            //呼叫API, 將使用者資料寫入資料庫
            member.addMember(userId, userName).then(data => {
                if (data == -9) {
                    event.reply('執行錯誤');
                } else {
                    event.reply('已加入會員, 廢物 !');
                }
            })
        }
    );
});
// --------------------------------
// 機器人接受訊息的處理
// --------------------------------
bot.on('message', function (event) {
    event.source.profile().then(
        function (profile) {
            // const userName = profile.displayName;
            const storeId = profile.userId;
            const orderId = event.message.text;
            const msg = event.message.text;
            var NewArray = new Array();
            var NewArray = msg.split(",");
            var msg1 = NewArray[0];
            var msg2 = NewArray[1];
            var msg3 = NewArray[2];
            console.log(msg1+", "+msg2+", "+msg3);
            if(msg1=="訂單"){
                if(msg2=="訂單查詢"){
                    order.fetchOrder(storeId, msg3).then(data => {
                        if (data == -1) {
                            event.reply('找不到資料');
                        } else if (data == -9) {
                            event.reply('執行錯誤');
                        }
                        else{
                            for(var i = 0; i<data.length; i++){
                                console.log(data[i].orderid);
                            }
                        }
                    })
                }else if(msg2=="接受訂單"){
                    order.AccpetOrder(orderId).then(data => {
                        if (data == -1) {
                            event.reply('找不到資料');
                        } else if (data == -9) {
                            event.reply('執行錯誤');
                        }
                        else{
                            event.reply('已接單');
                        }
                    })
                }
                // }else if(msg2=="完成訂單"){
                //     order.CollectedOrder(storeId,msg3).then(data => {
                //         if (data == -1) {
                //             event.reply('找不到資料');
                //         } else if (data == -9) {
                //             event.reply('執行錯誤');
                //         }
                //         else{
                //             for(var i = 0; i<data.length; i++){
                //                 console.log(data[i].orderid)
                //             }
                //         }
                //     })
                // }
            
            }

        }
    );
});

//--------------------------------
// 使用者封鎖群組
//--------------------------------
bot.on('unfollow', function (event) {
    //取得使用者資料
    const userId = event.source.userId;

    //呼叫API, 將使用者資料刪除
    member.deleteMember(userId).then(data => {
        if (data == -9) {
            event.reply('執行錯誤');    //會員已封鎖群組, 本訊息無法送達
        } else {
            event.reply('已退出會員');  //會員已封鎖群組, 本訊息無法送達
        }
    });
});


//----------------------------------------
// 建立一個網站應用程式app
// 如果連接根目錄, 交給機器人處理
//----------------------------------------
const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);


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