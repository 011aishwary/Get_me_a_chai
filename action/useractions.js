"use server"

import Razorpay from "razorpay"
import User from "../models/User"
import Payment from "../models/Payment"
import mongoose from "mongoose"
import connectDB from "../db/connectDB"
import crypto from "crypto"

const algorithm = 'aes-256-cbc';
// Use a 32-byte key from environment variables, or a fallback for development
const secretKey = process.env.ENCRYPTION_KEY;

const encrypt = (text) => {
    if (!text) return text;
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

const decrypt = (text) => {
    if (!text) return text;
    try {
        const textParts = text.split(':');
        if (textParts.length !== 2) return text; // Not encrypted in expected format
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    } catch (error) {
        // If decryption fails (e.g., it was not encrypted previously), return the original text
        return text;
    }
};

export const initiate = async (amount, to_user, form) => {
    await connectDB();
    let v = await User.findOne({ username: to_user });
    // console.log(v)
    
    var instance = new Razorpay({
        key_id: decrypt(v.razorpayId),
        key_secret: decrypt(v.razorpaySecret),
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
    
    // Decrypt razorpay credentials before sending to client
    if (user && user.length > 0) {
        if (user[0].razorpayId) user[0].razorpayId = decrypt(user[0].razorpayId);
        if (user[0].razorpaySecret) user[0].razorpaySecret = decrypt(user[0].razorpaySecret);
    }
    
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
    console.log(ndata)
    
    // Encrypt razorpay credentials before saving
    if (ndata.razorpayId) ndata.razorpayId = encrypt(ndata.razorpayId);
    if (ndata.razorpaySecret) ndata.razorpaySecret = encrypt(ndata.razorpaySecret);

    if (ndata.username !== oldusername) {
        let u = await User.findOne({ username: oldusername })
        if (u) {
            return { error: "Username already taken" }
        }
    }
    await User.updateOne({ username: oldusername }, ndata)
}

export const searchUsers = async (query) => {
    if (!query || query.trim() === "") return [];
    await connectDB();
    // Search for users where username matches the query (case-insensitive)
    let users = await User.find({ 
        username: { $regex: query, $options: "i" } 
    }).limit(5).select("username profilepic name");
    
    return JSON.parse(JSON.stringify(users));
}

export const getFeaturedUsers = async () => {
    await connectDB();
    // Get 5 random users who have a profile picture
    let users = await User.aggregate([
        { $match: { profilepic: { $exists: true, $ne: "" } } },
        { $sample: { size: 5 } },
        { $project: { username: 1, profilepic: 1, name: 1, _id: 0 } }
    ]);
    
    // If not enough users with profile pics, just get some random users
    if (users.length < 5) {
        const moreUsers = await User.aggregate([
            { $match: { profilepic: { $exists: false } } },
            { $sample: { size: 5 - users.length } },
            { $project: { username: 1, profilepic: 1, name: 1, _id: 0 } }
        ]);
        users = [...users, ...moreUsers];
    }
    
    return JSON.parse(JSON.stringify(users));
}
