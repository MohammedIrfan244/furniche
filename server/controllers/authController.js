import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN);
};

// controller to handle register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    // check if user already exist
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).send("user already exist");
    }
    // creating salt and hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creating user
    const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    // adding user to db and creating token
    const user = await newUser.save();
    const token = createToken(user._id);
    res.status(201).json({ success: true, token, user });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};


// controller to handle login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if use exist
    const user=await User.findOne({email})
    if(!user){
      return res.status(400).send("user doesn't exist");
    }
    // check if password match
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
      return res.status(400).send('invalid credentials')
    }
    // creating token for logged in user
    const token=createToken(user._id)
    res.json({success:true,token,user})
  } catch (error) {
    console.log(error);
    res.json({error:error.message})
  }
};

export { registerUser, loginUser };
