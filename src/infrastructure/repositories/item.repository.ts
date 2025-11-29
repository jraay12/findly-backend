import { prisma } from "../../infrastructure/prisma/client";
import { CreateUserItemDTO } from "../../domain/dto/item.dto";

export class ItemRepository {
  async createUserItem(data: CreateUserItemDTO, tx = prisma) {
    return await tx.user_item.create({
      data: {
        user_id: data.user_id,
        status: data.status,
        image_url: data.image_url,
        qr_token: data.qr_token,
        created_by: data.created_by,        
      }
      
    });
  }
}
