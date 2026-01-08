import { prisma } from "../../infrastructure/prisma/client";
import { CreateUserItemDTO } from "../../domain/dto/item.dto";
import { create } from "domain";

export class ItemRepository {
  async createUserItem(data: CreateUserItemDTO, tx = prisma) {
    return await tx.user_item.create({
      data: {
        user_id: data.user_id,
        status: data.status,
        image_url: data.image_url,
        qr_token: data.qr_token,
        created_by: data.created_by,
        item_name: data.item_name,
        item_description: data.item_description,
      },
    });
  }

  async getLostItem(user_id: number, tx = prisma) {
    return await tx.user_item.findMany({
      where: {
        user_id: user_id,
        status: "Lost",
        allow_download_image: true,
      },
    });
  }

  async updateItemStatus(
    item_id: number,
    user_id: number,
    status: string,
    tx = prisma
  ) {
    return await tx.user_item.update({
      where: {
        id: item_id,
      },
      data: {
        status: status,
        updated_by: user_id,
      },
    });
  }

  async findItemById(id: number, tx = prisma) {
    return await tx.user_item.findUnique({
      where: {
        id,
      },
    });
  }

  async getAllItem(user_id: number, tx = prisma) {
    return await tx.user_item.findMany({
      where: {
        user_id,
      },
    });
  }

  async updateUserItem(data: any, id: number, tx = prisma) {
    return await tx.user_item.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }

  async updateQrImage(itemId: number, imageUrl: string) {
    return prisma.user_item.update({
      where: { id: itemId },
      data: { qr_image_url: imageUrl },
    });
  }

  async findItemByToken(token: string, tx = prisma) {
    return await tx.user_item.findUnique({
      where: {
        qr_token: token,
      },
      include: {
        user_information: {
          include: {
            user: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });
  }

  async deleteItemById(id: number, tx = prisma) {
    return await tx.user_item.delete({
      where: {
        id,
      },
    });
  }

  async createAdminItem(data: any, tx = prisma) {
    // console.log(data)
    return await tx.items.create({
      data: {
        ...data,
      },
    });
  }

  async getAdminItems(tx = prisma) {
    return await tx.items.findMany({
      where: {
        status: true,
      },
    });
  }

  async updateAdminItemStatus(id: number, tx = prisma) {
    return await tx.items.update({
      where: {
        id,
      },
      data: {
        status: false,
      },
    });
  }

  async findAdminItemById(id: number, tx = prisma) {
    return await tx.items.findUnique({
      where: {
        id,
      },
    });
  }

  async updateAdminItem(id: number, data: any, tx = prisma) {
    return await tx.items.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }

  async createOrder(data: any, tx = prisma) {
    const { item_id, quantity, price, ...orderData } = data;

    return await tx.orders.create({
      data: {
        ...orderData,
        orderDetails: {
          create: {
            item_id,
            quantity,
            price,
          },
        },
      },
    });
  }

  async finduserById(id: number, tx = prisma) {
    return await tx.user.findUnique({
      where: {
        id,
      },
      include: {
        user_information: true,
      },
    });
  }

  async getOrders(tx = prisma) {
    return await tx.orders.findMany({
      include: {
        orderDetails: {
          include: {
            item: {
              select: {
                product_title: true,
              },
            },
          },
        },
        user_item: {
          select: {
            qr_image_url: true,
            allow_download_image: true,
          },
        },
        user_information: true,
      },
    });
  }

  async submitReport(data: any, tx = prisma) {
    return await tx.report.create({
      data: {
        ...data,
      },
    });
  }

  async orderToggleStatus(id: number, tx = prisma) {
    return await tx.orders.update({
      where: {
        id,
      },
      data: {
        status: "Delivered",
        user_item: {
          update: {
            allow_download_image: true,
          },
        },
      },
    });
  }

  async itemReportFoundByUser(user_id: number, tx = prisma) {
    return await tx.report.findMany({
      where: {
        customer_id: user_id,
      },
      include: {
        user_information: true,
        user_item: true,
      },
    });
  }

  async getAllLostItem(tx = prisma) {
    return await tx.user_item.findMany({
      where: {
        status: "Lost",
      },
      include: {
        user_information: true
      }
    });
  }
}
