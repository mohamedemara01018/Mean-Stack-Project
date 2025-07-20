import express from "express";

import {
  register,
  login,
  getAllUsers,
  deleteUser,
  updateUser,
  refreshToken,
} from "../Controllers/user.controllers.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", register);
router.delete("/:id", deleteUser);
router.post('/:id', updateUser)
router.post("/auth/login", login);
router.post("/auth/refreshToken", refreshToken);


export default router;
