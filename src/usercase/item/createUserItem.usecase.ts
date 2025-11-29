import { UserItem } from "../../domain/item.entity";
import { CreateUserItemDTO } from "../../domain/dto/item.dto";
import { ItemRepository } from "../../infrastructure/repositories/item.repository";
import crypto from "crypto";

export class CreateUserItemUsecase {
  constructor(private itemRepository: ItemRepository) {}

  async execute(data: CreateUserItemDTO) {
    
    // Generate QR token
    const qrToken = crypto.randomBytes(16).toString("hex"); // 32 chars


    // Create item in repository
    const created = await this.itemRepository.createUserItem({...data, qr_token: qrToken});
   

    return created;
  }
}
