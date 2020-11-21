const {ApolloServer, gql} = require('apollo-server-lambda')
// construct schema using glq

const typeDefs= gql`
type Query{
    todos:[Todo]!
}
type Todo{
    id: ID!
    text: String!
    done: Boolean!
}
type Mutation{
    addTodo(text:String!):Todo
    updateTodoDone(id:ID!):Todo
}
`;
const todoss={}
let todosIndex = 0;
// resolver function fro schema
const resolvers = {
    Query:{
        todos:()=> {
            return Object.values(todoss)
    },
    Mutation:{
        addTodo:(_,{text})=>{
            todosIndex++;
            const id = `key-${todosIndex}`;
            todoss[id]={id,text,done:false}
            return todoss[id]
        },
        updateTodoDone:(_,{id})=>{
            todoss
            [id].done=true
            return todoss[id]
        }
    }
}
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})
exports.handler = server.createHandler()
