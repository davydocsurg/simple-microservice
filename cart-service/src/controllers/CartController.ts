import { Request, Response } from "express";
import User, { ICart } from "../database/models/Cart";
import { createChannel } from "../utils";
import Cart from "../database/models/Cart";

const createCart = async (userId: string) => {
    const cart = await Cart.create({
        userId,
        items: [],
    });

    return cart;
};

export default {
    createCart,
};
