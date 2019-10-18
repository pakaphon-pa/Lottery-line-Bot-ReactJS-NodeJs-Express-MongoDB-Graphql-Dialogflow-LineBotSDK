///// handle graphql Resgister //////////
import { HttpLink, createHttpLink } from 'apollo-link-http'
import fetch from'node-fetch'
import { gql, makePromise, execute } from 'apollo-boost'
require('dotenv').config()

const link = createHttpLink({
    uri: process.env.Graphqlurl
    ,fetch:fetch
})

exports.Register = ( name , lastname , userId ) =>{
        const query = gql`
        mutation($name : String , $userId : String , $lastname: String){
            Register(record:{
                  name:$name,
                  lastname:$lastname
                  lineId:$userId
            }){
              payload
            }
          }`

          return makePromise(execute(link,{
              query,
              variables:{
                  name,
                  userId,
                  lastname
              }
          })).then(data => data).catch(err => console.error(err))
}

