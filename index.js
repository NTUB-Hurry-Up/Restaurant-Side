//----------------------------------------
// 載入必要的模組
//----------------------------------------
var linebot = require('linebot');
var express = require('express');
var lodash = require('lodash');
//----------------------------------------
const member = require('./member');
// const store = require('./store');
// const food = require('./food');
// const order = require('./store_route/route_order');
// const temp = require('./store_view/view_temp');
const store_orderRecord = require('./store/view/order/view_orderRecord');
const store_updateOrder = require('./store/view/order/view_updateOrder');
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
            console.log(storeid+";"+msg1 + ";" + msg2 + ";" + msg3 + ";" + msg4 )
            //----------------------------------------                         
            if (msg1 == "訂單") {
                if (msg2 == "查詢") {
                    if (msg3 == "未接受的訂單") { store_orderRecord.orderRecord(event, storeid, "未接單", lodash) }
                    else if (msg3 == "製作中的訂單") { store_orderRecord.orderRecord(event, storeid, "製作中", lodash) }
                    else if (msg3 == "等待取餐的訂單") { store_orderRecord.orderRecord(event, storeid, "等待取餐", lodash) }
                    else if (msg3 == "已取餐的訂單") { store_orderRecord.orderRecord(event, storeid, "已取餐", lodash) }
                    else if (msg3 == "已拒絕的訂單") { store_orderRecord.orderRecord(event, storeid, "已拒絕", lodash) }
                    else if (msg3 == "今日訂單") { store_orderRecord.orderRecord(event, storeid, "今日訂單", lodash) }
                } else if (msg2 == "更新進度") {
                    if (msg3 == "接單" || msg3 == "拒絕" || msg3 == "等待取餐" || msg3 == "已取餐" || msg3 == "逾時未取餐") {
                        var orderid = msg4
                        var new_status = msg3
                        store_updateOrder.updateOrder(event, storeid, new_status, orderid, lodash)
                    }
                }
            } /*else if (msg1 == "店家資訊") {
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
                } else if (msg2 == "更改資訊") {
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
            } else if (msg1 == "店家菜單") {
                if (msg2 == "查詢菜單") {
                    food.fetchStoreFood(storeid).then(data => {
                        console.log("storeid-->" + storeid)
                        if (data == -1) { event.reply('找不到資料'); }
                        else if (data == -9) { event.reply('執行錯誤'); }
                        else {
                            var arr = []
                            arr.push(lodash.cloneDeep(temp.temp_menu))
                            for (var i = 0; i < data.length; i++) {
                                console.log(data[i].foodName + "，" + data[i].foodPrice + "元");
                                arr[0].contents.contents[i] = lodash.cloneDeep(temp.temp_menu_repeat)
                                // if(data[i].foodimg != null ){arr[0].contents.contents[i].hero.url = data[i].foodimg}
                                arr[0].contents.contents[i].body.contents[0].text = data[i].foodName
                                arr[0].contents.contents[i].body.contents[1].contents[0].contents[1].text = "NT$" + data[i].foodPrice
                            }
                            event.reply(arr)
                        }
                    })
                } else if (msg2 = "編輯菜單") {
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
                    } else if (msg3 == "更改菜名") {
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
            }*/
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