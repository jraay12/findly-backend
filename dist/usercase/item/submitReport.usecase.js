"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitReport = void 0;
class SubmitReport {
    constructor(itemRepository, nodemailerService) {
        this.itemRepository = itemRepository;
        this.nodemailerService = nodemailerService;
    }
    async execute(data, token) {
        // Retrieve item from repository
        const item = await this.itemRepository.findItemByToken(token);
        if (!item)
            throw new Error("Item not found");
        const report = await this.itemRepository.submitReport(data);
        // Send notification email to item owner
        await this.sendFoundNotification(item, data);
        return { success: true, report };
    }
    async sendFoundNotification(item, reportData) {
        const email = item.user_information?.user?.email;
        if (!email)
            throw new Error("User email not found");
        const reportTime = new Date().toLocaleString("en-US", {
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
        <title>Item Found - Findly</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); min-height: 100vh;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 40px 20px;">
          <tr>
            <td align="center">
              <!-- Main Container -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
                
                <!-- Header with Gradient -->
                <tr>
                  <td style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 40px 30px; text-align: center;">
                    <div style="background: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 11L12 14L22 4" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <h1 style="color: #ffffff; font-size: 32px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">Great News!</h1>
                    <p style="color: rgba(255,255,255,0.95); font-size: 16px; margin: 10px 0 0 0; font-weight: 500;">Someone Found Your Item</p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                      Hello <strong style="color: #11998e;">${item.user_information.first_name}</strong>,
                    </p>
                    
                    <p style="color: #555555; font-size: 15px; line-height: 1.6; margin: 0 0 30px 0;">
                      Excellent news! Someone has found your item and submitted a report. Please log in to your account to view the full details and coordinate the return.
                    </p>

                    <!-- Item Details Card -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #e0f7f4 0%, #d4f1e8 100%); border-radius: 12px; overflow: hidden; margin-bottom: 30px; border: 2px solid #38ef7d;">
                      <tr>
                        <td style="padding: 25px;">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="padding-bottom: 15px;">
                                <p style="color: #11998e; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin: 0;">Item Name</p>
                                <p style="color: #333333; font-size: 18px; font-weight: 700; margin: 5px 0 0 0;">${item.item_name}</p>
                              </td>
                            </tr>
                            <tr>
                              <td style="border-top: 1px solid rgba(17, 153, 142, 0.2); padding-top: 15px;">
                                <p style="color: #11998e; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin: 0;">Report Submitted</p>
                                <p style="color: #555555; font-size: 14px; margin: 5px 0 0 0;">${reportTime}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Success Box -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #d1f4e0; border-left: 4px solid #38ef7d; border-radius: 8px; margin-bottom: 30px;">
                      <tr>
                        <td style="padding: 20px;">
                          <p style="color: #0d6832; font-size: 14px; line-height: 1.6; margin: 0;">
                            <strong>✨ Next Steps:</strong> Log in to your Findly account to view the finder's contact information and arrange to retrieve your item. Time is of the essence!
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA Button -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="padding: 10px 0 30px 0;">
                          <a href="${process.env.FRONTEND_URL}" style="display: inline-block; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; padding: 16px 48px; border-radius: 10px; box-shadow: 0 4px 15px rgba(17, 153, 142, 0.4); transition: transform 0.2s;">
                            View Report Details →
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="color: #888888; font-size: 13px; line-height: 1.6; margin: 0;">
                      Need assistance? Our support team is here to help at <a href="mailto:support@findly.com" style="color: #11998e; text-decoration: none; font-weight: 600;">support@findly.com</a>
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
                    <p style="color: #888888; font-size: 14px; margin: 0 0 10px 0;">
                      Best regards,<br/>
                      <strong style="color: #11998e;">The Findly Team</strong>
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
                      <a href="#" style="color: #11998e; text-decoration: none;">Privacy Policy</a> | 
                      <a href="#" style="color: #11998e; text-decoration: none;">Terms of Service</a> | 
                      <a href="#" style="color: #11998e; text-decoration: none;">Unsubscribe</a>
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
        await this.nodemailerService.send(email, `🎉 Great News! Someone Found Your Item: ${item.item_name}`, html);
    }
}
exports.SubmitReport = SubmitReport;
