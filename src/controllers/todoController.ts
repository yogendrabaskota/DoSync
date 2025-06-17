import { Server, Socket } from "socket.io";
import { getSocketIo } from "../../server";
import todoModel from "../models/todoModel";
import { EStatus, IDelTodo, ITodo, IUpdateStatus } from "../types/todoType";

class Todo {
  private io: Server | undefined;
  constructor() {
    this.io = getSocketIo()!;
    this.io.on("connection", (socket: Socket) => {
      console.log("New client connected");
      socket.on("addTodo", (data) => this.handleAddTodo(socket, data));
      socket.on("deleteTodo", (data) => this.handleDeleteTodo(socket, data));
      socket.on("updateTodoStatus", (data) =>this.handleUpdateTodoStatus(socket, data))
      socket.on("fetchTodos",()=>this.fetchTodo(socket))
      
    });
  }
  private async handleAddTodo(socket: Socket, data: ITodo) {
    try {
      const { task, deadline, status } = data;
      await todoModel.create({
        task,
        deadline,
        status,
      });
      const todos = await todoModel.find({ status: EStatus.Pending });
      socket.emit("todos_updated", {
        status: "success",
        message: "successfully creates",
        data: todos,
      });
    } catch (error) {
      socket.emit("todos_response", {
        status: "error",
        error,
      });
    }
  }

  private async handleDeleteTodo(socket: Socket, data: IDelTodo) {
    try {
      const { id } = data;
      const deletedData = await todoModel.findByIdAndDelete(id);
      if (!deletedData) {
        socket.emit("todos_response", {
          status: "success",
          data: "todo not found",
        });
        return;
      }
      const todos = await todoModel.find({ status: EStatus.Pending });
      socket.emit("todos_updated", {
        status: "success",
        data: todos,
      });
    } catch (error) {
      socket.emit("todos_resposne", {
        status: "error",
        error,
      });
    }
  }

  private async handleUpdateTodoStatus(socket: Socket, data: IUpdateStatus) {
    try {
      const { id, status } = data;
      const todo = await todoModel.findByIdAndUpdate(id, { status });

      if (!todo) {
        socket.emit("todos_response", {
          status: "error",
          message: "Todo not found",
        });
        return;
      }
      const todos = await todoModel.find({ status: EStatus.Pending });
      socket.emit("todos_updated", {
        status: "success",
        message: todos,
      });
    } catch (error) {
      socket.emit("todos_resposne", {
        status: "error",
        error,
      });
    }
  }

  private async fetchTodo(socket:Socket){
try {
    const todos = await todoModel.find({status : EStatus.Pending})
    socket.emit("todos_updated",{
        status : "success",
        data : todos
    })
} catch (error) {
    socket.emit("todos_resposne",{
        status :"Error",
        error
    })
}
  }

}
export default new Todo();

