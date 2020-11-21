import React, { useContext } from 'react'
import {Router, Link} from '@reach/router'
import {IdentityContext} from '../../netlify-identity-context'
import {Flex, Heading, Button, Container, NavLink} from 'theme-ui'
import Dashboard from '../components/Dashboard'
let DashLoggedOut = ()=> {
    const {user, identity:netlifyIdentity} = useContext(IdentityContext)
    return (
        <Container>       
            <Flex sx={{flexDirection:"column", padding:3}}>
                <Heading as="h1">Hello World</Heading>
                <Button 
                    sx={{marginTop:2, color:"black"}}
                    onClick={()=>netlifyIdentity.open()}
                    >
                        Login
                </Button>
            </Flex>
    </Container>
    )}

export default props =>{
    const {user} = useContext(IdentityContext)
    if(!user){
        return (
            <Router >
                <DashLoggedOut path="/app/" />
            </Router>
        )
    }
    return (
        <Dashboard/>
    )
}