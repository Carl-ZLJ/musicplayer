const bindEvent = (sel, eventName, callback) => {
    e(sel).addEventListener(eventName, callback)
}

const bindEventAll = (sel, eventName, callback) => {
    const elements = es(sel)
    for (var i = 0; i < elements.length; i++) {
        const element = elements[i]
        element.addEventListener(eventName, callback)
    }
}

const removeClass = function(className) {
    const element = e(`.${className}`)
    if(element != null) {
        element.classList.remove(className)
    }
}

const nextMusic = function() {
    let curr = e('.active')
    if(curr == null) {
        curr = es('.list-item')[0]
    } else if(curr.nextElementSibling !== null) {
        curr = curr.nextElementSibling
    } else {
        curr = es('.list-item')[0]
    }
    return curr
}

const prevMusic = function() {
    let curr = e('.active')
    if(curr == null) {
        curr = es('.list-item')[0]
    } else if(curr.previousElementSibling !== null && curr.previousElementSibling != e('.list-title')) {
        curr = curr.previousElementSibling
    } else {
        curr = e('.music-list').lastElementChild
    }
    return curr
}

const currMusic = function() {
    const audio = e('audio')
    const lists = es('.list-item')
    for (var i = 0; i < lists.length; i++) {
        const lst = lists[i]
        const path = srcFromMusic(lst)
        const baseURI = audio.baseURI
        const src = baseURI + path
        // log('src', src, audio.src)
        if(src == decodeURI(audio.src)) {
            // log('lst', lst)
            return lst
        }
    }
}

const srcFromMusic = function(element) {
    const defaultMusicTitle = element.querySelector('.item-title').innerText
    const defaultMusicArtist = element.querySelector('.item-artist').innerText.replace(/\//g, ',')
    const src = `${defaultMusicArtist} - ${defaultMusicTitle}.mp3`
    return src
}

const togglePlayButton = function() {
    const audio = e('audio')
    if(audio.paused) {
        audio.play()
        e('.play-button').innerHTML = `<i class="fas fa-pause"></i>`
    } else {
        audio.pause()
        e('.play-button').innerHTML = `<i class="fa fa-play" aria-hidden="true"></i>`
    }
}

const changeMusic = function(currMusic) {
    removeClass('active')

    currMusic.classList.add('active')
    const audioTime = e('.audio-time')
    const duration = currMusic.querySelector('.item-duration').innerText
    audioTime.innerText = duration

    const audio = e('audio')
    const path = srcFromMusic(currMusic)
    const baseURI = audio.baseURI
    const src = baseURI + path

    if(src !== decodeURI(audio.src)) {
        audio.src = src
    }
}

const getRate = function() {
    const audio = e('audio')
    const progressBar = e('.progress')

    const barWidth = progressBar.offsetWidth
    const duration = audio.duration
    // px/s
    const rate = barWidth / duration
    return rate
}

const updateProgress = function() {
    const audio = e('audio')

    const rate = getRate()
    const progressIcon = e('.progress-play')
    const playedTime = e('.played-time')

    const currentTime = audio.currentTime

    playedTime.innerText = timeFromStamp(currentTime)
    progressIcon.style.left = rate * currentTime + 'px'
}

const dragEvent = function() {
    let draggable = false
    e('.progress-play').addEventListener('mousedown', function(event) {
        draggable = true
        log('drag start')
    })
    e('.progress-play').addEventListener('mouseover', function(event) {
        if(draggable) {
            log('event', event)

        }
    })
    e('.progress-play').addEventListener('mouseup', function(event) {
        draggable = false
        log('drag end')
    })
}

const bindEvents = function() {
    bindEvent('.play-button', 'click', function(event) {
        // log('event', event)
        const curr = currMusic()
        changeMusic(curr)
        togglePlayButton()
    })

    bindEvent('.music-list', 'click', function(event) {
        // log('event', event)
        const target = event.target
        const curr = target.closest('.list-item')
        if(curr !== null) {
            changeMusic(curr)
            togglePlayButton()
        }
    })

    bindEvent('audio', 'ended', function(event) {
        // log('event', event)
        const next = nextMusic()
        changeMusic(next)
        togglePlayButton()
    })

    bindEvent('audio', 'timeupdate', function(event) {
        updateProgress(event)
    })

    bindEvent('.play-next', 'click', function(event) {
        const next = nextMusic()
        changeMusic(next)
        togglePlayButton()
    })

    bindEvent('.play-prev', 'click', function(event) {
        const prev = prevMusic()
        changeMusic(prev)
        togglePlayButton()
    })

    bindEvent('.progress', 'click', function(event) {
        log('event', event)
        const x = event.offsetX
        const rate = getRate()

        const audio = e('audio')
        const progressIcon = e('.progress-play')
        const playedTime = e('.played-time')

        const currentTime = Math.round(x / rate)

        playedTime.innerText = timeFromStamp(currentTime)
        audio.currentTime = currentTime
        progressIcon.style.left = x + 'px'
    })

    bindEvent('.volume', 'click', function(event) {
        e('.vol-range').style.display = 'block'
    })
    bindEvent('.vol-range', 'blur', function(event) {
        e('.vol-range').style.display = 'none'
    })
    bindEvent('.vol-range', 'change', function(event) {
        const value = e('.vol-range').value
        if(value == 100) {
            e('.vol-icon').innerHTML = `<i class="fas fa-volume-up"></i>`
        } else if(value == 0) {
            e('.vol-icon').innerHTML = `<i class="fas fa-volume-mute"></i>`
        } else {
            e('.vol-icon').innerHTML = `<i class="fas fa-volume-down"></i>`
        }
        const audio = e('audio')
        audio.volume = value / 100
    })
}

const defaultPlay = function() {
    const audio = e('audio')
    const musicList = es('.list-item')[0]
    musicList.classList.add('active')
    const src = srcFromMusic(musicList)
    audio.src = src

    const audioTime = e('.audio-time')
    const duration = musicList.querySelector('.item-duration').innerText
    audioTime.innerText = duration
}

window.onload = function() {
    bindEvents()
    defaultPlay()
}
