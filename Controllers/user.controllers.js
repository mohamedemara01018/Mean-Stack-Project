import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // تحقق إذا كان اليوزر أو الإيميل موجودين بالفعل
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User or Email already exists" });
    }

    // إنشاء مستخدم جديد - كلمة السر هتتشفر تلقائياً في pre save
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // البحث عن اليوزر بالإيميل
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // مقارنة كلمة السر
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // إنشاء Access Token و Refresh Token
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10h" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // ممكن تبعتي الريفرش توكن كـ HttpOnly cookie عشان أمان أكتر (اختياري)
    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
