import mongoose from "mongoose";
const { Schema,model,models } = mongoose;

const PaymentSchema = new Schema({
    orderId : {
        type : String,
        required : true,
    },
    amount : {
        type:Number,
        required: true,
    },
    to_user : {
        type : String,
        required : true,
    },
    name : {
        type:String,
        required : true,
    },
    message:{
        type:String,
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    },
    updatedAt:{
        type:Date,
        default: Date.now(),
    },
    done:{
        type:Boolean,
        default:false,
    }

});

export default models.Payment ||  model("Payment",PaymentSchema);