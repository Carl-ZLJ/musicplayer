const fs = require('fs')
const utils = require('../utils')

function sendHtml(path, response) {
    const options = {
        encoding: 'utf-8'
    }
    fs.readFile(path, options, function(err, data) {
        if(err == null) {
            response.send(data)
        }
    })
}

const index = {
    method: 'get',
    path: '/',
    func: function(request, response) {
        const path = 'template/index.html'
        sendHtml(path, response)
    }
}

const routes = [
    index,
]

module.exports = routes
