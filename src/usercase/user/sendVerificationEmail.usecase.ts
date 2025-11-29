import { NodemailerService } from "../../infrastructure/email/NodeMailerService";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import crypto from "crypto";

export class SendVerificationEmail {
  constructor(
    private mailer: NodemailerService,
    private userRepository: UserRepository
  ) {}

  async execute(userId: number, email: string) {
    const token = crypto.randomBytes(64).toString("hex");
    await this.userRepository.storeEmailToken(userId, token);

    const verificationUrl = `${process.env.BASE_URL}/users/verify?token=${token}`;

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f7fa;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 30px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Verify Your Email</h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                      Thank you for signing up! To complete your registration and start using your account, please verify your email address.
                    </p>
                    
                    <!-- Button -->
                    <table role="presentation" style="margin: 30px 0; width: 100%;">
                      <tr>
                        <td align="center">
                          <a href="${verificationUrl}" style="display: inline-block; padding: 14px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);">
                            Verify Email Address
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
                    
                    <p style="margin: 0; color: #999999; font-size: 13px; line-height: 1.6;">
                      If you didn't create an account, you can safely ignore this email.
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; text-align: center;">
                    <p style="margin: 0; color: #999999; font-size: 12px;">
                      © ${new Date().getFullYear()} Your Company. All rights reserved.
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

    await this.mailer.send(email, "Verify Your Email Address", html);
  }
}
