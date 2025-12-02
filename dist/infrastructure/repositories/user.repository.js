"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const client_1 = require("../../infrastructure/prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserRepository {
    async create(data, tx = client_1.prisma) {
        const { email, password, role, first_name, middle_name, last_name, contact_number, address, } = data;
        const hashedPassword = await bcrypt_1.default.hash(password, 10); // 10 = salt rounds
        return await tx.user.create({
            data: {
                email,
                password: hashedPassword,
                role,
                user_information: {
                    create: {
                        first_name,
                        middle_name,
                        last_name,
                        contact_number,
                        address,
                    },
                },
            },
            include: {
                user_information: true,
            },
        });
    }
    async getUsers(tx = client_1.prisma) {
        return await tx.user_information.findMany();
    }
    async findUserByEmail(email, tx = client_1.prisma) {
        return await tx.user.findUnique({
            where: {
                email,
            },
            include: {
                user_information: true,
            },
        });
    }
    async setUserStatus(id, status, tx = client_1.prisma) {
        return await tx.user.update({
            where: { id },
            data: {
                status: status,
            },
        });
    }
    async storeEmailToken(id, token, tx = client_1.prisma) {
        return await tx.user.update({
            where: {
                id,
            },
            data: {
                verification_token: token,
            },
        });
    }
    async verifyUser(id, tx = client_1.prisma) {
        return await tx.user.update({
            where: {
                id,
            },
            data: {
                email_verify: true,
                verification_token: null,
            },
        });
    }
    async findByEmailToken(token, tx = client_1.prisma) {
        return await tx.user.findFirst({
            where: {
                verification_token: token,
            },
        });
    }
    async getUserById(user_id, tx = client_1.prisma) {
        return await tx.user_information.findUnique({
            where: {
                user_id,
            },
            include: {
                user: {
                    select: {
                        email: true,
                    },
                },
            },
        });
    }
    async updateUserInformation(user_id, data, tx = client_1.prisma) {
        return await tx.user_information.update({
            where: {
                user_id,
            },
            data: {
                ...data,
            },
        });
    }
}
exports.UserRepository = UserRepository;
