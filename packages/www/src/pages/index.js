import React, {useEffect, useState} from 'react'
import {Button, Container, Flex, Heading, NavLink} from 'theme-ui'
import netlifyIdentity from 'netlify-identity-widget'
import {Link} from 'gatsby'

export default props=> {
    const [user, setUser]=useState()
    useEffect(()=>{
        netlifyIdentity.init({})
    })
    netlifyIdentity.on("login", (user)=>{
        netlifyIdentity.close();
        setUser(user)
    })
    return(
        <Container>
            <Flex as="nav">
                <NavLink as={Link} to="/" p={2}> Home</NavLink>
                <NavLink as={Link} to="/app" p={2}> Dashboard</NavLink>
                <NavLink  p={2}>{user.user_metadata.full_name} </NavLink>
            </Flex>
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
    )
    }
