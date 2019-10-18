const mongoose = require('mongoose')
const userSchema = require('../schema/users')

module.exports = mongoose.model('user' , userSchema)