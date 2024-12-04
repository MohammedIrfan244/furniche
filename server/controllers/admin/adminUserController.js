import User from "../../models/userModel.js";
import CustomError from "../../utils/CustomError.js";

// Controller to get all users
const getAllUsers = async (req, res) => {
  const users = await User.find(
    {role:{$ne:"Admin"}},
    { name: 1, email: 1, mobile: 1, isBlocked: 1, role: 1 }
  );
  if (!users) {
    return res.status(200).json({ Users: [], message: "No users found" });
  }
  res
    .status(200)
    .json({
      status: "success",
      message: "Users fetched successfully",
      data: users,
    });
};

// Controller to get user by id
const getUserById = async (req, res, next) => {
  const user = await User.findById(req.params.id, {
    name: 1,
    email: 1,
    mobile: 1,
    isBlocked: 1,
    role: 1,
  });
  if (!user) {
    return next(new CustomError("User not found", 404));
  }
  res
    .status(200)
    .json({
      status: "success",
      message: "User fetched successfully",
      data: user,
    });
};

// Controller to block or unblock a user
const blockUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new CustomError("User not found", 404));
  }
  user.isBlocked = !user.isBlocked;
  await user.save();
  res
    .status(200)
    .json({
      status: "success",
      message: user.isBlocked ? "User blocked" : "User unblocked",
    });
};

// Controller to get total number of users
const totalNumberOfUsers = async (req, res) => {
  const totalUsers = await User.countDocuments({});
  const blockedUsers = await User.countDocuments({ isBlocked: true });
  const unblockedUsers = await User.countDocuments({ isBlocked: false });
  res.status(200).json({
    status: "success",
    message: "Users stats fetched successfully",
    totalUsers: totalUsers,
    availableUsers: blockedUsers,
    unavailableUsers: unblockedUsers,
  });
};

export { getAllUsers, getUserById, blockUser, totalNumberOfUsers };
