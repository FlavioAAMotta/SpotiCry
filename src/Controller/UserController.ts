import { Request, Response } from "express";
import { UserBusiness } from "../Business/UserBusiness";

export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  signup = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body;
      const token = await this.userBusiness.signup({ name, email, password });
      res.status(200).send({ token });
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const token = await this.userBusiness.login({ email, password });
      res.status(200).send({ token });
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  };
}
