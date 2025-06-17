
import { Server, Socket } from "socket.io"
import { getSocketIo } from "../../server"
import todoModel from "../models/todoModel"
import { IDelTodo, ITodo, IUpdateStatus } from "../types/todoType"


class Todo{
     private io:Server | undefined
     constructor(){
        this.io = getSocketIo()!
        this.io.on("connection",(socket: Socket)=>{
            console.log("New client connected")
            socket.on("addToDo",(data)=>this.handleAddTodo(socket,data))
            socket.on("deleteTodo",(data)=>this.handleDeleteTodo(socket,data))
            socket.on("updateTodoStatus",(data)=>this.handleUpdateTodoStatus(socket,data))
        })
    }
    private async handleAddTodo(socket:Socket, data:ITodo){
       try {
        const {task,deadline,status} = data
        await todoModel.create({
            task,
            deadline,
            status
        })
        const todos = await todoModel.find()
        socket.emit("todos_updated",{
            status : "success",
            message : "successfully creates",
            data : todos
        }) 
       } catch (error) {
        socket.emit("todo_response",{
            status : "error",
            error
        })
        
       }
    }

    private async handleDeleteTodo(socket:Socket,data:IDelTodo){
        try {
            const {id} = data
            const deletedData = await todoModel.findByIdAndDelete(id)
            if(!deletedData){
                socket.emit("todo_response",{
                    status : "success",
                    data : "todo not found"
                })
                return
            }
            const todos = await todoModel.find()
            socket.emit("todo_updated",{
                status : "success",
                data : todos

            })
        } catch (error) {
            socket.emit("todo_resposne",{
                status : "error",
                error
            })
            
        }
    }

    private async handleUpdateTodoStatus(socket:Socket,data:IUpdateStatus){
        const {id, status} = data
        const todo = await todoModel.findByIdAndUpdate(id,{status})

        if(!todo){
            socket.emit("todo_response",{
                status : "error",
                message : "Todo not found"
            })
            return 
        }
        socket.emit("todo_updated",{
            status :"success",
            message : todo
        })


    }



}
export default new Todo()


















    // io.on("connection",(socket)=>{

    //     // send data to bcackend
    //     socket.on("firstdata",(data)=>{
    //         console.log(data)
    //         io.emit("resp",{
    //             message : "I have received data"
    //         })

    //     })

    //     console.log("someone connected")
    // })