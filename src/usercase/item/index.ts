import { ItemRepository } from "../../infrastructure/repositories/item.repository";
import { CreateUserItemUsecase } from "./createUserItem.usecase";
import { GetAllUserItemUsecase } from "./getAllUserItem.usecase";
import { GetSpecificItemUsecase } from "./getSpecificItem.usecase";
import { GetUserLostItemUsecase } from "./getUserLostItem.usecase";
import { UpdateUserItemUsecase } from "./updateUserItem.usecase";
import { UpdateStatusUsecase } from "./updateUserItemStatus.usecase";
import { GetSpecificItemByTokenUsecase } from "./getSpecificItemByToken.usecasae";
import { SendQrScanNotificationUsecase } from "./SendQrScanNotificationUsecase.usecase";
import { NodemailerService } from "../../infrastructure/email/NodeMailerService";
import { DeleteItemUsecase } from "./deleteItem.usecase";
import { CreateAdminItemUsecase } from "./createAdminItem.usecase";
import { GetAdminItemUsecase } from "./getAdminItem.usecase";
import { UpdateAdminItemStatusUsecase } from "./updateAdminItemStatus.usecase";
import { UpdateAdminItemUsecase } from "./updateAdminItem.usecase";
import { CreateOrderUsecase } from "./createOrder.usecase";
import { GetOrdersUsecase } from "./getOrders.usecase";
import { SubmitReport } from "./submitReport.usecase";
import { OrderToggleUsecase } from "./orderToggle.usecase";
// Initialize repository and mailer
const itemRepository = new ItemRepository();
const nodemailerService = new NodemailerService();


export const createUserItemUsecase = new CreateUserItemUsecase(itemRepository);
export const getUserLostItemUsecase = new GetUserLostItemUsecase(
  itemRepository
);
export const updateStatusUsecase = new UpdateStatusUsecase(itemRepository);
export const getAllUserItemUsecase = new GetAllUserItemUsecase(itemRepository);
export const updateUserItemUsecase = new UpdateUserItemUsecase(itemRepository);
export const getSpecificItemUsecase = new GetSpecificItemUsecase(itemRepository);
export const getSpecificItemByTokenUsecase = new GetSpecificItemByTokenUsecase(itemRepository);
export const sendQrScanNotificationUsecase = new SendQrScanNotificationUsecase(nodemailerService, itemRepository);
export const deleteItemUsecase = new DeleteItemUsecase(itemRepository);
export const createAdminItemUsecase = new CreateAdminItemUsecase(itemRepository);
export const getAdminItemUsecase = new GetAdminItemUsecase(itemRepository);
export const updateAdminItemStatusUsecase = new UpdateAdminItemStatusUsecase(itemRepository);
export const updateAdminItemUsecase = new UpdateAdminItemUsecase(itemRepository);
export const createOrderUsecase = new CreateOrderUsecase(itemRepository);
export const getOrdersUsecase = new GetOrdersUsecase(itemRepository);
export const submitReport = new SubmitReport(itemRepository, nodemailerService);
export const orderToggle = new OrderToggleUsecase(itemRepository);

