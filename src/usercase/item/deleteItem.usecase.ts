import { ItemRepository } from "../../infrastructure/repositories/item.repository";
import fs from "fs";
import path from "path";

export class DeleteItemUsecase {
  constructor(private itemRepository: ItemRepository) {}

  async execute(id: number) {
    // Retrieve all items from repository
    const items = await this.itemRepository.findItemById(id);

    if (!items) throw new Error("Item not found");

    const filesToDelete = [items.image_url, items.qr_image_url];

    filesToDelete.forEach((file) => {
      if (file) {
        // __dirname points to this file, so go to root
        const filePath = path.join(process.cwd(), file);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`Deleted file: ${filePath}`);
        }
      }
    });

    await this.itemRepository.deleteItemById(id);

    return { message: "Successfully remove" };
  }
}
