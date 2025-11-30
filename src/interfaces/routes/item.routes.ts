import { Router } from "express";
import itemController from "../controllers/item.contrtoller";
import { authenticateJWT } from "../../middleware/auth.middleware";
const router = Router();

/**
 * @swagger
 * /items/createUserItem:
 *   post:
 *     summary: Create a new item for a user
 *     tags: [UserItems]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - item_name
 *             properties:
 *               item_name:
 *                 type: string
 *                 example: "Laptop"
 *               status:
 *                 type: string
 *                 example: "active"
 *               image_url:
 *                 type: string
 *                 nullable: true
 *                 example: "https://example.com/image.png"
 *     responses:
 *       201:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *                 item_name:
 *                   type: string
 *                   example: "Laptop"
 *                 status:
 *                   type: string
 *                   example: "active"
 *                 image_url:
 *                   type: string
 *                   nullable: true
 *                   example: "https://example.com/image.png"
 *                 qr_token:
 *                   type: string
 *                   example: "abc123xyz"
 *                 created_by:
 *                   type: integer
 *                   example: 1
 *                 updated_by:
 *                   type: integer
 *                   nullable: true
 *                   example: 2
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-11-30T03:00:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-11-30T03:00:00Z"
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /items/userItemLost:
 *   get:
 *     summary: Get lost items
 *     tags: [UserItems]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of lost items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   user_id:
 *                     type: integer
 *                     example: 1
 *                   item_name:
 *                     type: string
 *                     example: "Wallet"
 *                   status:
 *                     type: string
 *                     example: "lost"
 *                   image_url:
 *                     type: string
 *                     nullable: true
 *                     example: "uploads/downpayment/user_item_qr.png"
 *                   qr_token:
 *                     type: string
 *                     example: "abc123xyz"
 *                   created_by:
 *                     type: integer
 *                     example: 1
 *                   updated_by:
 *                     type: integer
 *                     nullable: true
 *                     example: null
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-11-30T03:00:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-11-30T03:05:00Z"
 *                   userInformation:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       first_name:
 *                         type: string
 *                         example: "John"
 *                       middle_name:
 *                         type: string
 *                         example: "C"
 *                       last_name:
 *                         type: string
 *                         example: "Doe"
 *                       contact_number:
 *                         type: string
 *                         example: "09123456789"
 *                       address:
 *                         type: string
 *                         example: "123 Main St, City"
 *                       created_by:
 *                         type: integer
 *                         example: 1
 *                       updated_by:
 *                         type: integer
 *                         nullable: true
 *                         example: null
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-30T03:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-30T03:05:00Z"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /items/update-status/{id}:
 *   put:
 *     summary: Update the status of a user item
 *     tags: [UserItems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID of the user item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: "lost"
 *                 description: New status of the item
 *     responses:
 *       200:
 *         description: Item status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "update status successfully"
 *                 result:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     user_id:
 *                       type: integer
 *                       example: 1
 *                     item_name:
 *                       type: string
 *                       example: "Wallet"
 *                     status:
 *                       type: string
 *                       example: "lost"
 *                     image_url:
 *                       type: string
 *                       nullable: true
 *                       example: "uploads/downpayment/user_item_qr.png"
 *                     qr_token:
 *                       type: string
 *                       example: "abc123xyz"
 *                     created_by:
 *                       type: integer
 *                       example: 1
 *                     updated_by:
 *                       type: integer
 *                       nullable: true
 *                       example: 2
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-30T03:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-30T03:05:00Z"
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /items/getAllUserItem:
 *   get:
 *     summary: Get all user items
 *     tags: [UserItems]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all user items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "get all user items successfully"
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       user_id:
 *                         type: integer
 *                         example: 10
 *                       item_name:
 *                         type: string
 *                         example: "Umbrella"
 *                       status:
 *                         type: string
 *                         example: "claimed"
 *                       image_url:
 *                         type: string
 *                         nullable: true
 *                         example: "uploads/downpayment/user_item_qr.png"
 *                       qr_token:
 *                         type: string
 *                         example: "xyz987token"
 *                       created_by:
 *                         type: integer
 *                         example: 1
 *                       updated_by:
 *                         type: integer
 *                         nullable: true
 *                         example: 2
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-30T03:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-30T03:10:00Z"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal server error
 */


// update item
/**
 * @swagger
 * /items/update-item/{id}:
 *   put:
 *     summary: Update an existing user item
 *     description: Update the item's name or description based on the provided ID.
 *     tags: [UserItems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item_name:
 *                 type: string
 *                 example: "New Wallet Name"
 *                 nullable: true
 *               item_description:
 *                 type: string
 *                 example: "Black leather wallet with two compartments"
 *                 nullable: true
 *     responses:
 *       200:
 *         description: User item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "update item successfully"
 *                 result:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     item_name:
 *                       type: string
 *                       example: "New Wallet Name"
 *                     item_description:
 *                       type: string
 *                       example: "Black leather wallet with two compartments"
 *                     updated_by:
 *                       type: integer
 *                       example: 1
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-30T04:15:00Z"
 *       400:
 *         description: Invalid input or body fields
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */

router.post("/createUserItem", authenticateJWT, itemController.createUserItem);
router.get("/userItemLost", authenticateJWT, itemController.getUserLostItem);
router.put("/update-status/:id", authenticateJWT, itemController.updateItemStatus)
router.get("/getAllUserItem", authenticateJWT, itemController.getAllUserItem);
router.put("/update-item/:id", authenticateJWT, itemController.updateUserItem)


export default router;
