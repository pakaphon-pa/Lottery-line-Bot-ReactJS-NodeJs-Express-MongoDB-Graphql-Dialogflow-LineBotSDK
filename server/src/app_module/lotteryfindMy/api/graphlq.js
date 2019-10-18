////////////////// handle grahpql findmynumber ///////////////
import { createHttpLink } from 'apollo-link-http'
import fetch from 'node-fetch'
import { gql , makePromise , execute } from 'apollo-boost'

const link = createHttpLink({
    uri:process.env.Graphqlurl,
    fetch:fetch
})

exports.findMyNumber = ( userId ) =>{
    const query = gql`
    query($userId:String){
        findMynumber(record:{
              lineId:$userId
        }){
            number
        }
      }`

      return makePromise(execute(link,{
          query,
          variables:{
              userId
          }
      })).then(data => data).catch(err => console.log(err))
}
