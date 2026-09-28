import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "lib/mongodb";
import User from "models/User";

export async function updateProfile(
  req: NextApiRequest,
  res: NextApiResponse,
  userEmail: string
) {
  try {
    await connectDB();

    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required.",
      });
    }

    const user = await User.findOne({
      email: userEmail,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Check whether another account already uses this email
    const existingUser = await User.findOne({
      email,
      _id: { $ne: user._id },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "This email is already in use.",
      });
    }

    user.name = name;
    user.email = email;

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      message: "Failed to update profile.",
    });
  }
}
export async function getProfile(
  req: NextApiRequest,
  res: NextApiResponse,
  userEmail: string
) {
  try {
    await connectDB();

    const user = await User.findOne({
      email: userEmail,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      message: "Failed to get profile.",
    });
  }
}

export async function getAllUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      users,
    });
  } catch (error) {
    console.error("Get users error:", error);

    return res.status(500).json({
      message: "Failed to get users.",
    });
  }
}