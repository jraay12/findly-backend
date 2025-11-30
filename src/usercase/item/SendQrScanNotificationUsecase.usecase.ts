import { NodemailerService } from "../../infrastructure/email/NodeMailerService";
import { ItemRepository } from "../../infrastructure/repositories/item.repository";

export class SendQrScanNotificationUsecase {
  constructor(
    private mailer: NodemailerService,
    private itemRepository: ItemRepository
  ) {}

  async execute(token: string) {
    const item = await this.itemRepository.findItemByToken(token);
    if (!item) throw new Error("Item not found");

    const allow_download = item.allow_download_image

    if (!allow_download) throw new Error("Not allowed")

    // Get the user email from the nested structure
    const email = item.user_information?.user?.email;
    if (!email) throw new Error("User email not found");

    const html = `
      <p>Hello ${item.user_information.first_name},</p>
      <p>Your item <strong>${item.item_name}</strong> QR code was scanned.</p>
      <p>If this was unexpected, please check your account.</p>
      <p>Thanks,<br/>Your Company</p>
    `;

    await this.mailer.send(email, `QR Code Scanned: ${item.item_name}`, html);
  }
}
