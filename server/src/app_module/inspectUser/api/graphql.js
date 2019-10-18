///////////// handle graphql inspectUser //////////////////

import { createHttpLink } from 'apollo-link-http'
import fetch from 'node-fetch'
import { gql , makePromise , execute } from 'apollo-boost'
require('dotenv').config

const link = createHttpLink({
    uri: process.env.Graphqlurl,
    fetch:fetch
})

exports.InspectUser = ( userId ) =>{
        const query = gql`
        query( $userId : String){
            InspectUser(record:{
                  lineId:$userId
            }){
              payload,
              name,
              lastname
            }
          }`

          return makePromise(execute(link , {
              query,
              variables:{
                  userId
              }
          })).then(data => data).catch(err => console.err(err))

}