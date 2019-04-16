const e = (sel) => document.querySelector(sel)

const es = (sel) => document.querySelectorAll(sel)

const log = console.log.bind(console)

const api = new musicApi()

function timeFromStamp(time) {
    let seconds = Math.floor(time % 60)
    if(seconds < 10) {
        seconds = '0' + seconds
    }
    let minutes = Math.floor(time / 60)
    if(minutes < 10) {
        minutes = '0' + minutes
    }
    return `${minutes}:${seconds}`
}

function musicTemplate(music) {
    const title = music.title
    const album = music.album
    const artist = music.artist[0]
    const genre = music.genre[0] || 'Other'
    const coverUrl = music.coverUrl
    const duration = timeFromStamp(music.duration)
    let t = `
        <li class="list-item">
            <div class="item-title">${title}</div>
            <div class="item-artist">${artist}</div>
            <div class="item-album">${album}</div>
            <div class="item-genre">${genre}</div>
            <div class="item-duration">${duration}</div>
        </li>
    `
    return t
}

function insertMusicAll(musics) {
    let html = ''
    for (var i = 0; i < musics.length; i++) {
        const music = musics[i]
        html += musicTemplate(music)
    }
    let element = e('.music-list')
    element.insertAdjacentHTML('beforeend', html)
}

function insertMusic() {
}

function musicAll() {
    api.all(function(r) {
        // log('r', r)
        let musics = JSON.parse(r.response)
        insertMusicAll(musics)
    })
}

function __main() {
    musicAll()
}

__main()
