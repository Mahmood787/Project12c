import React, { useContext, useReducer, useRef, useState } from 'react'
import { Link} from '@reach/router'
import {IdentityContext} from '../../netlify-identity-context'
import {Flex, Container, NavLink, Input, Button,Label, Checkbox} from 'theme-ui'
import {gql, useMutation, useQuery} from '@apollo/client'

// Graphql queries
const ADD_TODO =gql`
    mutation($type:String!){
        addTodo(text:"one todo"){
            id
        }
    }
`;
const UPDATE_TODO_DONE = gql`
    mutation UpdateTodoDone($type: ID!){
        updateTodoDone(id:$id){
            text
            done
        }
    }
`; 
const GET_TODOS=gql`
    query GetTods{
        todos{
            id
            text
            done
        }
    }
`;
const todosReducer=(state, action)=>{
    switch(action.type){
        case "addTodo":
            return [{done:false, value:action.payload},...state]
        case "toggleTodo":
            const newSate = [...state]
            newSate[action.payload]={
                done: !state[action.payload].done,
                value: state[action.payload].value
            }
            console.log(state[action.payload])
            return newSate
    }
}

export default  ()=>{
    const {user, identity:netlifyIdentity} = useContext(IdentityContext)
    const inputRef = useRef()
    const [todos, dispatch]= useReducer(todosReducer,[])
    const [addTodo]= useMutation(ADD_TODO)
    const [updateTodoDone ] = useMutation(UPDATE_TODO_DONE)
    const {loading,error,data,refetch} = useQuery(GET_TODOS)
    return (
        <Container>
            <Flex as="nav">
                <NavLink as={Link} to="/" p={2}> Home</NavLink>
                <NavLink as={Link} to="/app" p={2}> Dashboard</NavLink>
                {user && (
                    <NavLink 
                    href="#!" p={2}
                    onClick={()=>{
                        netlifyIdentity.logout()
                    }}
                    >
                      Logout  {user && user.user_metadata.full_name} 
                    </NavLink>
                )}
            </Flex>
            <Flex as="form" onSubmit={e=>{
                e.preventDefault()
                addTodo({variables:{text:inputRef.current.value}})
                inputRef.current.value=""
            }}>
                <Label sx={{display:"flex"}}>
                    <span>Add todo</span>
                    <Input ref={inputRef} sx={{marginLeft:1}} />
                </Label>
                <Button sx={{marginLeft:1}}>Submit</Button>
            </Flex>
            <Flex sx={{flexDirection:"column"}}>
                {loading ? (<div>Loading...</div>):null}
                {error ? (<div>{error.message}</div>):null}
                {!loading && !error && (
                <ul sx={{listStyleType:"none"}}>
                    {todos.map((todo) =>(
                        <Flex as="li" 
                            onClick={()=>{
                                updateTodoDone({variables:{id: todo.id}})
                                
                            }}
                        >
                            <Checkbox checked={todo.done}/>
                            <span>{todo.value}</span>
                        </Flex>
                    ))}
                </ul>
                )}
            </Flex>
        </Container>
    )}