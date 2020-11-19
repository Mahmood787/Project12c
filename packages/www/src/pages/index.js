import React from 'react'
import {Button, Container, Flex, Heading} from 'theme-ui'

export default props=> (
        <Container>
            <Flex sx={{flexDirection:"column", padding:3}}>
                <Heading as="h1">Hello World</Heading>
                <Button 
                    sx={{marginTop:2, color:"black"}}
                    onClick={()=>alert("Just Login bro")}
                    >
                        Login
                </Button>
            </Flex>
        </Container>
    )

