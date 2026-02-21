"use server"

import Razorpay from "razorpay"
import User from "../models/User"
import Payment from "../models/Payment"
import mongoose from "mongoose"
import connectDB from "../db/connectDB"

export const initiate = async (amount, to_user, form) => {
    await connectDB();
    let v = await User.findOne({ username: "Aishwary Gupta" });
    // console.log(v)
    
    var instance = new Razorpay({
        key_id: v.razorpayId,
        key_secret: v.razorpaySecret,
    });



    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    const order = await instance.orders.create(options)

    // creat payment object which shows pending payment in db
    await Payment.create({ oid: order.id, amount: amount / 100, to_user: to_user, name: form.name, message: form.message })
    return order;
}

export const fetchUser = async (username) => {
    let userto = decodeURIComponent(username).replace(/\s+/g, " ")
    // console.log(userto)
    await connectDB();
    let u = await User.find({ username: userto })
    let user = JSON.parse(JSON.stringify(u));
    // console.log(user)
    return user;
}
export const fetchPayments = async (username) => {
    await connectDB();
    let payments = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 })
    payments = JSON.parse(JSON.stringify(payments));
    // console.log(payments)
    return payments;
}

export const updateUser = async (data, oldusername) => {
    await connectDB();
    let ndata = Object.fromEntries(data);
    // console.log(ndata)
    if (ndata.username !== oldusername) {
        let u = await User.findOne({ username: oldusername })
        if (u) {
            return { error: "Username already taken" }
        }
    }
    await User.updateOne({ email: ndata.email }, ndata)
}
