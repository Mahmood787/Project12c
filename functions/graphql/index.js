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
        todos:(parent,args,{user})=> {
            if(!user){
                return []
            }else{
                return Object.values(todoss)
            }
    }},
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

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({context})=>{
        if(context.clientContext.user){

            return {user: context.clientContext.user.sub}
        }
        else{
            return {}
        }
    }
})
exports.handler = server.createHandler({
    cors: {
        origin: "*",
        credentials: true
    }
})
