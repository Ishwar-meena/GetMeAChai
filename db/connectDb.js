import mongoose from "mongoose";

const connectDB = async () => {
    try {
        let connection;
        if(!connection){
            connection = await mongoose.connect("mongodb://localhost:27017/chai");
        }
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

export default connectDB;