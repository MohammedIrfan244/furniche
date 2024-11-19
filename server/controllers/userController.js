import jwt from 'jsonwebtoken'

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_TOKEN)
}


const registerUser=async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const exist = await User.findOne({ email });
      if (exist) {
        res.status(400).send("user exist");
      }
      const hashedPassword=await bcrypt.hash(password,10)
      const newUser= new User({
          name,
          email,
          password:hashedPassword
      })
      const user=await newUser.save()
      const token=createToken(user._id)
      res.json({success:true,token})
    } catch (error) {
      console.log(error);
    }
  }

  export {registerUser}