import http from 'http'
import fs from 'fs'

const filePath = 'data/users.json'

const server = http.createServer((req, res) => {
    if (req.url === '/read') {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500)
                return res.end(`Error ${err}`)
            }

            res.writeHead(200, {'content-type': 'application/json'})
            return res.end(data)
        } )
    }

    else {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500)
                return res.end(`Error ${err}`)
            }

            res.writeHead(200, {'content-type': 'application/json'})
            return res.end('Root url')
        } )
    }
})

server.listen(3000, () => console.log('server on http://localhost:3000'))