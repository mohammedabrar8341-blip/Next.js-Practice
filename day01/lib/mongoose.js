import dns from "dns";
import mongoose from "mongoose";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
console.log("Node DNS:", dns.getServers());

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema(
  {
    username: String,
    email: String,
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
