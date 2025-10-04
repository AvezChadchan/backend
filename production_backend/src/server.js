//1 do DB related oprations(creation) on another file and import it here
//first import dotenv in the main file
import dotenv from "dotenv";
import connectDB from "./db/index.js"

dotenv.config();
connectDB();

//2 do DB related operations on same file
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";

// import express from "express";
// const app = express();

// import dotenv from "dotenv";
// dotenv.config();

// /*write semicolon before iife if the previous life doesn't have 1 then it will be useful; */

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
//     console.log(" MongoDB connected");
//     app.on("error", (error) => {
//       console.log("ERROR: ", error);
//       throw error;
//     });
//     app.get('/',(req,res)=>{
//         res.send('MongoDB is connected successfully')
//     })
//     app.listen(process.env.PORT || 3000, () => {
//       console.log(`App is listening on http://localhost:${process.env.PORT || 3000}`);
//     });
//   } catch (error) {
//     console.log("Error:", error);
//     throw error;
//   }
// })();
