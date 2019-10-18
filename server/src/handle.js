const dialogflow =  require('./dialogflow')
const apiAction = require('./route/action')
const line = require('./line')

exports.detectIntent = async (info) =>{

    const { text , userId , replyToken } = info
    const responses = await dialogflow.detectIntent(text , userId)
    
    console.log(responses)
    const result = responses[0].queryResult
    const { fulfillmentText , queryText , action } = result
    const Context = result.outputContexts[0]
    console.log(`BOT say ${fulfillmentText} action is ${action}`) 
    console.log('|||||||||||||||||||||||||||||||||||||||||||||||')

    switch(action){
        case "registerStart":
        case "buyStart":
        case "prizeStart":
        case "findmyprizeStart":   
        case "findmynumberStart": 
            console.log('check userId(line) is member or No')     
            apiAction.CaseStart(replyToken , action ,userId , fulfillmentText)     
            break
        case "confirmRegister":
            apiAction.confirmRegister(Context , action , replyToken)
            break    
        case "registerFinish":
            apiAction.CaseRegisterfinish(Context , action , userId , replyToken)
            break  
        case "confirmNumber":
            const number = result.parameters.fields.number.stringValue
            apiAction.Casenumber( number  , action ,  replyToken , fulfillmentText)
            break
        case "numberBeforeFinish":
            apiAction.CaseNumberBeforeFinish(fulfillmentText , replyToken , action)
            break    
        case "numberFinish":
            apiAction.CaseNumberFinish(Context , fulfillmentText , action , userId , replyToken)
            break    
        case "input.unknown":
        case "input.welcome":
            apiAction.CaseRestart(userId , action , replyToken , fulfillmentText)
            break    
        default:
            apiAction.CaseDefault(replyToken , action , fulfillmentText , queryText )
    }

    // if(action === 'finish'){
    //     console.log(`action is ${action}`)
    //     const Context = result.outputContexts[0]
    //     const field = Context.parameters.fields
    //     const number = field.number
    //     const name = field.name
    //     const { numberValue } = number
    //     const { stringValue } = name

    //     console.log(`number is ${numberValue} and name is ${stringValue}`)
        
    //     const userInfo = {
    //         userId,
    //         numberValue,
    //         stringValue,
    //         replyToken
    //      }

    //      console.log(userInfo)

    //     // limit 1 reply message
    //     // await apiLine.replaymessage(replyToken , fulfillmentText)
        
    //     routefunction.Register(userInfo)

    // }else if(action === 'input.number'){
    //         console.log(text.length)
    //         if(text.length === 6){
    //             apiLine.replaymessage(replyToken , fulfillmentText)
    //         }else{
    //             let fulfillmentText = 'กรุณากรอกให้ครบ 6 ตัว'
    //             apiLine.replaymessage(replyToken , fulfillmentText)

    //         }

    // }else{
    //     apiLine.replaymessage(replyToken , fulfillmentText)
    // }
}