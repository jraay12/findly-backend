import { Request, Response } from "express";
import {
  createUserUseCase,
  getUserUseCase,
  loginUserUseCase,
  deactivateUserUseCase
} from "../../usercase/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/env";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const result = await createUserUseCase.execute(req.body);
      return res.json({
        message: "User created successfully",
        data: result,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const result = await getUserUseCase.execute();
      return res.status(200).json({
        message: "Users retrieved successfully",
        data: result,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const result = await loginUserUseCase.execute({ email, password });
      return res.status(200).json({
        token: result.token,
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async updateUserStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;

    try {
      await deactivateUserUseCase.execute({id: Number(id), status});
      return res.status(200).json({ message: "User status updated successfully" });
    } catch (error: any) {
       return res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
