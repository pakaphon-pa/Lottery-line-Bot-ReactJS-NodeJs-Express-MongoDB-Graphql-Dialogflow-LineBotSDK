const dialogflow = require('dialogflow')
require('dotenv').config()

const sessionClient = new dialogflow.SessionsClient(process.env.GOOGLE_APPLICATION_CREDENTIALS)
const projectID = process.env.PROJECT_ID

exports.detectIntent = async (text,userId) =>{
    console.log(`event text is ${text}`)
    
    const sessionPath = await sessionClient.sessionPath(projectID , userId)
    const request = {
        session: sessionPath,
        queryInput:{
            text:{
                text:text,
                languageCode:'th'
            }
        }
    }
    console.log(sessionPath)
    

    return sessionClient.detectIntent(request)
}