///////////// handle graphql inspectUser //////////////////

import { createHttpLink } from 'apollo-link-http'
import fetch from 'node-fetch'
import { gql , makePromise , execute } from 'apollo-boost'
require('dotenv').config()

const link = createHttpLink({
    uri:process.env.Graphqlurl,
    fetch:fetch
})

exports.lotteryPut = ( number , userId ) =>{
        const query = gql`
        mutation($number : String , $userId:String){
            memoNumber(record:{
                  number:$number,
                  lineId:$userId
            }){
                payload
            }
          }`

          return makePromise(execute(link,{
              query,
              variables:{
                  number,
                  userId
              }
          })).then(data => data).catch(err => console.log(err))
}
