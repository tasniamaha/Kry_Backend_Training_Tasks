import { createServer } from 'http'
import app from './app'

const portNumber:number=8000

// app.listen(portNumber,()=>{
//     console.log(`Server running at http://localhost:${portNumber}`)
// })
async function server(port:number):Promise<void>{

    const nodeServer=createServer(app)

    nodeServer.listen(port,()=>{
        console.log(`Server running at http://localhost:${port}`)
    })
    nodeServer.on('error',(error:NodeJS.ErrnoException)=>{
        nodeServer.close()
    })
}

(async()=>{
    console.log('Start')
    await server(portNumber)
})();