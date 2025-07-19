import bcrypt from "bcryptjs";
import User from "../Models/user.models.js";
import generateTokens from "../utils/generateTokens.js";

/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 * @access  Public
 */
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({
      username,
      email,
      password, // 👈 هنا بنبعت الباسورد زي ما هو، والموديل هيعمله hash تلقائيًا
    });

    res.status(201).json({ message: "User registered", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Login user and return tokens
 * @access  Public
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ Email not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("❌ Password mismatch");
      console.log("Plain password:", password);
      console.log("Hashed password in DB:", user.password);

      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("✅ Login successful");
    const tokens = generateTokens(user);
    res.json(tokens);
  } catch (err) {
    console.error("🔥 Error during login:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * @route   GET /api/users
 * @desc    Get all users (admin only)
 * @access  Private/Admin
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user by ID (admin only)
 * @access  Private/Admin
 */
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted", userId: id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
