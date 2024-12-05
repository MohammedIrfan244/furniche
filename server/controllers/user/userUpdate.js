import User from "../../models/userModel.js";
import CustomError from "../../utils/CustomError.js";

export const updateUser = async (req, res, next) => {
        const user = await User.findById(req.user.id);
        if (!user) {    
            return next(new CustomError("User not found", 404));
        }
        const image=user.image
        if (req.file) {
            image = req.file.path;
        }
        user.set(...req.body, image);
        await user.save();
        res.status(200).json({ status: "success", message: "User updated successfully" });
};