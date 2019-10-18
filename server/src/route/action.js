////////////////////////// handle case before use functions ///////////////

const apiLine = require('../line')
const apiFunction = require('./functions')
const apiqp = require('../message/quickreply')

const msg = [{
    type:'text'
}]

const msgqp = []

exports.CaseRegisterfinish = async (Context , action , userId , replyToken) =>{

        console.log(`action is ${action}`)
        const field = Context.parameters.fields
        const name = field.name.stringValue
        const lastname = field.lastname.stringValue

        
        const userInfo = {
            userId,
            name,
            lastname,
            replyToken
         }

         console.log(userInfo)

        // limit 1 reply message
        // await apiLine.replaymessage(replyToken , fulfillmentText)
        
        await apiFunction.Register(userInfo)
}


exports.Casenumber = async (text , action , replyToken , fulfillmentText) =>{

            console.log(`action is ${action}`)
            console.log(`text length is ${text}`)
            if(text.length === 6){
                apiqp.confirm.text = fulfillmentText
                apiLine.replaymessage(replyToken , apiqp.confirm)
            }else{
                msg[0].text = 'กรุณากรอกให้ครบ 6 ตัว'
                apiLine.replaymessage(replyToken , msg)

            }

}

exports.CaseDefault = async (replyToken , action , fulfillmentText , qeuryText ) =>{

            console.log(`action is ${action}`)
            console.log(`บอทพูดว่า ${fulfillmentText}`)

            if(action === 'confirmName'){

                apiqp.confirm.text = `คุณ${qeuryText} ใช่หรือไม่ `
                apiLine.replaymessage(replyToken , apiqp.confirm )

            }else if(action === 'confirmNumber'){

                apiqp.confirm.text = `เลขที่คุณซื้อใช่เลข ${qeuryText} หรือไม่`
                apiLine.replaymessage(replyToken , apiqp.confirm.text )

            }else{

                msg[0].text = fulfillmentText
                apiLine.replaymessage(replyToken , msg )

            }          
}

exports.CaseStart = async (replyToken , action , userId , fulfillmentText) =>{

    ////////// handle payload is false but payload is true handle in fuctions  file  ///////////

            console.log(`action is ${action}`)

            const result = await apiFunction.InspectUser(userId , action ,fulfillmentText)
            const { payload , name , lastname  } = result
            
            if(action === "registerStart" && payload === false){

                msgqp.push(apiqp.Allmenu)
                msgqp[0].text = `สวัสดี คุณ ${name} ได้เป็นสมาชิกอยู่แล้ว เลือกเมนูด้านล่างได้เลย`
                await apiLine.replaymessage(replyToken, msgqp)

            }else if(action === "findmynumberStart" && payload === false){
               await apiFunction.findMynumber(userId , action ,replyToken)
               
            }else if(action === "findmyprizeStart" && payload === false){
                await apiFunction.findMyPrize(userId , replyToken)

            }else if(action === "buyStart" && payload === false){
                console.log('เริ่มซื้อได้')

                let msg2 ={
                    "type": "template",
                    "altText": "This is a buttons template",
                    "template": {
                        "type": "buttons",
                        "imageAspectRatio": "rectangle",
                        "imageSize": "cover",
                        "imageBackgroundColor": "#FFFFFF",
                        "title": "กรอกตัวเลข",
                        "text": "กรอกตัวเลขแล้วกดส่ง",
                        "actions": [
                            {
                              "type": "uri",
                              "label": "กด!!! เพื่อกรอกตัวเลข",
                              "uri": "line://app/1611477987-6vGVejrW"
                            }
                        ]
                    }
                  }
    
                  apiLine.replaymessage(replyToken , msg2)
                
            }else if(payload === false){

                msg[0].text = fulfillmentText
                await apiLine.replaymessage(replyToken , msg)
                
            }else{
            
                await apiLine.replaymessage(replyToken , result)
                result.splice(1,1)
        
            }

}

exports.confirmRegister = (Context , action , replyToken ) =>{

            console.log(`action is ${action}`)

            console.log(Context.parameters.fields)

            const fields = Context.parameters.fields
            const name = fields.name.stringValue
            const lastname = fields.lastname.stringValue

            apiqp.confirmInsert.text = `คุณชื่อ ${name} ${lastname} โปรดยืนยัน`

            apiLine.replaymessage(replyToken , apiqp.confirmInsert)
}

exports.CaseRestart = async (userId , action , replyToken , fulfillmentText) =>{

            console.log(`action is ${action}`)

            const result = await apiFunction.InspectUser(userId , action ,fulfillmentText)
            const { payload , name } = result

            if(action === 'input.welcome' && payload === false ){

                msgqp.push(apiqp.Allmenu)
                msgqp[0].text = `${fulfillmentText} คุณ${name} เลือกเมนูด้านล่างได้เลย`
                await apiLine.replaymessage(replyToken, msgqp)
                msgqp.splice(0,1)

            }else if(action === 'input.unknown' && payload === false){

                msgqp.push(apiqp.Allmenu)
                msgqp[0].text = `${fulfillmentText} คุณ${name} โปรดช่วยเลือกเมนูตามด้านล่าง`
                await apiLine.replaymessage(replyToken, msgqp)
                msgqp.splice(0,1)

            }else {
                  
                await apiLine.replaymessage(replyToken , result)
                result.splice(0,2)

            }
} 

exports.CaseNumberBeforeFinish = async ( fulfillmentText , replyToken , action) =>{

            console.log(`action is ${action}`)

            msgqp.push(apiqp.confirmInsert)
            msgqp[0].text = fulfillmentText
            await apiLine.replaymessage(replyToken , msgqp)
            msgqp.splice(0,1)

}

exports.CaseNumberFinish = async ( Context , fulfillmentText , action , userId , replyToken ) =>{

            console.log(`Action is ${action}`)
            const field = Context.parameters.fields
            const number = field.number.stringValue


            const numberInfo = {
                userId,
                number,
                replyToken,
                fulfillmentText

            }

            await apiFunction.lotteryPut(numberInfo)

}