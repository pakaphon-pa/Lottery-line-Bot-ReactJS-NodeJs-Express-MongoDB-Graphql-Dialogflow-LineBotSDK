import { schemaComposer } from 'graphql-compose'


const queries = require('./quries')
const mutation = require('./mutation')

schemaComposer.Query.addFields(queries)
schemaComposer.Mutation.addFields(mutation)

const graphqlSchema = schemaComposer.buildSchema()
module.exports = graphqlSchema