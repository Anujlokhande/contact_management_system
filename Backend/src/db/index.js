import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`).then(() => {
      console.log("Connected To Database Successfully");
    });
  } catch (error) {
    console.error("Error", error);
  }
};

export default connectDB;
