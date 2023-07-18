import express from "express";
import { UserController } from "../Controller/UserController";
import { UserBusiness } from "../Business/UserBusiness";
import UserData from "../Data/UserData";
export const userRouter = express.Router();

const userBusiness = new UserBusiness(new UserData());

const userController = new UserController(userBusiness);

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
