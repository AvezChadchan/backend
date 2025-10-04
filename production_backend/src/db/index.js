import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected!! DB Host : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Error while connecting DB", error);
    process.exit(1); //this is used to terminate the current node.js process immediately
  }
};

export default connectDB;
