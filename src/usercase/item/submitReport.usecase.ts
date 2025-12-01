import { ItemRepository } from "../../infrastructure/repositories/item.repository";

export class SubmitReport {
  constructor(private itemRepository: ItemRepository) {}

  async execute(data: any, token: string) {
    // Retrieve all items from repository
    const items = await this.itemRepository.findItemByToken(token);

    if (!items) throw new Error("Item not found");

    const report = await this.itemRepository.submitReport(data);

    return { success: true, report };
  }
}
