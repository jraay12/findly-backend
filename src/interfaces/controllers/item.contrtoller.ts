import { Request, Response } from "express";
import {
  createUserItemUsecase,
  getUserLostItemUsecase,
} from "../../usercase/item";

class ItemController {
  async createUserItem(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const user_id = user.id;

      const result = await createUserItemUsecase.execute({
        ...req.body,
        user_id: user_id,
        created_by: user_id,
      });
      return res.json({
        message: "Create User Item Successfully",
        data: result,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async getUserLostItem(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const user_id = user.id;

      const result = await getUserLostItemUsecase.execute(user_id);
      return res.json({
        message: "User Lost item retrieve",
        result,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new ItemController();
