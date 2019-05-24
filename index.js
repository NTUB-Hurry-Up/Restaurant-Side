//----------------------------------------
// 載入必要的模組
//----------------------------------------
var linebot = require('linebot');
var express = require('express');
var lodash = require('lodash');
//----------------------------------------
const member = require('./member');
const order = require('./order');
const store = require('./store');
const food = require('./food');
const temp = require('./temp');
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
                    event.reply('已加入會員');
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
            const storeid = profile.userId;
            const msg = event.message.text;
            var NewArray = new Array();
            var NewArray = msg.split(",");
            var msg1 = NewArray[0];
            var msg2 = NewArray[1];
            var msg3 = NewArray[2];
            var msg4 = NewArray[3];
            var msg5 = NewArray[4];
            var msg6 = NewArray[5];
            var msg7 = NewArray[6];
            var msg8 = NewArray[7];
            console.log(msg1 + ";" + msg2 + ";" + msg3 + ";" + msg4 + ";" + msg5)
            //----------------------------------------     
            var today = new Date();
            Date.prototype.addDays = function (days) {
                this.setDate(this.getDate() + days);
                return this;
            }
            var cHours = '';
            if (today.getHours() + 8 >= 24) {
                cHours = (today.getHours() + 8 - 24 < 10 ? '0' : '') + (today.getHours() + 8 - 24);
                today.addDays(1);
            } else {
                cHours = (today.getHours() + 8 < 10 ? '0' : '') + (today.getHours() + 8);
            }
            var cMonth = (today.getMonth() + 1 < 10 ? '0' : '') + (today.getMonth() + 1);
            var cDay = (today.getDate() < 10 ? '0' : '') + today.getDate();
            var cMinutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
            var cSecond = (today.getSeconds() < 10 ? '0' : '') + today.getMinutes();
            //----------------------------------------           
            // if (msg1 == "A") {
            //     var arr = [];
            //     arr.push(lodash.cloneDeep(temp.temp_order))
            //     for (var i = 0; i <= 2; i++) {
            //         arr[0].contents.contents[i] = lodash.cloneDeep(temp.temp_order_repeat)
            //         arr[0].contents.contents[i].body.contents[0].text = i + "";
            //         for (var j = 0; j < 5; j++) {
            //             arr[0].contents.contents[i].body.contents[7].contents[j + 2] = lodash.cloneDeep(temp.temp_orderDeatail_repeat)
            //             arr[0].contents.contents[i].body.contents[7].contents[j + 2].contents[1].contents[0].text = j + ""
            //         }
            //     }
            //     event.reply(arr)
            // }
            //----------------------------------------        
            if (msg1 == "訂單") {
                if (msg2 == "訂單查詢") {
                    order.fetchOrder(storeid, msg3).then(data => {
                        if (data == -1) event.reply('找不到資料');
                        else if (data == -9) event.reply('執行錯誤');
                        else {
                            var arr = [];
                            arr.push(lodash.cloneDeep(temp.temp_acceptOrder))
                            for (var i = 0; i < data.length; i++) {
                                // console.log(data[i].orderid);
                                console.log(data[i].foodName)
                                console.log(data[i].amount)
                                console.log(data.price)
                                arr[0].contents.contents[i] = lodash.cloneDeep(temp.temp_acceptOrder_repeat)
                                arr[0].contents.contents[i].body.contents[1].contents[1].text = data[i].orderid;
                                arr[0].contents.contents[i].body.contents[2].contents[1].text = (data[i].takeDate).getFullYear()+"-"+(data[i].takeDate).getMonth()+"-"+(data[i].takeDate).getDate();
                                arr[0].contents.contents[i].body.contents[2].contents[2].text = data[i].takeTime.substring(0,5);
                                arr[0].contents.contents[i].body.contents[3].contents[1].text = data[i].name;
                                arr[0].contents.contents[i].body.contents[4].contents[1].text = data[i].phone;
                                for (var j = 0; j <data.length; j++) {
                                    arr[0].contents.contents[i].body.contents[7].contents[j + 1] = lodash.cloneDeep(temp.temp_acceptOrder_detail_repeat)
                                    arr[0].contents.contents[i].body.contents[7].contents[j + 1].contents[0].text =data[i].foodName;
                                    // arr[0].contents.contents[i].body.contents[7].contents[j + 2].contents[1].text =data[i].amount;
                                    // arr[0].contents.contents[i].body.contents[7].contents[j + 2].contents[2].text =data[i].price;


                                }
                            }
                            event.reply(arr)
                        }

                    })
                } else if (msg2 == "接受訂單") {
                    order.acceptOrder(storeid, msg3).then(data => {
                        if (data == -9) event.reply('執行錯誤');
                        else event.reply('已接單');
                    })
                } else if (msg2 == "拒絕訂單") {
                    order.rejectOrder(storeid, msg3).then(data => {
                        if (data == -9) event.reply('執行錯誤');
                        else event.reply('已拒絕');
                    })
                } else if (msg2 == "完成製作") {
                    order.completedOrder(storeid, msg3).then(data => {
                        if (data == -9) event.reply('執行錯誤');
                        else event.reply('執行完成');
                    })
                } else if (msg2 == "已取餐") {
                    order.collectedOrder(storeid, msg3).then(data => {
                        if (data == -9) event.reply('執行錯誤');
                        else event.reply('完成了一筆訂單');
                    })
                } else if (msg2 == "所有訂單") {
                    order.allOrder(storeid).then(data => {
                        if (data == -1) event.reply('找不到資料');
                        else if (data == -9) event.reply('執行錯誤');
                        else {
                            for (var i = 0; i < data.length; i++) {
                                console.log(data[i].orderid + "，" + data[i].status);
                            }
                        }
                    })
                } else if (msg2 == "今日訂單") {
                    fetchDate = today.getFullYear() + "-" + cMonth + "-" + cDay
                    fetchTime = cHours + ":" + cMinutes + ":" + cSecond
                    console.log(fetchDate + " " + fetchTime)
                    order.todayOrder(storeid, fetchDate, fetchTime).then(data => {
                        if (data == -1) event.reply('找不到資料');
                        else if (data == -9) event.reply('執行錯誤');
                        else {
                            for (var i = 0; i < data.length; i++) {
                                console.log(data[i].orderid);
                            }
                        }
                    })
                }
            }
            //----------------------------------------     
            if (msg1 == "店家資訊") {
                if (msg2 == "查看資訊") {
                    store.fetchStoreinfo(storeid).then(data => {
                        if (data == -1) event.reply('找不到資料');
                        else if (data == -9) event.reply('執行錯誤');
                        else {
                            for (var i = 0; i < data.length; i++) {
                                console.log("店名:" + data[i].storeName + "\n地址:" + data[i].storeAdd + "\n電話:" + data[i].storeTel);
                            }
                        }
                    })
                }
                else if (msg2 == "更改資訊") {
                    if (msg3 == "更改店名") {
                        store.updateStorename(storeid, msg4).then(data => {
                            if (data == -9) event.reply('執行錯誤');
                            else event.reply('修改完成');
                        })
                    } else if (msg3 == "更改地址") {
                        store.updateStoreAdd(storeid, msg4).then(data => {
                            if (data == -9) event.reply('執行錯誤');
                            else event.reply('修改完成');
                        })
                    } else if (msg3 == "更改電話") {
                        store.updateStoreTel(storeid, msg4).then(data => {
                            if (data == -9) event.reply('執行錯誤');
                            else event.reply('修改完成');
                        })
                    }
                }
            }
            //----------------------------------------   
            if (msg1 == "店家菜單") {
                if (msg2 == "查詢菜單") {
                    food.fetchStoreFood(storeid).then(data => {
                        if (data == -1) event.reply('找不到資料');
                        else if (data == -9) event.reply('執行錯誤');
                        else {
                            for (var i = 0; i < data.length; i++) {
                                console.log(data[i].foodName + "，" + data[i].foodPrice + "元");
                            }
                        }
                    })
                }
                else if (msg2 = "更改菜單") {
                    if (msg3 == '新增餐點') {
                        var foodid, foodName, foodPrice, foodImg, isSale;
                        foodid = msg4;
                        foodName = msg5;
                        foodPrice = msg6;
                        foodImg = msg7;
                        isSale = msg8;
                        food.addFood(foodid, foodName, foodPrice, foodImg, isSale, storeid).then(data => {
                            console.log(foodid + ";" + foodName + ";" + foodPrice + ";" + isSale + ";" + storeid)
                            if (data == -9) {
                                console.log('執行錯誤');
                            } else {
                                console.log('已增加' + data + '筆記錄');
                            }
                        })
                    }
                    if (msg3 == "更改菜名") {
                        food.updateFoodName(storeid, msg4, msg5).then(data => {
                            if (data == -9) event.reply('執行錯誤');
                            else event.reply('修改完成');
                        })
                    } else if (msg3 == "更改價錢") {
                        food.updateFoodPrice(storeid, msg4, msg5).then(data => {
                            if (data == -9) event.reply('執行錯誤');
                            else event.reply('修改完成');
                        })
                    } else if (msg3 == "上架餐點") {
                        food.launchedFood(storeid, msg4).then(data => {
                            if (data == -9) event.reply('執行錯誤');
                            else event.reply('修改完成');
                        })
                    } else if (msg3 == "下架餐點") {
                        food.retractFood(storeid, msg4).then(data => {
                            if (data == -9) event.reply('執行錯誤');
                            else event.reply('修改完成');
                        })
                    }
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