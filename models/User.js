import mongoose from "mongoose";
const { Schema,model,models } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profilePic:{
        type:String,
    },
    razorpayId:{
        type:String,
    },
    razorpaySecret:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default models.User || model("User", userSchema);