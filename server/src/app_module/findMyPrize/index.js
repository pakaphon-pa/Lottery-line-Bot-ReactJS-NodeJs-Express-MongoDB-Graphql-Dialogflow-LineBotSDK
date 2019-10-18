//////////////////// handle return graphql /////////////////

const graphql = require('./api/grahpql')

exports.findMyPrize = async ( userId ) =>{
    const result = await graphql.findMyprize(userId)

    return result 
}