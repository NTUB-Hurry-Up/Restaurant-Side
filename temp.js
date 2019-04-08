
var temp1=
{
    "type": "template",
    "altText": "this is a buttons template",
    "template": {
        "type": "buttons",
        "actions": [
            {
            "type": "message",
            "label": "看到的字",
            "text": "傳出的字"
            },
            {
            "type": "message",
            "label": "看到的字",
            "text": "傳出的字"
            }
        ],
        "title": "標題",
        "text": "內文"
    }
}
var temp_store=
{
  "type": "flex",
  "altText": "Flex Message",
  "contents": {
    "type": "carousel",
    "contents": [
    ]
  }
}

//匯出
module.exports = {temp1, temp_store};