import nodemailer from "nodemailer";

export class NodemailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        
      },
    });
  }

  async send(to: string, subject: string, html: string): Promise<void> {
    await this.transporter.sendMail({
      from: `"Findly App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
  }
}
