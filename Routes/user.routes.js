import express from "express";
import bcrypt from "bcryptjs";

import {
  register,
  login,
  getAllUsers,
  deleteUser,
} from "../Controllers/user.controllers.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

export default router;
