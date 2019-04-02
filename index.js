//----------------------------------------
// 載入必要的模組
//----------------------------------------
var linebot = require('linebot');
var express = require('express');

const member = require('./member');
const store = require('./store');
const temp = require('./temp');
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

var states = "";

bot.on('message', function (event) {
    event.source.profile().then(
        function (profile) {
            const userName = profile.displayName;
            const userId = profile.userId;
            const phone = event.message.text;
            const msg = event.message.text;
            var NewArray = new Array();
            var NewArray = msg.split(",");
            var msg1 = NewArray[0];
            var msg2 = NewArray[1];

            if(msg1=="會員"){
                console.log("if1 states: "+states);
                if(msg2=="資訊"){
                    member.fetchMember(userId).then(data => {
                        if (data == -1){
                            event.reply('找不到資料');
                        }else if(data == -9){                    
                            event.reply('執行錯誤');
                        }else{
                            const template = temp.temp1.template;
                            template.actions[0].type="message";
                            template.actions[0].label="修改姓名";
                            template.actions[0].text="會員,修改姓名";

                            template.actions[1].type="message";
                            template.actions[1].label="修改電話";
                            template.actions[1].text="會員,修改電話";
                            template.title="會員資訊"
                            template.text="姓名 : "+data.name+"\n電話 : "+data.phone
                            event.reply(temp.temp1);
                        }
                    })
                }else if(msg2=="修改姓名"){
                    states="進入修改姓名程序";
                    event.reply('請輸入您的姓名');  

                }else if(msg2=="修改電話"){
                    states="進入修改電話程序";
                    event.reply('請輸入您的電話\nex: 09xxxxxxxx');                    
                }
            }else if(msg1=="店家"){
                if(msg2=="資訊"){
                    store.fetchStore().then(data => {
                        var arr=[]
                        if (data == -1){
                            event.reply('找不到資料');
                        }else if(data == -9){                    
                            event.reply('執行錯誤');
                        }else{
                            data.forEach(m => {
                                // console.log(m.storeid);
                                arr.push(temp.temp_store);
                                temp.temp_store.contents.body.contents[0].text=m.storeName,
                                temp.temp_store.contents.body.contents[1].contents[0].contents[1].text=m.storeAdd,
                                temp.temp_store.contents.body.contents[1].contents[1].contents[1].text=m.storeTel
                                console.log("wertyu"+m);
                                console.log();
                            })
                        }
                        event.reply(arr);
                    })
                }
            }else if(states != ""){
                if(states=="進入修改電話程序"){
                    states="";
                    member.UpdatePhone(msg, userId).then(data => {
                        if (data == -1){
                            event.reply('找不到資料');
                        }else if(data == -9){
                            event.reply('執行錯誤');
                        }else{
                            event.reply('電話已修改完成');
                        }
                    })
                }else if(states=="進入修改姓名程序"){
                    states="";
                    member.UpdateName(msg, userId).then(data => {
                        if (data == -1){
                            event.reply('找不到資料');
                        }else if(data == -9){
                            event.reply('執行錯誤');
                        }else{
                            event.reply('姓名已修改完成');
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