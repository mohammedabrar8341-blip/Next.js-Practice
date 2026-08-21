import dns from "dns";
import mongoose from "mongoose";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
console.log("Node DNS:", dns.getServers());

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: String,
  },
  { timestamps: true },
);

const TodoSchema = new Schema(
  {
    userId: ObjectId,
    title: String,
    completed: Boolean,
  },
  { timestamps: true },
);

export const UserModel =
  mongoose.models.users || mongoose.model("users", UserSchema);
console.log("UserModel:", UserModel); // Log the UserModel to verify it's defined

export const TodoModel =
  mongoose.models.todo || mongoose.model("todo", TodoSchema);

try {
  const MONGO_URL = process.env.MONGO_URL;

  if (!MONGO_URL) {
    console.warn("MongoDB URL is not set.");
  } else {
    await mongoose.connect(MONGO_URL);
    console.log("connected to DB");
  }
} catch (error) {
  console.error("MongoDB connection error:", error.message);
}
