const apiLine = require('../line')
const register = require('../app_module/register/index')
const InspectUser = require('../app_module/inspectUser/index')
const lotteryPut = require('../app_module/lotteryPut/index')
const findMynumber = require('../app_module/lotteryfindMy/index')
const findMyPrize = require('../app_module/findMyPrize/index')
const apiSticker = require('../message/sticker')
const apiquickreply = require('../message/quickreply')
const apicarousel = require('../message/carousel')

const msg =[{
        type:'text',
}]

const msgQP = []

exports.Register = async (userInfo) =>{

        const { replyToken , name , lastname , userId } = userInfo

        const result = await register.Register(userId , name , lastname)

         if(result === true){
                
            msg[0].text = `สมัครสมาชิกเรียบร้อย ยินดีต้อนรับคุณ ${name} ${lastname}`

            apiLine.replaymessage(replyToken , msg)

         }else{

            msg[0].text = `เกิดข้อผิดพลาด ขอเริ่มต้นใหม่`

            apiLine.replaymessage(replyToken,msg)

         }  


}

exports.lotteryPut = async (numberInfo) =>{
         const { replyToken , number , userId , fulfillmentText  } = numberInfo

         const result = await lotteryPut.lotteryPut(number , userId)
         console.log(fulfillmentText)

         if(result === true){

            msg[0].text = fulfillmentText
            msg.push(apiSticker.Okay)
            await apiLine.replaymessage(replyToken , msg)
            msg.splice(1,1)

         }else{

            msg[0].text = `คุณได้บันทึกเลขนี้ไว้แล้ว`
            await apiLine.replaymessage(replyToken , msg)
         }
      
}

exports.InspectUser = async (userId , action , fullfillmentText) =>{
        
       const result = await InspectUser.InspectUser(userId)
       const { payload } = result
       if(action === "registerStart" && payload === true){
          msg[0].text = fullfillmentText
          return msg
       }else if(payload === true){
          msgQP.push(apiSticker.sorry)
          msgQP.push(apiquickreply.Register)
          msgQP[1].text = 'คุณยังไม่ได้เป็นสมาชิก โปรดกดเลือกเมนูด้านล่าง'
          return msgQP
       }{
          return result
       }

}

exports.findMynumber = async ( userId , action ,replyToken ) =>{

      const result = await findMynumber.findMylottery(userId)

      console.log(result.findMynumber.length)

      if(result.findMynumber.length === 0) {

            msgQP.push(apiSticker.sorry)
            msgQP.push(apiquickreply.insertNumber)
            msgQP[1].text ='คุณยังไม่เคยใช้บริการบันทึกเลข กรุณาเลือกเมนูด้านล่างเพื่อทำการบันทึก'

            await apiLine.replaymessage(replyToken , msgQP)
            
      }
      else{
         const item = await result.findMynumber.slice(0,7).map(val => (    
            {
               "imageBackgroundColor": "#FFFFFF",
               "title": `เลขที่บันทึกอยุ่`,
               "text": `เลข ${val.number}`,
               "actions": [
                  {
                     "type": "uri",
                     "label": "เลขที่คุณบันทึกไว้",
                     "uri": "http://example./page/111"
                  }
               ]
            }))

            apicarousel.carouselTest.template.columns = item

            // message limit 5 //////
      
            console.log(apicarousel.carouselTest)
      
            await apiLine.replaymessage(replyToken , apicarousel.carouselTest  )
         }

 
}

exports.findMyPrize = async ( userId , replyToken) =>{

   const result = await findMyPrize.findMyPrize(userId)
   const data = result.data.userPrize
   console.log(data)


   if(data === null){
      msg[0].text = 'คุณอาจจะยังไม่เคยใช้งาน หรือ ไม่แน่คุณก็ไม่เคยถูกรางวัลเลย'
      msg.push(apiSticker.lucky)
      await apiLine.replaymessage(replyToken , msg)
   }else{
      const item =  await data.slice(0,5).map(prize =>  (    
            {  
               "thumbnailImageUrl": "https://s3-ap-southeast-1.amazonaws.com/images.humanresourcesonline.net/wp-content/uploads/2015/03/Jerene-Mar-2015-more-money-shutterstock.jpg",             
               "imageBackgroundColor": "#FFFFFF",
               "title": `รางวัลที่คุณเคยถูก`,
               "text": `เลข ${prize.number}`,
               "actions": [
                  {
                     "type": "uri",
                     "label": "View detail",
                     "uri": "http://example.com/page/111"
                  }
               ]
            }))

            console.log(item)

            apicarousel.carouselTest.template.columns = item

          apiLine.replaymessage(replyToken ,  apicarousel.carouselTest)

   }

}

const AnnouncePrize = ( first , number , replyToken ) => {
      if(first === true){
         msg[0].text = `คุณเคยถูกรางวัลจากเลข ${number}`
      }

      apiLine.replaymessage(replyToken , msg)
}