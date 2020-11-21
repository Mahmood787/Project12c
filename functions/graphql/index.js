const {ApolloServer, gql} = require('apollo-server-lambda')
// construct schema using glq

const typeDefs= gql`
type Query{
    hello:String
}
`;
// resolver function fro schema
const resolvers = {
    Query:{
        hello:()=> "hello from resolver"
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})
exports.handler = server.createHandler()
