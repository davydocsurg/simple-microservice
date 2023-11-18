import amqp from "amqplib";
import config from "../config";
import CartController from "../controllers/CartController";

const connect = async () => {
    const connection = await amqp.connect(config.MESSAGE_BROKER_URL);
    return connection;
};

const createChannel = async () => {
    const connection = await connect();
    const channel = await connection.createChannel();

    return channel;
};

const handleUserRegistrationEvent = async () => {
    const channel = await createChannel();
    const QUEUE = "user-registration";
    const queue = await channel.assertQueue(QUEUE);
    channel.consume(queue.queue, async (message) => {
        const user = JSON.parse(message!.content.toString());
        console.log(user);
        CartController.createCart(user._id);
        channel.ack(message!);
    });
};

export { createChannel, handleUserRegistrationEvent };
