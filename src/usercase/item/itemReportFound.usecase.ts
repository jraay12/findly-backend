import { UserItem } from "../../domain/item.entity";
import { ItemRepository } from "../../infrastructure/repositories/item.repository";

export class ItemReportFoundUsecase {
  constructor(private itemRepository: ItemRepository) {}

  async execute(user_id: number) {
    // Retrieve lost items from repository
    const report = await this.itemRepository.itemReportFoundByUser(user_id);

    return { report, success: true };
  }
}
