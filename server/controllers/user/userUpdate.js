import User from "../../models/userModel.js";
import CustomError from "../../utils/CustomError.js";

export const updateUser = async (req, res, next) => {
        const user = await User.findById(req.user.id);
        if (!user) {    
            return next(new CustomError("User not found", 404));
        }
        const profile=user.profile
        if (req.file) {
            profile = req.file.path;
        }
        user.set(...req.body, profile);
        await user.save();
        res.status(200).json({ status: "success", message: "User updated successfully" });
};