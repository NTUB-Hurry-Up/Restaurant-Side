
//引用操作資料庫的物件
const temp = require('./../../temp');
const order = require('./../../order');

//------------------------------------------
// 查詢所有的店家
//------------------------------------------
var updateOrder = function (event, storeid, new_status, orderid, lodash) {
    event.source.profile().then(function (profile) {
        order.fetchOrder(storeid).then(data1 => {
            if (data1 == -1) {
                event.reply('沒有紀錄');
            } else if (data1 == -9) {
                event.reply('執行錯誤');
            } else {

                var flag = Boolean(false);
                if (storeid == data1[0].storeid) {

                    if (data1[0].status == "未接單" && (new_status == "接單" || new_status == "拒絕")) { flag = Boolean(true) }
                    else if (data1[0].status == "製作中" && (new_status == "等待取餐" || new_status == "拒絕")) { flag = Boolean(true) }
                    else if (data1[0].status == "等待取餐" && (new_status == "已取餐" || new_status == "逾時未取餐")) { flag = Boolean(true) }

                    if (flag) {
                        order.fetchOrder(storeid).then(data2 => {
                            if (data2 == -1) {
                                event.reply('沒有紀錄');
                            } else if (data2 == -9) {
                                event.reply('執行錯誤');
                            } else {
                                var arr = []
                                var totalPrice = 0

                                var temp_re = lodash.cloneDeep(temp.temp_acceptOrder_repeat)
                                for (var i = 0; i < data2.length; i++) {
                                    temp_re.body.contents[0].text = data2[i].status
                                    if (data2[i].status == "未接單") {
                                        temp_re.body.contents[0].color = '#7BC5FE'
                                        temp_re.footer.contents[1].action.label = "接單"
                                        temp_re.footer.contents[1].action.text = "訂單,更新進度,接單," + data2[i].orderid
                                        temp_re.footer.contents[2].action.label = "拒絕"
                                        temp_re.footer.contents[2].action.text = "訂單,更新進度,拒絕," + data2[i].orderid
                                    } else if (data2[i].status == "製作中") {
                                        temp_re.body.contents[0].color = '#7BC5FE'
                                        temp_re.footer.contents[1].action.label = "製作完成"
                                        temp_re.footer.contents[1].action.text = "訂單,更新進度,等待取餐," + data2[i].orderid
                                        temp_re.footer.contents[2].action.label = "取消接單"
                                        temp_re.footer.contents[2].action.text = "訂單,更新進度,拒絕," + data2[i].orderid
                                    } else if (data2[i].status == "等待取餐") {
                                        temp_re.body.contents[0].color = '#7BC5FE'
                                        temp_re.footer.contents[1].action.label = "已取餐"
                                        temp_re.footer.contents[1].action.text = "訂單,更新進度,已取餐," + data2[i].orderid
                                        temp_re.footer.contents[2].action.label = "逾時未取餐"
                                        temp_re.footer.contents[2].action.text = "訂單,更新進度,逾時未取餐," + data2[i].orderid
                                        temp_re.footer.contents.push(lodash.cloneDeep(temp_re.footer.contents[2]))
                                        temp_re.footer.contents[3].action.label = "提醒顧客取餐"
                                        temp_re.footer.contents[3].action.text = "訂單,更新進度,提醒顧客取餐," + data2[i].orderid
                                        temp_re.footer.contents[3].color = "#000000"
                                    } else if (data2[i].status == "已取餐") {
                                        temp_re.body.contents[0].color = '#63BB72'
                                    } else if (data2[i].status == "逾時未取餐") {
                                        temp_re.body.contents[0].color = '#FF5B5B'
                                    } else if (data2[i].status == "已拒絕") {
                                        temp_re.body.contents[0].color = '#FF5B5B'
                                    }

                                    temp_re.body.contents[1].contents[1].text = data2[i].orderid
                                    var orderMonth = ((data2[i].orderDate).getMonth() + 1 < 10 ? '0' : '') + ((data2[i].orderDate).getMonth() + 1)
                                    var orderDate = ((data2[i].orderDate).getDate() < 10 ? '0' : '') + (data2[i].orderDate).getDate()
                                    temp_re.body.contents[2].contents[1].text = (data2[i].orderDate).getFullYear() + "-" + orderMonth + "-" + orderDate
                                    temp_re.body.contents[2].contents[2].text = data2[i].orderTime.substring(0, 5)

                                    var takeMonth = ((data2[i].takeDate).getMonth() + 1 < 10 ? '0' : '') + ((data2[i].takeDate).getMonth() + 1)
                                    var takeDate = ((data2[i].takeDate).getDate() < 10 ? '0' : '') + (data2[i].takeDate).getDate()
                                    temp_re.body.contents[3].contents[1].text = (data2[i].takeDate).getFullYear() + "-" + takeMonth + "-" + takeDate
                                    temp_re.body.contents[3].contents[2].text = data2[i].takeTime.substring(0, 5)
                                    temp_re.body.contents[4].contents[1].text = data2[i].name
                                    temp_re.body.contents[5].contents[1].text = data2[i].phone
                                    //
                                    arr = [temp_re]
                                }
                                var de_tempRe = lodash.cloneDeep(temp.temp_acceptOrder_detail_repeat)
                                de_tempRe.contents[0].text = data2[i].foodName
                                de_tempRe.contents[1].text = data2[i].quantity
                                de_tempRe.contents[2].text = data2[i].unitPrice
                                arr[0].body.contents.push(de_tempRe)
                                totalPrice += data2[i].unitPrice * data2[i].quantity
                                arr[0].footer.contents[0].contents[1].text = "總價 :" + totalPrice
                                event.reply(arr)
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