import User from "../../models/userModel.js";
import CustomError from "../../utils/CustomError.js";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new CustomError("User not found", 404));
    }
    req.body.email = user.email;

    if (req.file) {
      user.profile = req.file.path;
    }

    if (req.body.password&&req.body.password!=="") {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    if (req.body.name&&req.body.name!=="") {
      user.name = req.body.name;
    }
    if (req.body.password&&req.body.password!=="") {
      user.password = req.body.password;
    }

    if(req.body.mobile&&req.body.mobile!==""){
      user.mobie=req.body.mobile
    }
    // Save the updated user
    await user.save();

    // Send sanitized user details in the response
    const userDetails = {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        profile: user.profile,
    };

    res
      .status(200)
      .json({
        status: "success",
        data: userDetails,
        message: "User updated successfully",
      });
  } catch (err) {
    next(err);
  }
};
