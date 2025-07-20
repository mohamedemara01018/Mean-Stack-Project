import bcrypt from "bcryptjs";
import User from "../Models/user.models.js";
import generateTokens from "../utils/generateTokens.js";
import { promisify } from 'util';
import jwt from 'jsonwebtoken'

/**
 * @route   GET /api/users
 * @desc    Get all users (admin only)
 * @access  Private/Admin
 */


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 * @access  Public
 */
export const register = async (req, res) => {
  const newUser = req.body;
  const email = newUser.email

  try {
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Email already exists" });

    const user = await User.create(newUser);

    res.status(201).json({ message: "User registered", user: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateUser = async (req, res) => {
  const { id } = req.params
  const updatedUser = req.body
  try {
    const user = await User.updateOne({ _id: id }, updatedUser);
    res.status(201).json({ message: 'user is updated', updatedUser })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}




/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user by ID (admin only)
 * @access  Private/Admin
 */
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) res.status(404).json({ message: "User not found" });
    res.status(204).json({ message: "User deleted", userId: id });
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
    if (!email || !password) {
      return res.status(400).json({ message: 'You must provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const { accessToken, refreshToken } = generateTokens({
      id: user._id,
      email: user.email
    });

    await User.findByIdAndUpdate(user._id, { refreshToken });

    return res.status(201).json({
      message: 'Login successful',
      accessToken,
      refreshToken
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to login' });
  }
};



export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(403).json({ message: 'The refresh token is required' });
  }

  try {
    const decoded = await promisify(jwt.verify)(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '6h' }
    );

    return res.status(201).json({ message: 'Token created successfully', accessToken });

  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};
