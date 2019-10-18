const userTC = require('../typecompose/users')
const user = require('../model/users')

userTC.addResolver({
    name:'CreateUser',
    type:`type payload { payload : Boolean , name:String , lastname:String }`,
    args:{
        record: `input UserInput{
            name:String,
            lastname:String,
            lineId:String
        }`
     },
    resolve : async ({ args }) =>{
        try{
            console.log(args.record.lineId)
            const match = await user.findOne({ lineId:args.record.lineId})
            if(match){
                return { payload : false }
            }

            const userData = new user({
                name: args.record.name,
                lastname:args.record.lastname,
                lineId: args.record.lineId
            })

            await userData.save()

            return { payload : true , name : args.record.name , lastname : args.record.lastname }
        }catch(err){
            throw Error(err.message)
        }

    }
})

userTC.addResolver({
    name:'AddNumber',
    type:`type numberPayload { payload : Boolean }`,
    args:{
        record: `input NumberInput{
            number:String,
            userId:String
        }`
    },
    resolve : async({ args }) =>{
        try{   
            console.log(`เลขคือ ${args.record.number}`)

            const users = await user.findOne({ lineId : args.record.userId })

            
            users.number.unshift({number : args.record.number , date: '2019-08-30'})

            await Lottery.save()

            return { payload : true }
        }catch(err){
            throw Error(err.message)
        }
    }
})

userTC.addResolver({
    name:'AddMyPrize',
    type:'type AddMyPrizePayload { payload : Boolean }',
    args:{
        record :`input Addmyprize {
        userId: String
        number: String,
        first : Boolean,
        threeDigitSuffix: Boolean
    }`},
    resolve : async ({ args }) =>{
        const users = await user.findOne({ lineId : args.record.userId})
        console.log(users)
        await users.number.unshift({ number : args.record.number , first : args.record.first})
        console.log(users)

        
        await users.save()
        return { payload : true }

    }
})

const objUser = {
    AddMyPrize: userTC.getResolver('AddMyPrize'),
    Register:userTC.getResolver('CreateUser')

        
    // LotteryNumberInput: userTC.getResolver('AddNumber'),
    // LotteryCreateOne : userTC.getResolver('createOne')
}

module.exports= objUser