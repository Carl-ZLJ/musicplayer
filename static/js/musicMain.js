const e = (sel) => document.querySelector(sel)

const es = (sel) => document.querySelectorAll(sel)

const log = console.log.bind(console)

const api = new musicApi()

function musicTemplate(music) {
    const title = music.title
    const album = music.album
    const artist = music.artist
    const genre = music.genre
    const coverUrl = music.coverUrl

    let t = `
        <div class="list-item">
            <div>${title}</div>
            <div>${artist}</div>
            <div>${album}</div>
            <div>${genre}</div>
            <div>${coverUrl}</div>
        </div>
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
    element.innerHTML = html
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
