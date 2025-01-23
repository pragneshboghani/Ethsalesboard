import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

// *************Live Data**************

export const connectMongo = async () => {
  try {
    const dbConnection = await mongoose.connect(
      "mongodb+srv://pritkumargodhani:Dt6J7Cg3hZynMUQg@cluster0.cnvfk.mongodb.net/eth_bot"
    );

    console.log("Mongodb Connected");
    return dbConnection;
  } catch (error) {
    console.error(
      `Unable to connect database: ${JSON.stringify(error.message)}`
    );
  }
};

// *************Dummy Data**************

// export const connectMongo = async () => {
//   return mongoose.connect(
//     process.env.CONFIG ??
//     "mongodb+srv://prit:ZC0RzEe176bsy7Md@cluster0.ms5cm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//   );
// };
