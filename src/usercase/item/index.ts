import { ItemRepository } from "../../infrastructure/repositories/item.repository";
import { CreateUserItemUsecase } from "./createUserItem.usecase";
import { GetUserLostItemUsecase } from "./getUserLostItem.usecase";
import {  UpdateStatusUsecase } from "./updateUserItemStatus.usecase";
// Initialize repository and mailer
const itemRepository = new ItemRepository();

export const createUserItemUsecase = new CreateUserItemUsecase(itemRepository);
export const getUserLostItemUsecase = new GetUserLostItemUsecase(itemRepository);
export const updateStatusUsecase = new UpdateStatusUsecase(itemRepository);
