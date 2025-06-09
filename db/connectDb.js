import mongoose from "mongoose";

const connectDB = async () => {
    try {
        let connection;
        if(!connection){
            connection = await mongoose.connect(process.env.MONGOURI);
        }
    } catch (error) {
        console.error(error.message);
    }
}

export default connectDB;