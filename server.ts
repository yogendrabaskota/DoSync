import app from './src/app'
import { envconfig } from './src/config/config'
import connectDB from './src/config/db'
import {Server} from 'socket.io'



function startServer(){
    connectDB()
    const port = envconfig.port || 4000
    const server = app.listen(port, ()=>{
        console.log(`server started successfully at ${port} `)
    })
    const io = new Server(server)
    io.on("connection",(socket)=>{

        // send data to bcackend
        socket.on("firstdata",(data)=>{
            console.log(data)
            socket.emit("resp",{
                message : "I have received data"
            })

        })

        //console.log(socket.id)
        console.log("someone connected")
    })




}
startServer()