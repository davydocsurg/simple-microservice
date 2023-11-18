import express from "express";
import config from "./config";
import { connectDB } from "./database/connection";
import { handleUserRegistrationEvent } from "./utils";

const app = express();

app.use(express.json());

connectDB();

const server = app.listen(config.PORT, () => {
    console.log(`Server is running in ${config.PORT}`);
});

handleUserRegistrationEvent();

const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.log("Server closed");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error: unknown) => {
    console.error(error);
    exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
