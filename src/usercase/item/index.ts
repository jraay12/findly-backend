import { ItemRepository } from "../../infrastructure/repositories/item.repository";
import { CreateUserItemUsecase } from "./createUserItem.usecase";
import { GetUserLostItemUsecase } from "./getUserLostItem.usecase";
// Initialize repository and mailer
const itemRepository = new ItemRepository();

// Initialize use case for sending verification email
export const createUserItemUsecase = new CreateUserItemUsecase(itemRepository);
export const getUserLostItemUsecase = new GetUserLostItemUsecase(itemRepository);
