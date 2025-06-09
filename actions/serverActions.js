'use server';
import connectDB from "@/db/connectDb";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import User from "@/models/User";

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

export const fetchUserDetails = async (email) => {
  await connectDB();

  const data = await User.findOne({ email }).lean(); 

  if (!data) {
    throw new Error("Email does not exist");
  }

  const plainData = {
    ...data,
    id: data._id?.toString?.() || "",
    createdAt: new Date(data.createdAt).toISOString(),
    _id: undefined,
    __v: undefined,
  };

  return plainData;
};


export const handleAction = async(formData) => {
    try {
        await connectDB();
        const currentUser = await fetchUserName(formData.email);
        
        if(currentUser === formData.username){
            return {success:false,message:'username is already exist!'};
        }else{
            await User.updateOne({email:formData.email},{$set:formData});
            await Payment.updateMany({to_user:currentUser},{$set:{to_user:formData.username}});
            return {success:true,message:'data successfully saved on db'};
        }
    } catch (error) {
        return {success:false,message:error.message};
    }
}


export const fetchUserName = async (email) => {
    try {
        await connectDB();
        const user = await User.findOne({email:email});
        if(!user){
            throw new Error("Username not found");
        }else{
            return user.username;
        }
    } catch (error) {
        console.error(error.message);
    }
}


export const fetchPaymentDetails = async (username) => {
    await connectDB();
    const data = await Payment.find({to_user:username,done:true})    
    let totalAmount = 0,totalAmountCount = 0;
    if(!data){
        return {totalAmount,totalAmountCount};
    }
    data.forEach((d,idx)=>{
        totalAmount += d.amount;
        totalAmountCount = idx+1;
    });
    return {totalAmount,totalAmountCount};
}


export const fetchProfilePic = async (username) => {
    await connectDB();
    const data = await User.findOne({username:username});
    if(data){
        return data.profilePic;
    }
}
