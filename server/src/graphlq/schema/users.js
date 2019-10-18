const mongoose = require('mongoose')

const User = mongoose.Schema({
    name : {
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },
    lineId:{
        type:String,
        require:true
    },
    number:[
       {
           number:{
               type:String,
               require:true
           },
           date:{
               type: Date,
               default: Date.now,
               require:true
           },
           first:{
               type: Boolean,
               default:false
           },
           Second:{
               type:Boolean,
               default:false
           },
           third:{
               type:Boolean,
               default:false
           },
           fourth:{
               type:Boolean,
               default:false
           },
           fifth:{
               type:Boolean,
               default:false
           },
           threeDigitPrefix:{
               type:Boolean,
               default:false
           },
           threeDigitSuffix:{
               type:Boolean,
               default:false
           },
           twoDigitSuffix:{
               type:Boolean,
               default:false
           }

       }
    ]


})


module.exports = User