const express = require('express')
const graphlqHTTP = require('express-graphql')
const grahpql = require('./src/graphlq')
const connectDB = require('./config/db')
const line = require('@line/bot-sdk')
const cors = require('cors')
const linemessage = require('./src/line')
const handlemessage = require('./src/handlemessage')
require('dotenv').config()


connectDB()

const app = express()

const config = {
    channelAccessToken: process.env.channelAccessToken,
    channelSecret: process.env.channelSecret
}

app.post('/webhook', line.middleware(config) , async (req,res) =>{
        Promise
        .all(req.body.events.map(handlemessage.handlemessage))
        .then((result) => res.json(result))
      
        
        

})

app.use(cors()) // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *
app.use('/graphql', graphlqHTTP(req =>({
        schema:grahpql,
        rootValue:grahpql,
        graphiql: true
}))
)

app.get('/',(req,res) => res.send('BoT running'))

const PORT = process.env.PORT || 9352

app.listen(PORT , ()=>console.log(`Server Run BOT on PORT: ${PORT}`))