import mongoose from "mongoose";


// model for user, the cart and order can be populated later
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    avatar: { type: String, required: false },
    password: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
    refreshToken:{type:String}
  },
  { timestamps: true }
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
