import { ItemRepository } from "../../infrastructure/repositories/item.repository";
export class GetSpecificItemByTokenUsecase {
  constructor(private itemRepository: ItemRepository) {}

  async execute(token: string) {
    return await this.itemRepository.findItemByToken(token);
  }
}
