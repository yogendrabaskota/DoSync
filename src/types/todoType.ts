export interface ITodo {
    task : string,
    deadline : string,
    status : EStatus
}

export enum EStatus {
    Completed = 'completed',
    Pending = 'pending'
}