import { ItemRepository } from "../../infrastructure/repositories/item.repository";

export class GetAllLostUserItemUsecase {
  constructor(private itemRepository: ItemRepository) {}

  async execute() {
    const result = await this.itemRepository.getAllLostItem();

    return { result };
  }
}
