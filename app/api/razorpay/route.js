import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "../../../models/Payment";
import connectDB from "../../../db/connectDB";
import User from "../../../models/User";
import Razorpay from "razorpay";
import crypto from "crypto";

const algorithm = 'aes-256-cbc';
const secretKey = process.env.ENCRYPTION_KEY;

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

export const POST = async (request) => {
    await connectDB();

    let body = await request.formData()
    body = Object.fromEntries(body);
  

    // check if razorpay id is present on server
    let p = await Payment.findOne({ oid: body.razorpay_order_id })
    if (!p) {
        return NextResponse.json({ error: "OrderID not found" }, { status: 404 })
    }

    // Fetch the user to get the razorpay secret
    let user = await User.findOne({ username: p.to_user })
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    
    // Decrypt the secret
    let secret = decrypt(user.razorpaySecret)

    // verify the payment
    let xx=validatePaymentVerification({"order_id":body.razorpay_order_id , "payment_id":body.razorpay_payment_id} , body.razorpay_signature, secret)

    if (xx) {
        // update payment status in db
        const updatedPayment = await Payment.findOneAndUpdate(
            { oid: body.razorpay_order_id },
            { done: true },
            { new: true }
        )
        // redirect user to success page
        
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`, { status: 303 })
    } else {
        return NextResponse.json({ error: "Payment verification failed" }, { status: 500 })
    }
}

