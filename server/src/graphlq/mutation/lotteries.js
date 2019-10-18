const lotteryTC = require('../typecompose/lottery')
const lottery = require('../model/lottery')

lotteryTC.addResolver({
    name:'memoNumber',
    type:'type memoNumberPayload{ payload : Boolean }',
    args:{
        record:`input NumberInfo{
            lineId : String,
            number: String
        }`
    },
    resolve: async ({ args }) =>{
        console.log(`lineUserId: ${args.record.lineId} number is ${args.record.number}`)

        const match = await lottery.findOne({ lineId : args.record.lineId , number : args.record.number})
        console.log(match)

        if(match){
            console.log(`number is existing`)
            return { payload:false }
        }

        const numberData = new lottery({
            number:args.record.number,
            lineId:args.record.lineId
        })

        await numberData.save()

        return { payload:true }
    }
})

/////////////////// Add on web /////////////////



const objlottery = {
        memoNumber : lotteryTC.getResolver('memoNumber')
}

module.exports = objlottery

