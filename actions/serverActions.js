'use server';

import connectDB from "@/db/connectDb";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";

export const initiate = async (amount, to_user, paymentForm) => {
    await connectDB();

    var instance = new Razorpay({
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET,
    });

    const options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }
    const newOrder = await instance.orders.create(options);
    // create a payment object that show pending payment in database;
    await Payment.create({ orderId: newOrder.id, amount: amount, to_user: to_user, name: paymentForm.name, message: paymentForm.message });
    return newOrder;
}

export const fetchMessage = async (username) => {
    await connectDB();
    const messages = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).lean();
    // Convert _id and Date objects to string
    const safeMessages = messages.map(msg => ({
        ...msg,
        _id: msg._id.toString(),
        createdAt: msg.createdAt?.toISOString?.(),
        updatedAt: msg.updatedAt?.toISOString?.(),
    }));

    return safeMessages;
}