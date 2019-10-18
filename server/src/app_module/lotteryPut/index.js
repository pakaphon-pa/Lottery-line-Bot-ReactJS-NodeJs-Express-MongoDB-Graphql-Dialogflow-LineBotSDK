/////// handle message after use graphlq /////////////////

const graphql = require('./api/graphql')

exports.lotteryPut =  async (number , userId) =>{
    
    const result = await graphql.lotteryPut(number , userId)
    const { payload } = result.data.memoNumber
    return payload
}