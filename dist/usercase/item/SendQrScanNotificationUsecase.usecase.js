"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendQrScanNotificationUsecase = void 0;
class SendQrScanNotificationUsecase {
    constructor(mailer, itemRepository) {
        this.mailer = mailer;
        this.itemRepository = itemRepository;
    }
    async execute(token) {
        const item = await this.itemRepository.findItemByToken(token);
        if (!item)
            throw new Error("Item not found");
        const allow_download = item.allow_download_image;
        if (!allow_download)
            throw new Error("Not allowed");
        // Get the user email from the nested structure
        const email = item.user_information?.user?.email;
        if (!email)
            throw new Error("User email not found");
        const scanTime = new Date().toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>QR Code Scanned</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
            <tr>
              <td align="center">
                <!-- Main Container -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
                  
                  <!-- Header with Gradient -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                      <div style="background: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="3" width="7" height="7" rx="1" fill="white"/>
                          <rect x="14" y="3" width="7" height="7" rx="1" fill="white"/>
                          <rect x="3" y="14" width="7" height="7" rx="1" fill="white"/>
                          <rect x="14" y="14" width="3" height="3" fill="white"/>
                          <rect x="18" y="14" width="3" height="3" fill="white"/>
                          <rect x="14" y="18" width="3" height="3" fill="white"/>
                          <rect x="18" y="18" width="3" height="3" fill="white"/>
                        </svg>
                      </div>
                      <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">QR Code Scanned</h1>
                      <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 10px 0 0 0;">Security Alert</p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                        Hello <strong style="color: #667eea;">${item.user_information.first_name}</strong>,
                      </p>
                      
                      <p style="color: #555555; font-size: 15px; line-height: 1.6; margin: 0 0 30px 0;">
                        We wanted to notify you that the QR code for your item was just scanned.
                      </p>

                      <!-- Item Details Card -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); border-radius: 12px; overflow: hidden; margin-bottom: 30px;">
                        <tr>
                          <td style="padding: 25px;">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td style="padding-bottom: 15px;">
                                  <p style="color: #667eea; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin: 0;">Item Name</p>
                                  <p style="color: #333333; font-size: 18px; font-weight: 700; margin: 5px 0 0 0;">${item.item_name}</p>
                                </td>
                              </tr>
                              <tr>
                                <td style="border-top: 1px solid rgba(102, 126, 234, 0.2); padding-top: 15px;">
                                  <p style="color: #667eea; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin: 0;">Scanned At</p>
                                  <p style="color: #555555; font-size: 14px; margin: 5px 0 0 0;">${scanTime}</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Warning Box -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 8px; margin-bottom: 30px;">
                        <tr>
                          <td style="padding: 20px;">
                            <p style="color: #856404; font-size: 14px; line-height: 1.6; margin: 0;">
                              <strong>⚠️ Security Notice:</strong> If this scan was unexpected or you don't recognize this activity, please review your account security settings immediately.
                            </p>
                          </td>
                        </tr>
                      </table>

                      <!-- CTA Button -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td align="center" style="padding: 10px 0 30px 0;">
                            <a href="${process.env.FRONTEND_URL}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 40px; border-radius: 8px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                              View Dashboard
                            </a>
                          </td>
                        </tr>
                      </table>

                      <p style="color: #888888; font-size: 13px; line-height: 1.6; margin: 0;">
                        Need help? Contact our support team at <a href="mailto:support@findly.com" style="color: #667eea; text-decoration: none;">support@findly.com</a>
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
                      <p style="color: #888888; font-size: 14px; margin: 0 0 10px 0;">
                        Best regards,<br/>
                        <strong style="color: #667eea;">The Findly Team</strong>
                      </p>
                      
                      <div style="margin: 20px 0;">
                        <a href="#" style="display: inline-block; margin: 0 10px;">
                          <img src="https://img.icons8.com/color/24/facebook.png" alt="Facebook" style="width: 24px; height: 24px;"/>
                        </a>
                        <a href="#" style="display: inline-block; margin: 0 10px;">
                          <img src="https://img.icons8.com/color/24/twitter.png" alt="Twitter" style="width: 24px; height: 24px;"/>
                        </a>
                        <a href="#" style="display: inline-block; margin: 0 10px;">
                          <img src="https://img.icons8.com/color/24/instagram-new.png" alt="Instagram" style="width: 24px; height: 24px;"/>
                        </a>
                      </div>

                      <p style="color: #aaaaaa; font-size: 12px; margin: 15px 0 0 0; line-height: 1.5;">
                        © ${new Date().getFullYear()} Findly. All rights reserved.<br/>
                        <a href="#" style="color: #667eea; text-decoration: none;">Privacy Policy</a> | 
                        <a href="#" style="color: #667eea; text-decoration: none;">Terms of Service</a> | 
                        <a href="#" style="color: #667eea; text-decoration: none;">Unsubscribe</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;
        await this.mailer.send(email, `🔔 QR Code Scanned: ${item.item_name}`, html);
    }
}
exports.SendQrScanNotificationUsecase = SendQrScanNotificationUsecase;
