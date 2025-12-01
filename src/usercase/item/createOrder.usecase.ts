import { ItemRepository } from "../../infrastructure/repositories/item.repository";

export class CreateOrderUsecase {
  constructor(private itemRepository: ItemRepository) {}

  async execute(data: any) {
    // Retrieve all items from repository
    const items = await this.itemRepository.findAdminItemById(data.item_id);

    if (!items) throw new Error("Item not found");

    const user_item = await this.itemRepository.findItemById(data.user_item_id);
    if (!user_item) throw new Error("User Item not found");

    // const user = await this.itemRepository.finduserById(data.customer_id)

    // if(!user) throw new Error("User not found");

   
    const result = await this.itemRepository.createOrder(data);

    return { success: true, result };
  }
}
