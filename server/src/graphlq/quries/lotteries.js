const lotteryTC = require('../typecompose/lottery')
const lottery = require('../model/lottery')
const user = require('../model/users')
const apiLine = require('../../line')


lotteryTC.addResolver({
    name:'findMynumber',
    type: [lotteryTC],
    args: {
        record : `input findUserId{
            lineId:String
        }`
    },
    resolve: async ({ args }) =>{

        const result = await lottery.find({ lineId : args.record.lineId })
        return result
    }
})


  

/// use in web management
lotteryTC.addResolver({
    name:'findPrizenumber',
    type:[`type prizePayload{

        number:String,
        lineId:String,
        name:String

    }`],
    args:{
        record: `input findPrizenumber{
            number : String
        }`
    },
    resolve: async ({ args }) =>{

        const result = await lottery.aggregate([
                {
                    $match:{
                    number:args.record.number
                }},
                { 
                $lookup:{
                    from:'users',
                    localField:'lineId',
                    foreignField:'lineId',
                    as:'usersInfo'
            }},{
                $project:{
                    number:1,
                    lineId:1,
                    usersInfo:{
                        name:1
                    }
            }},{$unwind : "$usersInfo"},{
                $project:{
                    number:1,
                    lineId:1,
                    name:"$usersInfo.name"
                }
            }
            ])
   
            result.map(e =>  callprize(e.lineId , e.name , e.number) )
            return result

    }
})


// const SavePrizeToUser = (userId , number) =>{
//     const user = await user.findOne({ lineId : userId})

//     if(user.number)
// }

/////// ประกาศรางวัล ////////
const callprize = ( userId , name , number) =>{
    let msg = [{
        type:'text',
        text:`คุณ ${name} ผู้โชคดีถูกรางวัลจากเลข ${number}`
    }]
    
    

    apiLine.pushmessage(userId , msg)
}



const objlottery = {
    findMynumber: lotteryTC.getResolver('findMynumber'),
    findnumberAll : lotteryTC.getResolver('findMany'),
    findPrizenumber : lotteryTC.getResolver('findPrizenumber')
}

module.exports = objlottery