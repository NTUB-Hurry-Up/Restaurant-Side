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
            if (msg1 == "訂單") {
                if (msg2 == "未接受訂單") {
                    order.fetchacceptOrder(storeid).then(data => {
                        if (data == -1) event.reply('找不到資料');
                        else if (data == -9) event.reply('執行錯誤');
                        else {
                            var order_id = ''
                            var ocnt = -1
                            var totalPrice = 0
                            var arr = []
                            arr.push(lodash.cloneDeep(temp.temp_acceptOrder))
                            for (var i = 0; i < data.length; i++) {
                                if (order_id != data[i].orderid) {
                                    ocnt++
                                    console.log("!=================" + data[i].orderid);
                                    arr[0].contents.contents[ocnt] = lodash.cloneDeep(temp.temp_acceptOrder_repeat)
                                    arr[0].contents.contents[ocnt].body.contents[0].text = data[i].status
                                    arr[0].contents.contents[ocnt].body.contents[0].color = '#7BC5FE'
                                    arr[0].contents.contents[ocnt].body.contents[1].contents[1].text = data[i].orderid
                                    var orderMonth = ((data[i].orderDate).getMonth() + 1 < 10 ? '0' : '') + ((data[i].orderDate).getMonth() + 1)
                                    var orderDate = ((data[i].orderDate).getDate() < 10 ? '0' : '') + (data[i].orderDate).getDate()
                                    arr[0].contents.contents[ocnt].body.contents[2].contents[1].text = (data[i].orderDate).getFullYear() + "-" + orderMonth + "-" + orderDate
                                    arr[0].contents.contents[ocnt].body.contents[2].contents[2].text = data[i].orderTime.substring(0, 5)

                                    var takeMonth = ((data[i].takeDate).getMonth() + 1 < 10 ? '0' : '') + ((data[i].takeDate).getMonth() + 1)
                                    var takeDate = ((data[i].takeDate).getDate() < 10 ? '0' : '') + (data[i].takeDate).getDate()
                                    arr[0].contents.contents[ocnt].body.contents[3].contents[1].text = (data[i].takeDate).getFullYear() + "-" + takeMonth + "-" + takeDate
                                    arr[0].contents.contents[ocnt].body.contents[3].contents[2].text = data[i].takeTime.substring(0, 5)
                                    arr[0].contents.contents[ocnt].body.contents[4].contents[1].text = data[i].name
                                    arr[0].contents.contents[ocnt].body.contents[5].contents[1].text = data[i].phone

                                    arr[0].contents.contents[ocnt].footer.contents[1].action.label = "接單"
                                    arr[0].contents.contents[ocnt].footer.contents[1].action.text = "訂單,接單," + data[i].orderid
                                    arr[0].contents.contents[ocnt].footer.contents[2].action.label = "拒絕"
                                    arr[0].contents.contents[ocnt].footer.contents[2].action.text = "訂單,拒絕," + data[i].orderid
                                    order_id = data[i].orderid
                                    totalPrice = 0
                                }
                                var tempRe = lodash.cloneDeep(temp.temp_acceptOrder_detail_repeat)
                                tempRe.contents[0].text = data[i].foodName
                                tempRe.contents[1].text = data[i].quantity
                                tempRe.contents[2].text = data[i].unitPrice
                                arr[0].contents.contents[ocnt].body.contents.push(tempRe)
                                totalPrice += data[i].unitPrice * data[i].quantity
                                arr[0].contents.contents[ocnt].footer.contents[0].contents[1].text = "總價 :" + totalPrice
                            }
                            event.reply(arr)
                        }
                    })
                } else if (msg2 == "完成製作") {
                    order.fetchCompletedOrder(storeid).then(data => {
                        if (data == -9) event.reply('執行錯誤');
                        else {
                            var order_id = ''
                            var ocnt = -1
                            var totalPrice = 0
                            var arr = []
                            arr.push(lodash.cloneDeep(temp.temp_acceptOrder))
                            for (var i = 0; i < data.length; i++) {
                                if (order_id != data[i].orderid) {
                                    ocnt++
                                    console.log("!=================" + data[i].orderid);
                                    arr[0].contents.contents[ocnt] = lodash.cloneDeep(temp.temp_acceptOrder_repeat)
                                    arr[0].contents.contents[ocnt].body.contents[0].text = data[i].status
                                    arr[0].contents.contents[ocnt].body.contents[0].color = '#7BC5FE'
                                    arr[0].contents.contents[ocnt].body.contents[1].contents[1].text = data[i].orderid
                                    var orderMonth = ((data[i].orderDate).getMonth() + 1 < 10 ? '0' : '') + ((data[i].orderDate).getMonth() + 1)
                                    var orderDate = ((data[i].orderDate).getDate() < 10 ? '0' : '') + (data[i].orderDate).getDate()
                                    arr[0].contents.contents[ocnt].body.contents[2].contents[1].text = (data[i].orderDate).getFullYear() + "-" + orderMonth + "-" + orderDate
                                    arr[0].contents.contents[ocnt].body.contents[2].contents[2].text = data[i].orderTime.substring(0, 5)

                                    var takeMonth = ((data[i].takeDate).getMonth() + 1 < 10 ? '0' : '') + ((data[i].takeDate).getMonth() + 1)
                                    var takeDate = ((data[i].takeDate).getDate() < 10 ? '0' : '') + (data[i].takeDate).getDate()
                                    arr[0].contents.contents[ocnt].body.contents[3].contents[1].text = (data[i].takeDate).getFullYear() + "-" + takeMonth + "-" + takeDate
                                    arr[0].contents.contents[ocnt].body.contents[3].contents[2].text = data[i].takeTime.substring(0, 5)
                                    arr[0].contents.contents[ocnt].body.contents[4].contents[1].text = data[i].name
                                    arr[0].contents.contents[ocnt].body.contents[5].contents[1].text = data[i].phone
                                    arr[0].contents.contents[ocnt].footer.contents[1].action.label = "完成製作"
                                    arr[0].contents.contents[ocnt].footer.contents[1].action.text = "訂單,完成," + data[i].orderid
                                    arr[0].contents.contents[ocnt].footer.contents[2].action.label = "取消接單"
                                    arr[0].contents.contents[ocnt].footer.contents[2].action.text = "訂單,取消接單," + data[i].orderid
                                    order_id = data[i].orderid
                                    totalPrice = 0
                                }
                                var tempRe = lodash.cloneDeep(temp.temp_acceptOrder_detail_repeat)
                                tempRe.contents[0].text = data[i].foodName
                                tempRe.contents[1].text = data[i].quantity
                                tempRe.contents[2].text = data[i].unitPrice
                                arr[0].contents.contents[ocnt].body.contents.push(tempRe)
                                totalPrice += data[i].unitPrice * data[i].quantity
                                arr[0].contents.contents[ocnt].footer.contents[0].contents[1].text = "總價 :" + totalPrice
                            }
                            event.reply(arr)
                        }
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
                    console.log(storeid)
                    console.log(fetchDate + " " + fetchTime)
                    order.todayOrder(storeid, fetchDate).then(data => {
                        if (data == -1) event.reply('找不到資料');
                        else if (data == -9) event.reply('執行錯誤');
                        else {
                            var order_id = ''
                            var ocnt = -1
                            var totalPrice = 0
                            var arr = []
                            arr.push(lodash.cloneDeep(temp.temp_fetchOrder))
                            for (var i = 0; i < data.length; i++) {
                                if (order_id != data[i].orderid) {
                                    ocnt++
                                    console.log("!=================" + data[i].orderid);
                                    arr[0].contents.contents[ocnt] = lodash.cloneDeep(temp.temp_fetchOrder_repeat)
                                    arr[0].contents.contents[ocnt].body.contents[0].text = data[i].status
                                    arr[0].contents.contents[ocnt].body.contents[1].contents[1].text = data[i].orderid
                                    var orderMonth = ((data[i].orderDate).getMonth() + 1 < 10 ? '0' : '') + ((data[i].orderDate).getMonth() + 1)
                                    var orderDate = ((data[i].orderDate).getDate() < 10 ? '0' : '') + (data[i].orderDate).getDate()
                                    arr[0].contents.contents[ocnt].body.contents[2].contents[1].text = (data[i].orderDate).getFullYear() + "-" + orderMonth + "-" + orderDate
                                    arr[0].contents.contents[ocnt].body.contents[2].contents[2].text = data[i].orderTime.substring(0, 5)

                                    var takeMonth = ((data[i].takeDate).getMonth() + 1 < 10 ? '0' : '') + ((data[i].takeDate).getMonth() + 1)
                                    var takeDate = ((data[i].takeDate).getDate() < 10 ? '0' : '') + (data[i].takeDate).getDate()
                                    arr[0].contents.contents[ocnt].body.contents[3].contents[1].text = (data[i].takeDate).getFullYear() + "-" + takeMonth + "-" + takeDate
                                    arr[0].contents.contents[ocnt].body.contents[3].contents[2].text = data[i].takeTime.substring(0, 5)
                                    arr[0].contents.contents[ocnt].body.contents[4].contents[1].text = data[i].name
                                    arr[0].contents.contents[ocnt].body.contents[5].contents[1].text = data[i].phone
                                    if (data[i].status == "未接單") {
                                        arr[0].contents.contents[ocnt].footer.contents[1].action.label = "接單"
                                        arr[0].contents.contents[ocnt].footer.contents[1].action.text = "訂單,接單," + data[i].orderid
                                        arr[0].contents.contents[ocnt].footer.contents[2].action.label = "拒絕"
                                        arr[0].contents.contents[ocnt].footer.contents[2].action.text = "訂單,拒絕" + data[i].orderid

                                    } else if (data[i].status == "製作中") {
                                        arr[0].contents.contents[ocnt].footer.contents[1].action.label = "完成製作"
                                        arr[0].contents.contents[ocnt].footer.contents[1].action.text = "完成製作"
                                        arr[0].contents.contents[ocnt].footer.contents[2].action.label = "取消接單"
                                        arr[0].contents.contents[ocnt].footer.contents[2].action.text = "取消接單"

                                    } else if (data[i].status == "等待取餐") {

                                    }

                                    order_id = data[i].orderid
                                    totalPrice = 0
                                }
                                var tempRe = lodash.cloneDeep(temp.temp_fetchOrder_detail_repeat)
                                tempRe.contents[0].text = data[i].foodName
                                tempRe.contents[1].text = data[i].quantity
                                tempRe.contents[2].text = data[i].unitPrice
                                arr[0].contents.contents[ocnt].body.contents.push(tempRe)
                                totalPrice += data[i].unitPrice * data[i].quantity
                                arr[0].contents.contents[ocnt].footer.contents[0].contents[1].text = "總價 :" + totalPrice
                            }
                            event.reply(arr)
                        }
                    })
                } else if (msg2 == "接單") {
                    order.acceptOrder(storeid, msg3).then(data => {
                        if (data == -9) event.reply('執行錯誤');
                        else event.reply('已接單');
                    })
                } else if (msg2 == "拒絕") {
                    order.rejectOrder(storeid, msg3).then(data => {
                        if (data == -9) event.reply('執行錯誤');
                        else event.reply('已拒絕');
                    })
                } else if(msg2 =="完成"){
                    order.completedOrder(storeid, msg3).then(data => {
                        if (data == -9) event.reply('執行錯誤');
                        else event.reply('完成');
                    })
                }
            } else if (msg1 == "店家資訊") {
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