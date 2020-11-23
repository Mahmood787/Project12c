import React, {useContext} from 'react'
import {Button, Container, Flex, Heading, NavLink} from 'theme-ui'
import {Link} from 'gatsby'
import { IdentityContext } from '../../netlify-identity-context'

export default props=> {
    const {user,identity:netlifyIdentity} = useContext(IdentityContext)
    return(
        <Container>
            <Flex as="nav">
                <NavLink as={Link} to="/" p={2}> Home</NavLink>
                <NavLink as={Link} to="/app" p={2}> Dashboard</NavLink>
                {user && (
                    <NavLink href="#!" p={2}>{user.user_metadata.full_name} </NavLink>
                )}
            </Flex>
            <Flex sx={{flexDirection:"column"}} p={6}>
                <Heading as="h1">Wellcome to Serverless Todos App</Heading>
                <Button 
                    sx={{marginTop:"30px", color:"black"}}
                    onClick={()=>netlifyIdentity.open()}
                    >
                        Login To Todo App
                </Button>
            </Flex>
        </Container>
    )
    }
