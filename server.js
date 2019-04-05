const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')


const log = console.log.bind(console)

const app = express()
app.use(express.static('static'))
app.use(bodyParser.json())

const registeRoutes = function(app, routes) {
    for (var i = 0; i < routes.length; i++) {
        const route = routes[i]
        app[route.method](route.path, route.func)
    }
}

// music
const musicRoutes = require('./route/musicRoute')
registeRoutes(app, musicRoutes)

const server = app.listen(8081, function() {
    const address = server.address().address
    const port = server.address().port
    // log(server.address())
    log(`访问地址为${address}:${port}`)
})
