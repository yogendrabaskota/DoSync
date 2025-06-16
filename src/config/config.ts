import { config } from "dotenv";

config()
export const envconfig : connectionn = {
    port : process.env.PORT,
    connectionString : process.env.CONNECTION_STRING
}

export interface connectionn {
    port : string | undefined,
    connectionString : string | undefined
}