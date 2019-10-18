//////////////// handle grahpql ///////////////

import { createHttpLink } from 'apollo-link-http'
import fetch from 'node-fetch'
import { gql , makePromise , execute } from 'apollo-boost'
require('dotenv').config

const link = createHttpLink({
    uri : process.env.Graphqlurl,
    fetch:fetch
})


exports.findMyprize = (userId) =>{
    const query = gql`
    query($userId : String){
      userPrize(record:{
        lineId:$userId
      }){
        first
        number    
      }
    }
    `

    return makePromise(execute(link ,{
        query,
        variables:{
            userId
        }
    })).then(data => data).catch(err => console.error(err))
}

