const React=  require('react')
const {ThemeProvider}=  require('theme-ui')
const {light}=  require('@theme-ui/presets')
const {Provider} = require('./netlify-identity-context')
const newTheme ={
    ...light,
    sizes: {container: 1024}
}

//this going to be a wraper for element
module.exports= ({element})=>(
    <Provider>

            <ThemeProvider theme={newTheme} >{element}</ThemeProvider>

    </Provider>
)