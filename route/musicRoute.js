const m = require('../model/Music')
const utils = require('../utils')

const all = {
    method: 'get',
    path: '/music/all',
    func: function(request, response) {
        const musics = m.all()
        const r = JSON.stringify(musics)
        response.send(r)
    }
}

const init = {
    method: 'get',
    path: '/music/init',
    func: function(request, response) {
        m.init()
        response.send('加载成功')
    }
}

const play = {
    method: 'get',
    path: '/music/:musicName',
    func: function(request, response) {
        const musicName = request.params.musicName
        utils.log('musicName', musicName, request.params)
        const data = m.get(musicName)
        const r = JSON.stringify(data)
        response.send(r)
    }
}

const routes = [
    all,
    init,
    play,
]

module.exports = routes
