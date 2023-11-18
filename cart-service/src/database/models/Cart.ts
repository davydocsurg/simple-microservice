import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface ICart extends Document {
    userId: string;
    items: [
        {
            productId: string;
            quantity: number;
        }
    ];
}

const CartSchema: Schema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        // user -cart: one to many
        // cart - product: many to many
        items: [
            {
                productId: {
                    type: String,
                },
                quantity: {
                    type: Number,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Cart = mongoose.model<ICart>("Cart", CartSchema);
export default Cart;
