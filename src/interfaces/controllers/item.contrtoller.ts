import { Request, Response } from "express";
import {
  createUserItemUsecase,
  getUserLostItemUsecase,
  updateStatusUsecase,
  getAllUserItemUsecase,
  updateUserItemUsecase,
  getSpecificItemUsecase,
  getSpecificItemByTokenUsecase,
  sendQrScanNotificationUsecase,
  deleteItemUsecase,
  createAdminItemUsecase,
  getAdminItemUsecase,
  updateAdminItemStatusUsecase,
  updateAdminItemUsecase,
  createOrderUsecase,
  getOrdersUsecase,
} from "../../usercase/item";

interface MulterRequest extends Request {
  file: Express.Multer.File;
}

class ItemController {
  async createUserItem(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const user_id = user.id;

      const result = await createUserItemUsecase.execute(
        {
          ...req.body,
          user_id: user_id,
          created_by: user_id,
        },
        (req as any).file
      );
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

  async updateItemStatus(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const user_id = user.id;
      const item_id = parseInt(req.params.id);
      const { status } = req.body;

      const result = await updateStatusUsecase.execute(
        user_id,
        item_id,
        status
      );
      return res.json({
        message: "update status successfully",
        result,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async getAllUserItem(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const user_id = user.id;

      const result = await getAllUserItemUsecase.execute(user_id);
      return res.json({
        success: true,
        result,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async updateUserItem(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const user_id = user.id;
      const item_id = parseInt(req.params.id);

      const result = await updateUserItemUsecase.execute(
        { ...req.body, updated_by: user_id },
        item_id
      );
      return res.json({
        success: true,
        result,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async getSpecificItem(req: Request, res: Response) {
    try {
      const item_id = parseInt(req.params.id);
      const result = await getSpecificItemUsecase.execute(item_id);
      return res.json({
        successs: true,
        result,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async getSpecificItemByToken(req: Request, res: Response) {
    try {
      const token = req.params.token;
      const result = await getSpecificItemByTokenUsecase.execute(token);
      return res.json({
        successs: true,
        result,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async sendQRNotification(req: Request, res: Response) {
    try {
      const token = req.params.token;
      const result = await sendQrScanNotificationUsecase.execute(token);
      return res.json({
        successs: true,
        result,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async deleteItem(req: Request, res: Response) {
    try {
      const item_id = parseInt(req.params.id);
      const result = await deleteItemUsecase.execute(item_id);
      return res.json({
        successs: true,
        result,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async createAdminItem(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const user_id = user.id;

      const result = await createAdminItemUsecase.execute(
        {
          ...req.body,
          user_id: user_id,
          created_by: user_id,
        },
        (req as any).file
      );
      return res.json({
        message: "Create User Item Successfully",
        data: result,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async getAdminItem(req: Request, res: Response) {
    try {
      const result = await getAdminItemUsecase.execute();
      return res.json({
        successs: true,
        result,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async updateAdminItemStatus(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const result = await updateAdminItemStatusUsecase.execute(id);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async updateAdminItem(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const result = await updateAdminItemUsecase.execute(id, req.body);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async createOrder(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const user_id = user.id;
      const result = await createOrderUsecase.execute({
        ...req.body,
        customer_id: Number(user_id),
        created_by: Number(user_id),
      });
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async getOrder(req: Request, res: Response) {
    try {
      const result = await getOrdersUsecase.execute();
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new ItemController();
