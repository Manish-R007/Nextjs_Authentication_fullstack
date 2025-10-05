import mongoose from "mongoose";

export const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connectionString = mongoose.connection
        connectionString.on('connected', () => {
            console.log("Database connected successfully");
        })
        connectionString.on('error', (err) => {
            console.log("Database connection error:", err);
        })
    } catch (error) {
        console.log("Database connection error:", error);
        
    }
}