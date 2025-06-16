import app from './src/app'
import { envconfig } from './src/config/config'
import connectDB from './src/config/db'



function startServer(){
    connectDB()
    const port = envconfig.port || 4000
    app.listen(port, ()=>{
        console.log(`server started successfully at ${port} `)
    })

}
startServer()