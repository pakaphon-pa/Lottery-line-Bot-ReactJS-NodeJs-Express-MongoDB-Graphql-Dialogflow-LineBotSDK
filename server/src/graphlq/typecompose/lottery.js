import { composeWithMongoose } from 'graphql-compose-mongoose'
const lottery = require('../model/lottery')

const customizationOptions = {}
const lotteryTC = composeWithMongoose(lottery , customizationOptions)

module.exports = lotteryTC