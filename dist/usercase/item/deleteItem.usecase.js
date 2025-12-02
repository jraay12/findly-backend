"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteItemUsecase = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class DeleteItemUsecase {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    async execute(id) {
        // Retrieve all items from repository
        const items = await this.itemRepository.findItemById(id);
        if (!items)
            throw new Error("Item not found");
        const filesToDelete = [items.image_url, items.qr_image_url];
        filesToDelete.forEach((file) => {
            if (file) {
                // __dirname points to this file, so go to root
                const filePath = path_1.default.join(process.cwd(), file);
                if (fs_1.default.existsSync(filePath)) {
                    fs_1.default.unlinkSync(filePath);
                    console.log(`Deleted file: ${filePath}`);
                }
            }
        });
        await this.itemRepository.deleteItemById(id);
        return { message: "Successfully remove" };
    }
}
exports.DeleteItemUsecase = DeleteItemUsecase;
