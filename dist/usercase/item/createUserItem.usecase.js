"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserItemUsecase = void 0;
const crypto_1 = __importDefault(require("crypto"));
const qrcode_1 = __importDefault(require("qrcode"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CreateUserItemUsecase {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    async execute(data, file) {
        // 1. Save the uploaded image
        const uploadsFolder = path_1.default.join(process.cwd(), "findly-upload", "user_item_images");
        if (!fs_1.default.existsSync(uploadsFolder)) {
            fs_1.default.mkdirSync(uploadsFolder, { recursive: true });
        }
        const imageFilename = `${Date.now()}_${file.originalname}`;
        const imagePath = path_1.default.join(uploadsFolder, imageFilename);
        fs_1.default.writeFileSync(imagePath, file.buffer); // save file from memory
        // URL to store in DB
        const imageUrl = `/findly-upload/user_item_images/${imageFilename}`;
        // 2. Generate QR token
        const qrToken = crypto_1.default.randomBytes(16).toString("hex"); // 32 chars
        // 3. Create item in repository
        const created = await this.itemRepository.createUserItem({
            ...data,
            qr_token: qrToken,
            image_url: imageUrl,
        });
        // 4. Generate QR code asynchronously
        this.generateQrImageAsync(created.id, qrToken);
        return created;
    }
    async generateQrImageAsync(itemId, qrToken) {
        try {
            const qrFolder = path_1.default.join(process.cwd(), "findly-upload", "user_item_qr");
            if (!fs_1.default.existsSync(qrFolder)) {
                fs_1.default.mkdirSync(qrFolder, { recursive: true });
            }
            const qrFile = path_1.default.join(qrFolder, `qr_${itemId}.png`);
            // Include token in QR URL
            const qrUrl = `${process.env.FRONTEND_URL}/report-item?token=${qrToken}`;
            // Generate QR image
            await qrcode_1.default.toFile(qrFile, qrUrl, { errorCorrectionLevel: "H" });
            // Update DB with QR image path
            await this.itemRepository.updateQrImage(itemId, `findly-upload/user_item_qr/qr_${itemId}.png`);
        }
        catch (err) {
            console.error("Failed to generate QR:", err);
        }
    }
}
exports.CreateUserItemUsecase = CreateUserItemUsecase;
