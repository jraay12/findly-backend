import { CreateUserItemDTO } from "../../domain/dto/item.dto";
import { ItemRepository } from "../../infrastructure/repositories/item.repository";
import crypto from "crypto";
import QRCode from "qrcode";
import fs from "fs";
import path from "path";

export class CreateUserItemUsecase {
  constructor(private itemRepository: ItemRepository) {}

  async execute(data: CreateUserItemDTO) {
    // Generate QR token
    const qrToken = crypto.randomBytes(16).toString("hex"); // 32 chars

    // Create item in repository
    const created = await this.itemRepository.createUserItem({
      ...data,
      qr_token: qrToken,
    });

    this.generateQrImageAsync(created.id, qrToken);
    return created;
  }

  private async generateQrImageAsync(itemId: number, qrToken: string) {
    try {
      const qrFolder = path.join(
        process.cwd(),
        "findly-upload",
        "user_item_qr"
      );
      if (!fs.existsSync(qrFolder)) {
        fs.mkdirSync(qrFolder, { recursive: true });
      }

      const qrFile = path.join(qrFolder, `qr_${itemId}.png`);

      // Generate QR image
      await QRCode.toFile(qrFile, qrToken, { errorCorrectionLevel: "H" });

      // Update DB with image path
      await this.itemRepository.updateQrImage(
        itemId,
        `findly-upload/user_item_qr/qr_${itemId}.png`
      );
    } catch (err) {
      console.error("Failed to generate QR:", err);
    }
  }
}
