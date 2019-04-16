const fs = require('fs')

const log = console.log.bind(console)

function writeToFile(path, data) {
    fs.writeFileSync(path, data)
}

function fileExist(path) {
    let file
    if(fs.existsSync(path)) {
        file = fs.readFileSync(path)
    }
    // log('file', file, typeof file)
    if(file != undefined && file.length > 0) {
        return true
    }
    return false
}

function objEqual(origin, target) {
    return JSON.stringify(origin) == JSON.stringify(target)
}

//  ['张国荣 - 倩女幽魂 (《夏洛特烦恼》电影插曲_《港囧》电影插曲_《倩女幽魂》电影主题曲).mp3',
//  '戴荃 - 悟空 (Live).mp3' ]
function musicsInDir(path) {
    let musics = fs.readdirSync(path).filter(name => name.endsWith('.mp3'))
    return musics
}

function musicsFromFile(path) {
    let data = fs.readFileSync(path)
    let musics
    if(data.length > 0) {
        musics = JSON.parse(data)
    } else {
        musics = []
    }
    return musics
}

module.exports = {
    log,
    writeToFile,
    fileExist,
    objEqual,
    musicsInDir,
    musicsFromFile,
}
