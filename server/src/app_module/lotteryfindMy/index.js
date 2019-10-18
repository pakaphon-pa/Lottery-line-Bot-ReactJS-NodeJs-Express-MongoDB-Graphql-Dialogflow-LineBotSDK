/////// handle message after use graphlq /////////////////

const graphql = require('./api/graphlq')

exports.findMylottery = async ( userId ) =>{
    
        const result = await graphql.findMyNumber(userId)
        const { data } = result

        return data
}