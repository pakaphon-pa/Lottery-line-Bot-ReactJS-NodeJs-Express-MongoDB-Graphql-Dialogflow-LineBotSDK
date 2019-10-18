const mongoose = require('mongoose')

const Lottery = mongoose.Schema({
        number:{
            type:String,
            require:true
        },
        lineId:{
            type:String,
            require:true
        },
        date:{
            type:Date,
            default:Date.now
        }
})

module.exports = Lottery