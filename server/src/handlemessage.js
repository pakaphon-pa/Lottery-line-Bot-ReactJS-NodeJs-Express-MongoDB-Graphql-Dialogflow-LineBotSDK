const handle = require('./handle')
const apiLine = require('./line')
const apiquickreply = require('./message/quickreply')
const Inpectuser = require('../src/app_module/inspectUser')

const packageId = ['11537']
const stickerId = ['52002738' , '52002768' , '52002748' , '52002771']
exports.handlemessage = async (event) =>{
        console.log(event)
        const { replyToken } = event
        const { userId } = event.source
        if(event.message.type === "sticker"){

            const  msg = [{
                    type:'sticker',
                }
            ]
            
            let sticker = stickerId[Math.floor(Math.random() * stickerId.length)];


       
            

            const result = await Inpectuser.InspectUser(userId)
            const { payload , name } = result

            if( payload === false){

                console.log('sticker')
                msg[0].packageId = packageId[0]
                msg[0].stickerId = sticker
                msg.push(apiquickreply.Allmenu)
                msg[1].text = `ยินดีต้อนรับ คุณ${name} โปรดเลือกเมนูใช้งานตามด้านล่าง`
                console.log(msg)
                apiLine.replaymessage(replyToken , msg)

            }else{
                
                console.log('sticker')
                msg[0].packageId = packageId[0]
                msg[0].stickerId = sticker
                msg.push(apiquickreply.Register)
                msg[1].text = `ท่านยังไม่ได้เป็นสมาชิกของเราโปรดเลือกเมนู สมัครสมาชิกด้านล่าง`
                console.log(msg)
                apiLine.replaymessage(replyToken , msg)

            }
            
        }else if(event.message.text === 'liffnumber'){

            let msg2 ={
                "type": "template",
                "altText": "This is a buttons template",
                "template": {
                    "type": "buttons",
                    "imageAspectRatio": "rectangle",
                    "imageSize": "cover",
                    "imageBackgroundColor": "#FFFFFF",
                    "title": "test Number",
                    "text": "Please select",
                    "actions": [
                        {
                          "type": "uri",
                          "label": "กด!!! เพื่อกรอกชื่อ",
                          "uri": "line://app/1611477987-BvzroR2V"
                        }
                    ]
                }
              }

              apiLine.replaymessage(replyToken , msg2)
            
        }else if(event.message.text === 'liffForm'){

            let msg2 ={
                "type": "template",
                "altText": "This is a buttons template",
                "template": {
                    "type": "buttons",
                    "imageAspectRatio": "rectangle",
                    "imageSize": "cover",
                    "imageBackgroundColor": "#FFFFFF",
                    "title": "Form test",
                    "text": "Please select",
                    "actions": [
                        {
                          "type": "uri",
                          "label": "กด!!! เพื่อกรอกชื่อ",
                          "uri": "line://app/1611477987-m6YOAMxv"
                        }
                    ]
                }
              }

              apiLine.replaymessage(replyToken , msg2)
            
        }else{

            const { text , type } = event.message
            const info = {
                userId, 
                text,
                replyToken
            }
            console.log(info)
            handle.detectIntent(info)

    }
}