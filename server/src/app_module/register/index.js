/////////////// handle message after graphql use //////////////

const graphlq = require('../register/api/graphql')

exports.Register = async (userId , name , lastname) =>{

    const result = await graphlq.Register(name , lastname , userId)
    const { payload } = result.data.Register

    return payload
}