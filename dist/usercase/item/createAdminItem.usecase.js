"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAdminItemUsecase = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CreateAdminItemUsecase {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    async execute(data, file) {
        // 1. Validate data first (before saving file)
        if (!data.product_title || !data.price || !data.available_quantity ||
            !data.category || !data.stock_status) {
            throw new Error("Missing required fields");
        }
        // 2. Prepare image path and filename (but don't save yet)
        const uploadsFolder = path_1.default.join(process.cwd(), "findly-upload", "admin_item_images");
        const imageFilename = `${Date.now()}_${file.originalname}`;
        const imagePath = path_1.default.join(uploadsFolder, imageFilename);
        const imageUrl = `/findly-upload/admin_item_images/${imageFilename}`;
        // 3. Prepare data for database
        const finalizeData = {
            product_title: data.product_title,
            product_description: data.product_description,
            price: Number(data.price),
            available_quantity: Number(data.available_quantity),
            category: data.category,
            badge: data.badge,
            stock_status: data.stock_status,
            product_image_url: imageUrl,
            created_by: data.created_by,
        };
        try {
            // 4. Create database record first
            const created = await this.itemRepository.createAdminItem(finalizeData);
            // 5. Only save file after successful database insert
            if (!fs_1.default.existsSync(uploadsFolder)) {
                fs_1.default.mkdirSync(uploadsFolder, { recursive: true });
            }
            fs_1.default.writeFileSync(imagePath, file.buffer);
            return created;
        }
        catch (error) {
            // Database failed, file was never saved - no cleanup needed
            throw error;
        }
    }
}
exports.CreateAdminItemUsecase = CreateAdminItemUsecase;
