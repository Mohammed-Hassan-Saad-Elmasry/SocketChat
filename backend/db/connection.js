import mongoose from "mongoose";
export const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/socketIo");
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log(error.message);
  }
};
