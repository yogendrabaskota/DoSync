export interface ITodo {
    task : string,
    deadline : string,
    status : EStatus
}

export enum EStatus {
    Completed = 'completed',
    Pending = 'pending'
}
export interface IDelTodo {
    id : string
}

export interface IUpdateStatus{
    id : string,
    status : EStatus
}