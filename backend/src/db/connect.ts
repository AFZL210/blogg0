import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect("URI_HERE").then(() => console.log("connected to DB"))
}