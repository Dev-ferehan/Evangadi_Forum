const express = require("express");
const userRouter = express.Router();
const { register, login, checkUser } = require("./Controllers/userController");
const authmiddleware = require("../AuthMiddleware/authmiddleware");

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/check", authmiddleware, checkUser);

module.exports = userRouter;
