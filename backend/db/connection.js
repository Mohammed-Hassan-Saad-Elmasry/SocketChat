import mongoose from "mongoose";
export const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://elmasry:ol320BYG7TwqWT3g@cluster0.knzr2ur.mongodb.net/chatSocket?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log(error.message);
  }
};
