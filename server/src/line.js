require('dotenv').config()
const line = require('@line/bot-sdk')

const config = {
    channelAccessToken: process.env.channelAccessToken,
    channelSecret: process.env.channelSecret
}

const client = new line.Client(config)



exports.replaymessage = async (replyToken , msg) =>{
        return client.replyMessage(replyToken,msg)
}

exports.pushmessage = async (userId , msg) =>{

    console.log(userId)
    return client.pushMessage(userId , msg , false )
}