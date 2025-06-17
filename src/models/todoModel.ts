import mongoose from "mongoose";
import { EStatus, ITodo } from "../types/todoType";

const Schema = mongoose.Schema

const todoSchema = new Schema<ITodo>({
    task : String,
    deadline : String,
    status : {
        type : String,
        enum : [EStatus.Completed,EStatus.Pending],
        default : EStatus.Pending
    }

})

const todoModel = mongoose.model("TodoModel",todoSchema)
export default todoModel
