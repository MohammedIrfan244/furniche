import User from "../../models/userModel.js";
import CustomError from "../../utils/CustomError.js";

// Controller to get all users
const getAllUsers = async (req, res) => {
  const users = await User.find(
    {},
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
  const users = await User.find();
  if (!users) {
    return res.status(200).json({ message: "No users found" });
  }
  const blockedUsers = users.filter((user) => user.isBlocked === true);
  const unblockedUsers = users.filter((user) => user.isBlocked === false);
  res.status(200).json({
    status: "success",
    message: "Users stats fetched successfully",
    totalUsers: users.length,
    blockedUsers: blockedUsers.length,
    unblockedUsers: unblockedUsers.length,
  });
};

export { getAllUsers, getUserById, blockUser, totalNumberOfUsers };
