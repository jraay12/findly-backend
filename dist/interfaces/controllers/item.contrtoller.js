"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const item_1 = require("../../usercase/item");
class ItemController {
    async createUserItem(req, res) {
        try {
            const user = req.user;
            const user_id = user.id;
            const result = await item_1.createUserItemUsecase.execute({
                ...req.body,
                user_id: user_id,
                created_by: user_id,
            }, req.file);
            return res.json({
                message: "Create User Item Successfully",
                data: result,
            });
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async getUserLostItem(req, res) {
        try {
            const user = req.user;
            const user_id = user.id;
            const result = await item_1.getUserLostItemUsecase.execute(user_id);
            return res.json({
                message: "User Lost item retrieve",
                result,
            });
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async updateItemStatus(req, res) {
        try {
            const user = req.user;
            const user_id = user.id;
            const item_id = parseInt(req.params.id);
            const { status } = req.body;
            const result = await item_1.updateStatusUsecase.execute(user_id, item_id, status);
            return res.json({
                message: "update status successfully",
                result,
            });
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async getAllUserItem(req, res) {
        try {
            const user = req.user;
            const user_id = user.id;
            const result = await item_1.getAllUserItemUsecase.execute(user_id);
            return res.json({
                success: true,
                result,
            });
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async updateUserItem(req, res) {
        try {
            const user = req.user;
            const user_id = user.id;
            const item_id = parseInt(req.params.id);
            const result = await item_1.updateUserItemUsecase.execute({ ...req.body, updated_by: user_id }, item_id);
            return res.json({
                success: true,
                result,
            });
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async getSpecificItem(req, res) {
        try {
            const item_id = parseInt(req.params.id);
            const result = await item_1.getSpecificItemUsecase.execute(item_id);
            return res.json({
                successs: true,
                result,
            });
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async getSpecificItemByToken(req, res) {
        try {
            const token = req.params.token;
            const result = await item_1.getSpecificItemByTokenUsecase.execute(token);
            return res.json({
                successs: true,
                result,
            });
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async sendQRNotification(req, res) {
        try {
            const token = req.params.token;
            const result = await item_1.sendQrScanNotificationUsecase.execute(token);
            return res.json({
                successs: true,
                result,
            });
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async deleteItem(req, res) {
        try {
            const item_id = parseInt(req.params.id);
            const result = await item_1.deleteItemUsecase.execute(item_id);
            return res.json({
                successs: true,
                result,
            });
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async createAdminItem(req, res) {
        try {
            const user = req.user;
            const user_id = user.id;
            const result = await item_1.createAdminItemUsecase.execute({
                ...req.body,
                user_id: user_id,
                created_by: user_id,
            }, req.file);
            return res.json({
                message: "Create User Item Successfully",
                data: result,
            });
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async getAdminItem(req, res) {
        try {
            const result = await item_1.getAdminItemUsecase.execute();
            return res.json({
                successs: true,
                result,
            });
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async updateAdminItemStatus(req, res) {
        try {
            const id = parseInt(req.params.id);
            const result = await item_1.updateAdminItemStatusUsecase.execute(id);
            return res.json(result);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async updateAdminItem(req, res) {
        try {
            const id = parseInt(req.params.id);
            const result = await item_1.updateAdminItemUsecase.execute(id, req.body);
            return res.json(result);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async createOrder(req, res) {
        try {
            const user = req.user;
            const user_id = user.id;
            const result = await item_1.createOrderUsecase.execute({
                ...req.body,
                customer_id: Number(user_id),
                created_by: Number(user_id),
            });
            return res.json(result);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async getOrder(req, res) {
        try {
            const result = await item_1.getOrdersUsecase.execute();
            return res.json(result);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async submitReport(req, res) {
        try {
            const token = req.params.token;
            const result = await item_1.submitReport.execute({
                ...req.body,
            }, token);
            return res.json(result);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async orderToggle(req, res) {
        try {
            const id = parseInt(req.params.id);
            const result = await item_1.orderToggle.execute(id);
            return res.json(result);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}
exports.default = new ItemController();
