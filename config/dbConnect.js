import mongoose from "mongoose";

const dbConnect = () => {
  console.log(mongoose.connection.readyState);
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  mongoose.connect(process.env.DB_LOCAL_URI);
};

export default dbConnect;
