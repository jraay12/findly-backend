import { Request, Response } from "express";
import { createUserItemUsecase } from "../../usercase/item";

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
}

export default new ItemController();
