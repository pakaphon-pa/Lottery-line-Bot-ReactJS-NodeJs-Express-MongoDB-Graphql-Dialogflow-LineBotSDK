const usersTC = require('../typecompose/users')
const user = require('../model/users')

usersTC.addResolver({
    name:'InspectUser',
    type:`type Inspectpayload { payload:Boolean , name : String , lastname : String }`,
    args:{
        record:`input userId{
            lineId : String
        }`
    },
    resolve: async ({ args }) =>{
        console.log(`lineUserId is ${ args.record.lineId }`)
        const match = await user.findOne({ lineId : args.record.lineId })
        if(match){
            /// active member
            return { payload : false , name : match.name , lastname : match.lastname}
        }else{
            /// non member
            return { payload : true }

        }


    }
})

usersTC.addResolver({
    name:'myPrizeNumber',
    type:['type myPrizeNumber {  number : String , first : Boolean }'],
    args:{
        record: `input userIdPrize{
            lineId : String
        }`
    },
    resolve: async ({ args }) =>{
        const users = await user.findOne({ lineId : args.record.lineId })
   
   
        if(users.number.filter(number => number).length > 0){
            const number = users.number.map(number => number)
            console.log(number)
            return number
        }
        return null
    }
})

const  objUser = {
    userPrize: usersTC.getResolver('myPrizeNumber'),
    InspectUser: usersTC.getResolver('InspectUser'),
    lotteryById: usersTC.getResolver('findById'),
    userAll : usersTC.getResolver('findMany')

}

module.exports = objUser