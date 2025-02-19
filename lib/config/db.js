import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://razith01:razith10113a@cluster0.vio8a.mongodb.net/blog-app');
    console.log("DB CONNECTED");
}