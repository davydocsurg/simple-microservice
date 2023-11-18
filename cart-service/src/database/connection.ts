import mongoose from "mongoose";
import config from "../config";

export const connectDB = async () => {
    try {
        console.info("Connecting to database..." + config.MONGODB_URI);
        await mongoose.connect(config.MONGODB_URI!);
        console.info("Database connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
