//////////////// handle message after user graphql ////////////////

const graphql = require('./api/graphql')


exports.InspectUser = async (userId) =>{

        console.log(userId)

        const result = await graphql.InspectUser(userId)
        const { payload , name ,lastname  } = result.data.InspectUser
        //// choose obj data 
        const resultInfo = {
                payload,
                name,
                lastname
        }

        console.log(resultInfo)

        return resultInfo
}