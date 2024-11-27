import User from "../../models/userModel.js"
import CustomError from "../../utils/CustomError.js";

const getAllUsers = async (req, res) => {
    const users = await User.find({},{name:1,email:1,mobile:1,isBlocked:1,role:1});
    if (!users) {
        return res.status(200).json({ Users: [], message: "No users found" });
    }
    res.json({ data: users });
};

const getUserById= async (req, res ,next) => {
    const user = await User.findById(req.params.id,{name:1,email:1,mobile:1,isBlocked:1,role:1});
    if (!user) {
        return next(new CustomError("User not found", 404));
    }
    res.json({ data: user });
};

const blockUser = async (req, res,next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new CustomError("User not found", 404));
    }
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.status(200).json({message: user.isBlocked ? "User blocked" : "User unblocked"});
};

const totalNumberOfUsers = async (req, res) => {
    const users = await User.find();
    if (!users) {
        return res.status(200).json({ message: "No users found" });
    }
    res.status(200).json({ data: users.length });
};

export {getAllUsers,getUserById,blockUser,totalNumberOfUsers};