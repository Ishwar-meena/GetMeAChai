import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDb";


export const POST = async(req)=>{
    await connectDB();
    let body = await req.formData();
    body = Object.fromEntries(body);

    // check if razorpay payment id is available on server/db or not 
    const razorpayPaymentId = await Payment.findOne({orderId:body.razorpay_order_id});
    if(!razorpayPaymentId){
        return NextResponse.json({success:false,message:"Order id is not found"});
    }

    // verify the payment 
    const verify = validatePaymentVerification({"order_id":body.razorpay_order_id,"payment_id":body.razorpay_payment_id},body.razorpay_signature,process.env.KEY_SECRET);

    if(verify){
        // update payment 
        const updatedPayment = await Payment.findOneAndUpdate({orderId:body.razorpay_order_id},{done:"true"},{new:true});
        return NextResponse.redirect(`/${updatedPayment.to_user}?success=true`);
    }else{
        return NextResponse.json({success:false,message:"Payment verification is failed"});
    }


}