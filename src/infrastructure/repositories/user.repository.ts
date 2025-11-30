import { prisma } from "../../infrastructure/prisma/client";
import { CreateUserDTO } from "../../domain/dto/createUser.dto";
import bcrypt from "bcrypt";

export class UserRepository {
  async create(data: CreateUserDTO, tx = prisma) {
    const {
      email,
      password,
      role,
      first_name,
      middle_name,
      last_name,
      contact_number,
      address,
    } = data;

    const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

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

  async getUsers(tx = prisma) {
    return await tx.user_information.findMany();
  }

  async findUserByEmail(email: string, tx = prisma) {
    return await tx.user.findUnique({
      where: {
        email,
      },
      include: {
        user_information: true,
      },
    });
  }

  async setUserStatus(id: number, status: boolean, tx = prisma) {
    return await tx.user.update({
      where: { id },
      data: {
        status: status,
      },
    });
  }

  async storeEmailToken(id: number, token: string, tx = prisma) {
    return await tx.user.update({
      where: {
        id,
      },
      data: {
        verification_token: token,
      },
    });
  }

  async verifyUser(id: number, tx = prisma) {
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

  async findByEmailToken(token: string, tx = prisma) {
    return await tx.user.findFirst({
      where: {
        verification_token: token,
      },
    });
  }

  async getUserById(user_id: number, tx = prisma) {
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

  async updateUserInformation(user_id: number, data: any, tx = prisma) {
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
