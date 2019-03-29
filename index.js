//----------------------------------------
// 載入必要的模組
//----------------------------------------
var linebot = require('linebot');
var express = require('express');

const member = require('./member');
const student = require('./student');
// const student = require('./student');
//----------------------------------------
// 填入自己在Line Developers的channel值
//----------------------------------------
var bot = linebot({
    channelId: '1553827455',
    channelSecret: '633baa5dafd610ad5bb69a495df003a0',
    channelAccessToken: 'gU+RO41W5nTJOrZrepX2AsvPOO9Qp+oC7eX3pYrcBaSIeD4+kYh30iN375Rh+6hJB5Bk5hotterHhDSF2GNzHC4poNA0i55YXayxMMnsmePMhKqsujJsgOnc+XR5HoAihNYaGwK54qRxD28M2ULx3gdB04t89/1O/w1cDnyilFU='
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
            //使用者傳來的學號
            const userName = profile.displayName;
            const userId = profile.userId;
            const phone = event.message.text;
            const msg = event.message.text;
            var NewArray = new Array();
            var NewArray = msg.split(",");
            var msg1 = NewArray[0];
            var msg2 = NewArray[1];
            

            // event.reply(msg1);
            if(msg1=="會員"){
                if(msg2=="資訊"){
                    // event.reply(userId);
                    member.fetchMember(userId).then(data => {
                        if (data == -1){
                            event.reply('找不到資料');
                        }else if(data == -9){                    
                            event.reply('執行錯誤');
                        }else{


                            event.reply({
                                "type": "template",
                                "altText": "this is a buttons template",
                                "template": {
                                    "type": "buttons",
                                    "actions": [
                                        {
                                        "type": "message",
                                        "label": "修改姓名",
                                        "text": "會員,修改姓名"
                                        },
                                        {
                                        "type": "message",
                                        "label": "修改電話",
                                        "text": "會員,修改電話"
                                        }
                                    ],
                                    "title": "會員資訊",
                                    "text": "姓名 : "+data.name+"\n電話 : "+data.phone
                                }
                            });

                        }
                    })  
                }
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