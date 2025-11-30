import { CreateUserItemDTO } from "../../domain/dto/item.dto";
import { ItemRepository } from "../../infrastructure/repositories/item.repository";
import crypto from "crypto";
import QRCode from "qrcode";
import fs from "fs";
import path from "path";

export class CreateUserItemUsecase {
  constructor(private itemRepository: ItemRepository) {}  

  async execute(data: CreateUserItemDTO, file: Express.Multer.File) {
    // 1. Save the uploaded image
    const uploadsFolder = path.join(process.cwd(), "findly-upload", "user_item_images");
    if (!fs.existsSync(uploadsFolder)) {
      fs.mkdirSync(uploadsFolder, { recursive: true });
    }

    const imageFilename = `${Date.now()}_${file.originalname}`;
    const imagePath = path.join(uploadsFolder, imageFilename);
    fs.writeFileSync(imagePath, file.buffer); // save file from memory

    // URL to store in DB
    const imageUrl = `/findly-upload/user_item_images/${imageFilename}`;

    // 2. Generate QR token
    const qrToken = crypto.randomBytes(16).toString("hex"); // 32 chars

    // 3. Create item in repository
    const created = await this.itemRepository.createUserItem({
      ...data,
      qr_token: qrToken,
      image_url: imageUrl,
    })

    // 4. Generate QR code asynchronously
    this.generateQrImageAsync(created.id, qrToken);

    return created;
  }

  private async generateQrImageAsync(itemId: number, qrToken: string) {
    try {
      const qrFolder = path.join(process.cwd(), "findly-upload", "user_item_qr");
      if (!fs.existsSync(qrFolder)) {
        fs.mkdirSync(qrFolder, { recursive: true });
      }

      const qrFile = path.join(qrFolder, `qr_${itemId}.png`);
      const qrUrl = `${process.env.FRONTEND_URL}/findly-upload/qr-images/qr_${itemId}.png`;

      // Generate QR image
      await QRCode.toFile(qrFile, qrUrl, { errorCorrectionLevel: "H" });

      // Update DB with QR image path
      await this.itemRepository.updateQrImage(
        itemId,
        `findly-upload/user_item_qr/qr_${itemId}.png`
      );
    } catch (err) {
      console.error("Failed to generate QR:", err);
    }
  }
}
