import amqp from "amqplib";
import config from "../config";

const connect = async () => {
    const connection = await amqp.connect(config.MESSAGE_BROKER_URL);
    return connection;
};

const createChannel = async () => {
    const connection = await connect();
    const channel = await connection.createChannel();

    return channel;
};

export { createChannel };
