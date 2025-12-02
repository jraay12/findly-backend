"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodemailerService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class NodemailerService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }
    async send(to, subject, html) {
        await this.transporter.sendMail({
            from: `"Findly App" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });
    }
}
exports.NodemailerService = NodemailerService;
