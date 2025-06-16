import mongoose from "mongoose";
import { envconfig } from "./config";

const connectDB = async (): Promise<void> => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Database connected successfully")
        });

        mongoose.connection.on("error", (err) => {
            console.error("Database connection error:", err)
        });

        mongoose.connection.on("disconnected", () => {
            console.log("Database disconnected")
        });

        await mongoose.connect(envconfig.connectionString as string)
       
    } catch (error) {
        console.error("Failed to connect to database:", error)
        process.exit(1)
    }
};

export default connectDB;