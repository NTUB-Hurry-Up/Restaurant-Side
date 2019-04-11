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

var status = "";

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
            var msg3 = NewArray[2];

            if (msg1 == "會員") {
                console.log("if1 status: " + status);
                if (msg2 == "資訊") {
                    member.fetchMember(userId).then(data => {
                        if (data == -1) {
                            event.reply('找不到資料');
                        } else if (data == -9) {
                            event.reply('執行錯誤');
                        } else {
                            const template = temp.temp1.template;
                            template.actions[0].type = "message";
                            template.actions[0].label = "修改姓名";
                            template.actions[0].text = "會員,修改姓名";

                            template.actions[1].type = "message";
                            template.actions[1].label = "修改電話";
                            template.actions[1].text = "會員,修改電話";
                            template.title = "會員資訊"
                            template.text = "姓名 : " + data.name + "\n電話 : " + data.phone
                            event.reply(temp.temp1);
                        }
                    })
                } else if (msg2 == "修改姓名") {
                    status = "進入修改姓名程序";
                    event.reply('請輸入您的姓名');

                } else if (msg2 == "修改電話") {
                    status = "進入修改電話程序";
                    event.reply('請輸入您的電話\nex: 09xxxxxxxx');
                }
            } else if (msg1 == "店家") {
                if (msg2 == "資訊") {
                    store.fetchStore().then(data => {
                        if (data == -1) {
                            event.reply('找不到資料');
                        } else if (data == -9) {
                            event.reply('執行錯誤');
                        } else {
                            var arr = [];
                            // var o = temp.temp_store_contents
                            arr.push(temp.temp_store);
                            console.log("first-> arr: " + arr.length)

                            for (var i = 0; i < data.length; i++) {
                                // (function(o){
                                //     o.body.contents[0].text=data[i].storeName;
                                //     o.body.contents[1].contents[0].contents[1].text=data[i].storeAdd;
                                //     o.body.contents[1].contents[1].contents[1].text=data[i].storeTel;
                                //     arr[0].contents.contents.push(o);
                                // })(Object.assign({}, o));

                                arr[0].contents.contents.push({
                                    "type": "bubble",
                                    "hero": {
                                        "type": "image",
                                        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                                        "size": "full",
                                        "aspectRatio": "20:13",
                                        "aspectMode": "cover",
                                        "action": {
                                            "type": "uri",
                                            "label": "Line",
                                            "uri": "https://linecorp.com/"
                                        }
                                    },
                                    "body": {
                                        "type": "box",
                                        "layout": "vertical",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": data[i].storeName,
                                                "size": "xl",
                                                "weight": "bold"
                                            },
                                            {
                                                "type": "box",
                                                "layout": "vertical",
                                                "spacing": "sm",
                                                "margin": "lg",
                                                "contents": [
                                                    {
                                                        "type": "box",
                                                        "layout": "baseline",
                                                        "spacing": "sm",
                                                        "contents": [
                                                            {
                                                                "type": "text",
                                                                "text": "Place",
                                                                "flex": 1,
                                                                "size": "sm",
                                                                "color": "#AAAAAA"
                                                            },
                                                            {
                                                                "type": "text",
                                                                "text": data[i].storeAdd,
                                                                "flex": 5,
                                                                "size": "sm",
                                                                "color": "#666666",
                                                                "wrap": true
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "box",
                                                        "layout": "baseline",
                                                        "spacing": "sm",
                                                        "contents": [
                                                            {
                                                                "type": "text",
                                                                "text": "Tel",
                                                                "flex": 1,
                                                                "size": "sm",
                                                                "color": "#AAAAAA"
                                                            },
                                                            {
                                                                "type": "text",
                                                                "text": data[i].storeTel,
                                                                "flex": 5,
                                                                "size": "sm",
                                                                "color": "#666666",
                                                                "wrap": true
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    "footer": {
                                        "type": "box",
                                        "layout": "vertical",
                                        "flex": 0,
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "button",
                                                "action": {
                                                    "type": "message",
                                                    "label": "查看菜單",
                                                    "text": "店家,查看菜單," + data[i].storeid
                                                },
                                                "height": "sm",
                                                "style": "link"
                                            },
                                            {
                                                "type": "button",
                                                "action": {
                                                    "type": "message",
                                                    "label": "聯絡店家",
                                                    "text": "店家,聯絡店家," + data[i].storeid
                                                },
                                                "height": "sm",
                                                "style": "link"
                                            },
                                            {
                                                "type": "spacer",
                                                "size": "sm"
                                            }
                                        ]
                                    }

                                });

                            }
                            event.reply(arr[0]);
                            arr[0].contents.contents.length = 0;
                            arr.length = 0;
                            data.length = 0;
                        }
                    })
                } else if (msg2 == "查看菜單") {
                    store.fetchStorefood(msg3).then(data => {
                        if (data == -1) {
                            event.reply('找不到資料');
                        } else if (data == -9) {
                            event.reply('執行錯誤');
                        } else {
                            var arr2 = [];
                            arr2.push(temp.temp_menu);
                            for (var i = 0; i < data.length; i++) {
                                console.log(data[i].foodid+" "+data[i].foodPrice+" "+data[i].foodName)
                            arr2[0].contents.contents.push({

                                "type": "bubble",
                                "hero": {
                                    "type": "image",
                                    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_2_restaurant.png",
                                    "size": "full",
                                    "aspectRatio": "20:13",
                                    "aspectMode": "cover",
                                    "action": {
                                        "type": "uri",
                                        "label": "Action",
                                        "uri": "https://linecorp.com"
                                    }
                                },
                                "body": {
                                    "type": "box",
                                    "layout": "vertical",
                                    "spacing": "md",
                                    "action": {
                                        "type": "uri",
                                        "label": "Action",
                                        "uri": "https://linecorp.com"
                                    },
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": data[i].foodid,
                                            "size": "xl",
                                            "weight": "bold"
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "spacing": "sm",
                                            "contents": [
                                                {
                                                    "type": "box",
                                                    "layout": "baseline",
                                                    "contents": [
                                                        {
                                                            "type": "icon",
                                                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/restaurant_regular_32.png"
                                                        },
                                                        {
                                                            "type": "text",
                                                            "text": data[i].foodPrice,
                                                            "flex": 0,
                                                            "margin": "sm",
                                                            "weight": "bold"
                                                        },
                                                        {
                                                            "type": "text",
                                                            "text": "400kcl",
                                                            "size": "sm",
                                                            "align": "end",
                                                            "color": "#AAAAAA"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "type": "box",
                                                    "layout": "baseline",
                                                    "contents": [
                                                        {
                                                            "type": "icon",
                                                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/restaurant_large_32.png"
                                                        },
                                                        {
                                                            "type": "text",
                                                            "text": "$15.5",
                                                            "flex": 0,
                                                            "margin": "sm",
                                                            "weight": "bold"
                                                        },
                                                        {
                                                            "type": "text",
                                                            "text": "550kcl",
                                                            "size": "sm",
                                                            "align": "end",
                                                            "color": "#AAAAAA"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "type": "text",
                                            "text": "Sauce, Onions, Pickles, Lettuce & Cheese",
                                            "size": "xxs",
                                            "color": "#AAAAAA",
                                            "wrap": true
                                        }
                                    ]
                                },
                                "footer": {
                                    "type": "box",
                                    "layout": "vertical",
                                    "contents": [
                                        {
                                            "type": "spacer",
                                            "size": "xxl"
                                        },
                                        {
                                            "type": "button",
                                            "action": {
                                                "type": "uri",
                                                "label": "Add to Cart",
                                                "uri": "https://linecorp.com"
                                            },
                                            "color": "#905C44",
                                            "style": "primary"
                                        }
                                    ]
                                }
                            })
                            }
                            event.reply(arr2[0]);
                            arr2[0].contents.contents.length = 0;
                            arr2.length = 0;
                            data.length = 0;
                        }
                    })
                } else if (msg2 == "聯絡店家") {

                }
            } else if (status != "") {
                if (status == "進入修改電話程序") {
                    status = "";
                    member.UpdatePhone(msg, userId).then(data => {
                        if (data == -1) {
                            event.reply('找不到資料');
                        } else if (data == -9) {
                            event.reply('執行錯誤');
                        } else {
                            event.reply('電話已修改完成');
                        }
                    })
                } else if (status == "進入修改姓名程序") {
                    status = "";
                    member.UpdateName(msg, userId).then(data => {
                        if (data == -1) {
                            event.reply('找不到資料');
                        } else if (data == -9) {
                            event.reply('執行錯誤');
                        } else {
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