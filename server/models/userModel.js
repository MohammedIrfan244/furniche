import mongoose from "mongoose";

// model for user, the cart and order can be populated later
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, default: "" ,required:false},
    password: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
    role: { type: String, default: "User" },
    refreshToken: { type: String },
    profile:{type:String,required:false},
  },
  { timestamps: true }
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
