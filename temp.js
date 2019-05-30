var temp_acceptOrder = {
  "type": "flex",
  "altText": "Flex Message",
  "contents": {
    "type": "carousel",
    "contents": []
  }
}
var temp_acceptOrder_repeat = {
  "type": "bubble",
  "direction": "ltr",
  "body": {
    "type": "box",
    "layout": "vertical",
    "spacing": "sm",
    "contents": [
      {
        "type": "text",
        "text": "新訂單",
        "size": "xxl",
        "align": "center",
        "weight": "bold"
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "訂單編號:",
            "align": "start",
            "weight": "bold"
          },
          {
            "type": "text",
            "text": "100000001",
            "align": "start"
          },
          {
            "type": "filler"
          }
        ]
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "訂餐時間:",
            "weight": "bold"
          },
          {
            "type": "text",
            "text": "2019-12-31 ",
            "size": "sm",
            "align": "start"
          },
          {
            "type": "text",
            "text": "00:00",
            "size": "sm"
          }
        ]
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "取餐時間:",
            "weight": "bold"
          },
          {
            "type": "text",
            "text": "2019-12-31 ",
            "size": "sm",
            "align": "start"
          },
          {
            "type": "text",
            "text": "00:00",
            "size": "sm"
          }
        ]
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "顧客姓名:",
            "weight": "bold"

          },
          {
            "type": "text",
            "text": "幹你娘姬芭",
            "wrap": true
          },
          {
            "type": "filler"
          }
        ]
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "顧客電話:",
            "weight": "bold"
          },
          {
            "type": "text",
            "text": "0988870780",
            "size": "sm",
            "align": "start"
          },
          {
            "type": "filler"
          }
        ]
      },
      {
        "type": "separator"
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "餐點名稱",
            "weight": "bold"
          },
          {
            "type": "text",
            "text": "份量",
            "align": "center",
            "weight": "bold"
          },
          {
            "type": "text",
            "text": "單價",
            "align": "end",
            "weight": "bold"
          }
        ]
      },
      /*{
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "原味蛋餅",
            "wrap": true
          },
          {
            "type": "text",
            "text": "3",
            "align": "center"
          },
          {
            "type": "text",
            "text": "30",
            "align": "end"
          }
        ]
      }*/
    ]
  },
  "footer": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "separator"
          },
          {
            "type": "text",
            "text": "總價 :",
            "size": "xl",
            "align": "end",
            "weight": "bold"
          }
        ]
      },
      {
        "type": "button",
        "action": {
          "type": "message",
          "label": "接單",
          "text": "接單"
        },
        "color": "#137907"
      },
      {
        "type": "button",
        "action": {
          "type": "message",
          "label": "拒絕",
          "text": "拒絕"
        },
        "color": "#EF4417"
      }
    ]
  }
}
var temp_acceptOrder_detail_repeat = {
  "type": "box",
  "layout": "horizontal",
  "contents": [
    {
      "type": "text",
      "text": "原味蛋餅",
      "wrap": true
    },
    {
      "type": "text",
      "text": "3",
      "align": "center"
    },
    {
      "type": "text",
      "text": "30",
      "align": "end"
    }
  ]
}
var temp_menu = {
  "type": "flex",
  "altText": "Flex Message",
  "contents": {
    "type": "carousel",
    "contents": [

    ]
  }
}
var temp_menu_repeat = {
  "type": "bubble",
  "hero": {
    "type": "image",
    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_2_restaurant.png",
    "size": "full",
    "aspectRatio": "20:13",
    "aspectMode": "cover"
  },
  "body": {
    "type": "box",
    "layout": "vertical",
    "spacing": "md",
    "contents": [
      {
        "type": "text",
        "text": 'data[i].foodName',
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
                "type": "text",
                "text": "Price",
                "flex": 1,
                "size": "lg",
                "color": "#AAAAAA"
              },
              {
                "type": "text",
                "text": '"NT$" + data[i].foodPrice',
                "flex": 0,
                "margin": "lg",
                "size": "lg",
                "align": "end",
                "weight": "regular"
              }
            ]
          }
        ]
      },
      {
        "type": "text",
        "text": "Sauce, Onions, Pickles, Lettuce & Cheese",
        "size": "xs",
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
        "type": "button",
        "action": {
          "type": "message",
          "label": "Add to Cart",
          "text": '"店家,加入購物車," + data[i].storeid + "," + data[i].foodid'
        },
        "color": "#905C44",
        "style": "primary"
      }
    ]
  }

}
var temp_CollectedOrder = {
  "type": "flex",
  "altText": "Flex Message",
  "contents": {
    "type": "carousel",
    "contents": []
  }
}
var temp_CollectedOrder_repeat = {
  "type": "bubble",
  "direction": "ltr",
  "body": {
    "type": "box",
    "layout": "vertical",
    "spacing": "sm",
    "contents": [
      {
        "type": "text",
        "text": "製作中",
        "size": "xxl",
        "align": "center",
        "weight": "bold"
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "訂單編號:",
            "align": "start",
            "weight": "bold"
          },
          {
            "type": "text",
            "text": "100000001",
            "align": "start"
          },
          {
            "type": "filler"
          }
        ]
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "訂餐時間:",
            "weight": "bold"
          },
          {
            "type": "text",
            "text": "2019-12-31 ",
            "size": "sm",
            "align": "start"
          },
          {
            "type": "text",
            "text": "00:00",
            "size": "sm"
          }
        ]
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "取餐時間:",
            "weight": "bold"
          },
          {
            "type": "text",
            "text": "2019-12-31 ",
            "size": "sm",
            "align": "start"
          },
          {
            "type": "text",
            "text": "00:00",
            "size": "sm"
          }
        ]
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "顧客姓名:",
            "weight": "bold"

          },
          {
            "type": "text",
            "text": "幹你娘姬芭",
            "wrap": true
          },
          {
            "type": "filler"
          }
        ]
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "顧客電話:",
            "weight": "bold"
          },
          {
            "type": "text",
            "text": "0988870780",
            "size": "sm",
            "align": "start"
          },
          {
            "type": "filler"
          }
        ]
      },
      {
        "type": "separator"
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "餐點名稱",
            "weight": "bold"
          },
          {
            "type": "text",
            "text": "份量",
            "align": "center",
            "weight": "bold"
          },
          {
            "type": "text",
            "text": "單價",
            "align": "end",
            "weight": "bold"
          }
        ]
      },
      /*{
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "原味蛋餅",
            "wrap": true
          },
          {
            "type": "text",
            "text": "3",
            "align": "center"
          },
          {
            "type": "text",
            "text": "30",
            "align": "end"
          }
        ]
      }*/
    ]
  },
  "footer": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "separator"
          },
          {
            "type": "text",
            "text": "總價 :",
            "size": "xl",
            "align": "end",
            "weight": "bold"
          }
        ]
      },
      {
        "type": "button",
        "action": {
          "type": "message",
          "label": "接單",
          "text": "接單"
        },
        "color": "#137907"
      },
      {
        "type": "button",
        "action": {
          "type": "message",
          "label": "提醒取餐",
          "text": "提醒取餐"
        },
        "color": "#C9C90E"
      },
      {
        "type": "button",
        "action": {
          "type": "message",
          "label": "拒絕",
          "text": "拒絕"
        },
        "color": "#EF4417"
      }
    ]
  }
}
var temp_CollectedOrderdetail_repeat = {
  "type": "box",
  "layout": "horizontal",
  "contents": [
    {
      "type": "text",
      "text": "原味蛋餅",
      "wrap": true
    },
    {
      "type": "text",
      "text": "3",
      "align": "center"
    },
    {
      "type": "text",
      "text": "30",
      "align": "end"
    }
  ]
}
var temp_todayOrder = {
  "type": "flex",
  "altText": "Flex Message",
  "contents": {
    "type": "carousel",
    "contents": []
  }
}
var temp_todayOrder_repeat = {
  "type": "bubble",
  "direction": "ltr",
  "body": {
    "type": "box",
    "layout": "vertical",
    "spacing": "sm",
    "contents": [
      {
        "type": "text",
        "text": "製作中",
        "size": "xxl",
        "align": "center",
        "weight": "bold"
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "訂單編號:",
            "align": "start",
            "weight": "bold"
          },
          {
            "type": "text",
            "text": "100000001",
            "align": "start"
          },
          {
            "type": "filler"
          }
        ]
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "訂餐時間:",
            "weight": "bold"
          },
          {
            "type": "text",
            "text": "2019-12-31 ",
            "size": "sm",
            "align": "start"
          },
          {
            "type": "text",
            "text": "00:00",
            "size": "sm"
          }
        ]
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "取餐時間:",
            "weight": "bold"
          },
          {
            "type": "text",
            "text": "2019-12-31 ",
            "size": "sm",
            "align": "start"
          },
          {
            "type": "text",
            "text": "00:00",
            "size": "sm"
          }
        ]
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "顧客姓名:",
            "weight": "bold"

          },
          {
            "type": "text",
            "text": "幹你娘姬芭",
            "wrap": true
          },
          {
            "type": "filler"
          }
        ]
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "顧客電話:",
            "weight": "bold"
          },
          {
            "type": "text",
            "text": "0988870780",
            "size": "sm",
            "align": "start"
          },
          {
            "type": "filler"
          }
        ]
      },
      {
        "type": "separator"
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "餐點名稱",
            "weight": "bold"
          },
          {
            "type": "text",
            "text": "份量",
            "align": "center",
            "weight": "bold"
          },
          {
            "type": "text",
            "text": "單價",
            "align": "end",
            "weight": "bold"
          }
        ]
      },
      /*{
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "原味蛋餅",
            "wrap": true
          },
          {
            "type": "text",
            "text": "3",
            "align": "center"
          },
          {
            "type": "text",
            "text": "30",
            "align": "end"
          }
        ]
      }*/
    ]
  },
  "footer": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "separator"
          },
          {
            "type": "text",
            "text": "總價 :",
            "size": "xl",
            "align": "end",
            "weight": "bold"
          }
        ]
      }
    ]
  }

}
var temp_todayOrderdetail_repeat = {
  "type": "box",
  "layout": "horizontal",
  "contents": [
    {
      "type": "text",
      "text": "原味蛋餅",
      "wrap": true
    },
    {
      "type": "text",
      "text": "3",
      "align": "center"
    },
    {
      "type": "text",
      "text": "30",
      "align": "end"
    }
  ]
}

//匯出
module.exports = { temp_acceptOrder, temp_acceptOrder_repeat, temp_acceptOrder_detail_repeat, temp_CollectedOrder, temp_CollectedOrder_repeat, temp_CollectedOrderdetail_repeat, temp_todayOrder, temp_todayOrder_repeat, temp_todayOrderdetail_repeat, temp_menu, temp_menu_repeat };