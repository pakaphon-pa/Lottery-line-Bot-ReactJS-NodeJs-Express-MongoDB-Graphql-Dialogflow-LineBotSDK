const mongoose = require('mongoose')
const lotterySchema = require('../schema/lottery')

module.exports = mongoose.model('lottery' , lotterySchema)