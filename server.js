const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const utils = require('./utils')


const app = express()
app.use(express.static('static'))
app.use(express.static('db'))
app.use(bodyParser.json())

const registerRoutes = function(app, routes) {
    for (var i = 0; i < routes.length; i++) {
        const route = routes[i]
        app[route.method](route.path, route.func)
    }
}

// music
const musicRoutes = require('./route/musicRoute')
registerRoutes(app, musicRoutes)
// index
const indexRoutes = require('./route/indexRoute')
registerRoutes(app, indexRoutes)

const server = app.listen(8081, 'localhost', function() {
    // utils.log('__dirname', __dirname)
    const address = server.address().address
    const port = server.address().port
    // utils.log(server.address())
    utils.log(`访问地址为${address}:${port}`)
})
