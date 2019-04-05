const ajax = function(request) {
    const r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    const header = request.header[0]
    const value = request.header[1]
    r.setRequestHeader(header, value)
    r.onreadystatechange = function() {
        if(r.readyState == 4 && r.status == 200) {
            request.callback(r)
        }
    }
    const data = JSON.stringify(request.data)
    r.send(data)
}
