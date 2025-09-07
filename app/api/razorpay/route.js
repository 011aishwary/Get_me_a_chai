import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "../../../models/Payment";
import connectDB from "../../../db/connectDB";
import Razorpay from "razorpay";
// import Pay from "@/app/pay/page";

export const POST = async (request) => {
    await connectDB();
    let body = await request.formData()
    body = Object.fromEntries(body);
    // console.log(body)

    // check if razorpay id is present on server
    let p = await Payment.findOne({ oid: body.razorpay_order_id })
    if (!p) {
        return NextResponse.json({ error: "OrderID not found" }, { status: 404 })
    }

    // verify the payment
    let xx=validatePaymentVerification({"order_id":body.razorpay_order_id , "payment_id":body.razorpay_payment_id} , body.razorpay_signature, process.env.NEXT_PUBLIC_RAZORPAY_SECRET_KEY)

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

