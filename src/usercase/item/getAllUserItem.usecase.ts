import { ItemRepository } from "../../infrastructure/repositories/item.repository";
export class GetAllUserItemUsecase {
  constructor(private itemRepository: ItemRepository) {}

  async execute(user_id: number) {
    return await this.itemRepository.getAllItem(user_id);
  }
}
