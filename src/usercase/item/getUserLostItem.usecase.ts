import { UserItem } from "../../domain/item.entity";
import { ItemRepository } from "../../infrastructure/repositories/item.repository";
export class GetUserLostItemUsecase {
  constructor(private itemRepository: ItemRepository) {}

  async execute(user_id: number) {
    return await this.itemRepository.getLostItem(user_id);
  }
}
