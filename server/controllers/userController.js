import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN);
};

// route for register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).send("user already exist");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.status(201).json({ success: true, token, user });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user=await User.findOne({email})
    if(!user){
      return res.status(400).send("user doesnt exist");
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
      return res.status(400).send('invalid credintails')
    }
    const token=createToken(user._id)
    res.json({success:true,token,user})
  } catch (error) {
    console.log(error);
    res.json({error:error.message})
  }
};

export { registerUser, loginUser };
