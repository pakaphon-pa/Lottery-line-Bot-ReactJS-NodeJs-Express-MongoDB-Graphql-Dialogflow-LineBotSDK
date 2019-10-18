import { composeWithMongoose } from 'graphql-compose-mongoose'
const user = require('../model/users')

const customizationOptions = {}
const userTC = composeWithMongoose(user , customizationOptions)

module.exports = userTC