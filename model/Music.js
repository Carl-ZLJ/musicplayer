const fs = require('fs')
const mm = require('musicmetadata')
const utils = require('../utils')

function musicFromPath(musicName) {
    const filePath = 'db/' + musicName
    const data = fs.createReadStream(filePath)
    return data
}

function dealMetaData(metaData, callback) {
    mm(metaData, function(err, result) {
        if(err != null) {
            throw(err)
        } else {
            callback(result)
        }
    })
}

function coverUrl(metaData) {
    const title = metaData.title
    const format = metaData.picture[0].format
    const data = metaData.picture[0].data
    const path = `db/${title}.${format}`
    if(utils.fileExist(path) == false) {
        utils.writeToFile(path, data)
    }
    return path
}

function getMusicInfo(musicName) {
    const metaData = musicFromPath(musicName)
    dealMetaData(metaData, function(result) {
        utils.log('result', result)
        const m = new Music(result)
        m.save()
    })
}

// getMusicInfo('戴荃 - 悟空 (Live).mp3')

function Music(metaData) {
    this.title = metaData.title
    this.artist = metaData.artist
    this.album = metaData.album
    this.genre = metaData.genre
    this.coverUrl = coverUrl(metaData).slice(3)
}

Music.prototype.save = function() {
    const path = 'db/metadata.json'
    const musics = utils.musicsFromFile(path)
    // utils.log('musics', musics)
    for (let i = 0; i < musics.length; i++) {
        const music = musics[i]
        if(utils.objEqual(music, this) == true) {
            return
        }
    }
    musics.push(this)
    const ms = JSON.stringify(musics)
    utils.writeToFile(path, ms)
}

const m = {
    data: utils.musicsFromFile('db/metadata.json')
}

m.all = function() {
    let musics = this.data
    return musics
}

m.init = function() {
    const musicNames = utils.musicsInDir('db')
    // utils.log('musicNames', musicNames)
    for (var i = 0; i < musicNames.length; i++) {
        const musicName = musicNames[i]
        getMusicInfo(musicName)
    }
}

// m.init()
m.get = function(name) {
    const data = musicFromPath(name)
    return data
}
module.exports = m
