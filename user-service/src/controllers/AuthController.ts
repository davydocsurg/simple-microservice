import { Request, Response } from "express";
import User, { IUser } from "../database/models/User";
import { createChannel } from "../utils";

const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password,
        });

        await publishUserRegistration(user);
        return res.json({ user });
    } catch (error: any) {
        console.error(error.message);
    }
};

const publishUserRegistration = async (user: IUser) => {
    try {
        const channel = await createChannel();
        await channel.assertQueue("user-registration");
        channel.sendToQueue(
            "user-registration",
            Buffer.from(JSON.stringify(user))
        );
    } catch (error) {
        console.error(error);
    }
};

export default {
    register,
};
