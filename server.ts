import app from './src/app'
import { envconfig } from './src/config/config'
import connectDB from './src/config/db'
import {Server} from 'socket.io'



let io:Server | undefined;
function startServer(){
    connectDB()
    const port = envconfig.port || 4000
    const server = app.listen(port, ()=>{
        console.log(`server started successfully at ${port} `)
    })
    io = new Server(server)

       
}

function getSocketIo() {
    if(!io){
        throw new Error("Socket io is not initiated yet")
    }else{
    return io
    }
}


startServer()
 export {getSocketIo}
