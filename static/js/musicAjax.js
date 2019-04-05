const ajax = function(request, callback) {
    const r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    const header = request.header[0]
    const value = request.header[1]
    r.responseType = 'arraybuffer'
    r.setRequestHeader(header, value)
    r.onreadystatechange = function() {
        if(r.readyState == 4 && r.status == 200) {
            callback(r)
        }
    }
    const data = JSON.stringify(request.data)
    r.send(data)
}

const musicApi = function() {
    this.baseUrl = 'http://localhost:8081'
}

musicApi.prototype.all = function(callback) {
    const request = {
        method: 'get',
        url: '/music/all',
    }
    ajax(request, callback)
}

musicApi.prototype.init = function(callback) {
    const request = {
        method: 'get',
        url: '/music/init',
    }
    ajax(request, callback)
}
musicApi.prototype.play = function(musicName, callback) {
    const path = '/music/' + musicName
    const request = {
        method: 'get',
        url: path,
    }
    ajax(request, callback)
}
