//The file gatsby-browser.js lets you respond to actions within the browser, and wrap your site in additional components. The Gatsby Browser API gives you many options for interacting with the client-side of Gatsby.
const React = require('react');
const wrapRootElement = require('./wrape-root-element')
const {ApolloClient,ApolloProvider,InMemoryCache,HttpLink} = require('@apollo/client')

//seting Apollo client
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: "https://mahmood-project-12c.netlify.app/.netlify/functions/graphql"
    })
})

exports.wrapRootElement=({element})=>{
    return(
        <ApolloProvider client={client}>
            {wrapRootElement({element})}           
        </ApolloProvider>
    )
}