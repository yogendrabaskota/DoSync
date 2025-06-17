import express, { Request, Response } from 'express'
import path from 'path'
import ('../src/controllers/todoController')

const app = express()
app.set("view engine","ejs")

app.set("views",path.join(__dirname,'views'))
app.get("/",(req:Request,res:Response)=>{
    res.render("home.ejs")
})



export default app