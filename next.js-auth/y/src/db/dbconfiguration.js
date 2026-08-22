import mongoose from "mongoose";

export async function Connect() {
  try {
    if (!process.env.MONOS_URL) {
      throw new Error("MONOS_URL is not configured");
    }

    await mongoose.connect(process.env.MONOS_URL);

    // const connect = mongoose.connect;

    // connect.on("connected", () => {
      console.log("Mongoose connected");
    // });
    // connect.on("error", (error) => {
    //   console.log("MongoDB connection error, Please check this error:: ", err);
    //   process.exit();
    // });
  } catch (error) {
    console.log("Something is went wrong Connection Error ", error);
    throw error;
  }
}
