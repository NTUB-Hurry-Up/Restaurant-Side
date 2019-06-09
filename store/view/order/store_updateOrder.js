
//引用操作資料庫的物件
const store_temp = require('./../../view/store_temp');
const store_order = require('./../../route/store_order');

//------------------------------------------
// 查詢所有的店家
//------------------------------------------
var updateOrder = function (event, storeid, action_status, orderid, lodash) {
    event.source.profile().then(function (profile) {
        store_order.fetchOrder(orderid).then(data1 => {
            if (data1 == -1) {
                event.reply('沒有紀錄A');
            } else if (data1 == -9) {
                event.reply('執行錯誤');
            } else {

                var flag = Boolean(false);
                var new_status = ""
                if (storeid == data1[0].storeid) {

                    if (data1[0].status == "未接單") {
                        if (action_status == "接單") { flag = Boolean(true); new_status = "製作中" }
                        else if (action_status == "拒絕") { flag = Boolean(true); new_status = "已拒絕" }
                    } else if (data1[0].status == "製作中") {

                        if (action_status == "等待取餐") { flag = Boolean(true); new_status = "等待取餐" }
                        else if (action_status == "拒絕") { flag = Boolean(true); new_status = "已拒絕" }

                    } else if (data1[0].status == "等待取餐") {
                        if (action_status == "已取餐") { flag = Boolean(true); new_status = "已取餐" }
                        else if (action_status == "逾時未取餐") { flag = Boolean(true); new_status = "逾時未取餐" }
                    }

                    if (flag) {
                        store_order.updateOrder(storeid, orderid, new_status).then(data2 => {
                            if (data2 == -1) {
                                event.reply('沒有紀錄B');
                            } else if (data2 == -9) {
                                event.reply('執行錯誤');
                            } else {
                                var arr = []
                                var totalPrice = 0
                                arr.push(lodash.cloneDeep(store_temp.temp_acceptOrder))
                                var temp_re = lodash.cloneDeep(store_temp.temp_acceptOrder_repeat)
                                for (var i = 0; i < data1.length; i++) {
                                    if (i == 0) {
                                        temp_re.body.contents[0].text = data2.status
                                        if (data2.status == "未接單") {
                                            temp_re.body.contents[0].color = '#7BC5FE'
                                            temp_re.footer.contents[1].action.label = "接單"
                                            temp_re.footer.contents[1].action.text = "訂單,更新進度,接單," + data1[i].orderid
                                            temp_re.footer.contents[2].action.label = "拒絕"
                                            temp_re.footer.contents[2].action.text = "訂單,更新進度,拒絕," + data1[i].orderid
                                        } else if (data2.status == "製作中") {
                                            temp_re.body.contents[0].color = '#7BC5FE'
                                            temp_re.footer.contents[1].action.label = "製作完成"
                                            temp_re.footer.contents[1].action.text = "訂單,更新進度,等待取餐," + data1[i].orderid
                                            temp_re.footer.contents[2].action.label = "取消接單"
                                            temp_re.footer.contents[2].action.text = "訂單,更新進度,拒絕," + data1[i].orderid
                                        } else if (data2.status == "等待取餐") {
                                            temp_re.body.contents[0].color = '#7BC5FE'
                                            temp_re.footer.contents[1].action.label = "已取餐"
                                            temp_re.footer.contents[1].action.text = "訂單,更新進度,已取餐," + data1[i].orderid
                                            temp_re.footer.contents[2].action.label = "逾時未取餐"
                                            temp_re.footer.contents[2].action.text = "訂單,更新進度,逾時未取餐," + data1[i].orderid
                                            temp_re.footer.contents.push(lodash.cloneDeep(temp_re.footer.contents[2]))
                                            temp_re.footer.contents[3].action.label = "提醒顧客取餐"
                                            temp_re.footer.contents[3].action.text = "訂單,更新進度,提醒顧客取餐," + data1[i].orderid
                                            temp_re.footer.contents[3].color = "#000000"
                                        } else if (data2.status == "已取餐") {
                                            temp_re.body.contents[0].color = '#63BB72'
                                            temp_re.footer.contents.pop()
                                            temp_re.footer.contents.pop()
                                        } else if (data2.status == "逾時未取餐") {
                                            temp_re.body.contents[0].color = '#FF5B5B'
                                            temp_re.footer.contents.pop()
                                            temp_re.footer.contents.pop()
                                        } else if (data2.status == "已拒絕") {
                                            temp_re.body.contents[0].color = '#FF5B5B'
                                            temp_re.footer.contents.pop()
                                            temp_re.footer.contents.pop()
                                        }

                                        temp_re.body.contents[1].contents[1].text = data2.orderid
                                        var orderMonth = ((data1[i].orderDate).getMonth() + 1 < 10 ? '0' : '') + ((data1[i].orderDate).getMonth() + 1)
                                        var orderDate = ((data1[i].orderDate).getDate() < 10 ? '0' : '') + (data1[i].orderDate).getDate()
                                        temp_re.body.contents[2].contents[1].text = (data1[i].orderDate).getFullYear() + "-" + orderMonth + "-" + orderDate
                                        temp_re.body.contents[2].contents[2].text = data1[i].orderTime.substring(0, 5)

                                        var takeMonth = ((data1[i].takeDate).getMonth() + 1 < 10 ? '0' : '') + ((data1[i].takeDate).getMonth() + 1)
                                        var takeDate = ((data1[i].takeDate).getDate() < 10 ? '0' : '') + (data1[i].takeDate).getDate()
                                        temp_re.body.contents[3].contents[1].text = (data1[i].takeDate).getFullYear() + "-" + takeMonth + "-" + takeDate
                                        temp_re.body.contents[3].contents[2].text = data1[i].takeTime.substring(0, 5)
                                        temp_re.body.contents[4].contents[1].text = data1[i].name
                                        temp_re.body.contents[5].contents[1].text = data1[i].phone
                                        //
                                        arr[0].contents.contents[0] = temp_re

                                    }
                                    var de_tempRe = lodash.cloneDeep(store_temp.temp_acceptOrder_detail_repeat)
                                    de_tempRe.contents[0].text = data1[i].foodName
                                    de_tempRe.contents[1].text = data1[i].quantity
                                    de_tempRe.contents[2].text = data1[i].unitPrice
                                    arr[0].contents.contents[0].body.contents.push(de_tempRe)
                                    totalPrice += data1[i].unitPrice * data1[i].quantity
                                }
                                arr[0].contents.contents[0].footer.contents[0].contents[1].text = "總價 :" + totalPrice
                                if (data2.status != "已取餐") { event.reply([{ 'type': 'text', 'text': '已更新訂單狀態' }, arr[0]]); }
                                else if (data2.status == "已取餐") {
                                    event.reply([
                                        { 'type': 'text', 'text': '已更新訂單狀態' },
                                        arr[0],
                                        {
                                            type: 'sticker',
                                            packageId: '2',
                                            stickerId: '144'
                                        }
                                    ]);
                                }
                            }
                        })
                    } else {
                        event.reply('請重新查詢訂單');
                    }
                } else {
                    event.reply('這筆訂單不是你的');
                }
            }
        })
    });
}


//匯出
module.exports = { updateOrder };