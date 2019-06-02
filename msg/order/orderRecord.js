
//引用操作資料庫的物件
const temp = require('./../../temp');
const order = require('./../../order');

//------------------------------------------
// today formate
//------------------------------------------
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
var fetchDate = today.getFullYear() + "-" + cMonth + "-" + cDay
// var fetchTime = cHours + ":" + cMinutes + ":" + cSecond
//------------------------------------------
// 查詢所有的店家
//------------------------------------------
var orderRecord = function (event, storeid, order_status, lodash) {
    event.source.profile().then(function (profile) {
        order.fetchOrderRecord(storeid, order_status, fetchDate).then(data => {
            if (data == -1) {
                event.reply('沒有紀錄');
            } else if (data == -9) {
                event.reply('執行錯誤');
            } else {
                var order_id = ''
                var ocnt = -1
                var totalPrice = 0
                var arr = []
                arr.push(lodash.cloneDeep(temp.temp_acceptOrder))
                for (var i = 0; i < data.length; i++) {
                    if (order_id != data[i].orderid) {
                        ocnt++
                        console.log("!=================" + data[i].orderid);
                        var temp_re = lodash.cloneDeep(temp.temp_acceptOrder_repeat)
                        temp_re.body.contents[0].text = data[i].status

                        if (data[i].status == "未接單") {
                            temp_re.body.contents[0].color = '#7BC5FE'
                            temp_re.footer.contents[1].action.label = "接單"
                            temp_re.footer.contents[1].action.text = "訂單,接單," + data[i].orderid
                            temp_re.footer.contents[2].action.label = "拒絕"
                            temp_re.footer.contents[2].action.text = "訂單,拒絕," + data[i].orderid
                        } else if (data[i].status == "製作中") {
                            temp_re.body.contents[0].color = '#7BC5FE'
                            temp_re.footer.contents[1].action.label = "製作完成"
                            temp_re.footer.contents[1].action.text = "訂單,接單," + data[i].orderid
                            temp_re.footer.contents[2].action.label = "取消接單"
                            temp_re.footer.contents[2].action.text = "訂單,拒絕," + data[i].orderid
                        } else if (data[i].status == "等待取餐") {
                            temp_re.body.contents[0].color = '#7BC5FE'
                            temp_re.footer.contents[1].action.label = "已取餐"
                            temp_re.footer.contents[1].action.text = "訂單,接單," + data[i].orderid
                            temp_re.footer.contents[2].action.label = "逾時未取餐"
                            temp_re.footer.contents[2].action.text = "訂單,逾時未取餐," + data[i].orderid
                            temp_re.footer.contents.push(lodash.cloneDeep(temp_re.footer.contents[2]))
                            temp_re.footer.contents[3].action.label = "提醒顧客取餐"
                            temp_re.footer.contents[3].action.text = "訂單,提醒顧客取餐," + data[i].orderid
                            temp_re.footer.contents[3].color = "#000000"
                        } else if (data[i].status == "已取餐") {
                            temp_re.body.contents[0].color = '#63BB72'
                        } else if (data[i].status == "逾時未取餐") {
                            temp_re.body.contents[0].color = '#FF5B5B'
                        } else if (data[i].status == "已拒絕") {
                            temp_re.body.contents[0].color = '#FF5B5B'
                        }

                        temp_re.body.contents[1].contents[1].text = data[i].orderid
                        var orderMonth = ((data[i].orderDate).getMonth() + 1 < 10 ? '0' : '') + ((data[i].orderDate).getMonth() + 1)
                        var orderDate = ((data[i].orderDate).getDate() < 10 ? '0' : '') + (data[i].orderDate).getDate()
                        temp_re.body.contents[2].contents[1].text = (data[i].orderDate).getFullYear() + "-" + orderMonth + "-" + orderDate
                        temp_re.body.contents[2].contents[2].text = data[i].orderTime.substring(0, 5)

                        var takeMonth = ((data[i].takeDate).getMonth() + 1 < 10 ? '0' : '') + ((data[i].takeDate).getMonth() + 1)
                        var takeDate = ((data[i].takeDate).getDate() < 10 ? '0' : '') + (data[i].takeDate).getDate()
                        temp_re.body.contents[3].contents[1].text = (data[i].takeDate).getFullYear() + "-" + takeMonth + "-" + takeDate
                        temp_re.body.contents[3].contents[2].text = data[i].takeTime.substring(0, 5)
                        temp_re.body.contents[4].contents[1].text = data[i].name
                        temp_re.body.contents[5].contents[1].text = data[i].phone
                        //
                        arr[0].contents.contents[ocnt] = temp_re

                        order_id = data[i].orderid
                        totalPrice = 0
                    }
                    var de_tempRe = lodash.cloneDeep(temp.temp_acceptOrder_detail_repeat)
                    de_tempRe.contents[0].text = data[i].foodName
                    de_tempRe.contents[1].text = data[i].quantity
                    de_tempRe.contents[2].text = data[i].unitPrice
                    arr[0].contents.contents[ocnt].body.contents.push(de_tempRe)
                    totalPrice += data[i].unitPrice * data[i].quantity
                    arr[0].contents.contents[ocnt].footer.contents[0].contents[1].text = "總價 :" + totalPrice
                }
                event.reply(arr)
            }
        })
    });
}


//匯出
module.exports = { orderRecord };