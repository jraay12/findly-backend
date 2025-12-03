import { Router } from "express";
import itemController from "../controllers/item.contrtoller";
import { authenticateJWT } from "../../middleware/auth.middleware";
const router = Router();
import { multerUpload } from "../../infrastructure/upload/multerConfig";

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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - item_name
 *             properties:
 *               item_name:
 *                 type: string
 *                 example: "Laptop"
 *               item_description:
 *                 type: string
 *                 nullable: true
 *                 example: "A silver MacBook Pro with M1 chip"
 *               status:
 *                 type: string
 *                 example: "active"
 *               image:
 *                 type: string
 *                 format: binary
 *                 nullable: true
 *                 description: Optional image file
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
 *                 item_description:
 *                   type: string
 *                   nullable: true
 *                   example: "A silver MacBook Pro with M1 chip"
 *                 status:
 *                   type: string
 *                   example: "active"
 *                 image_url:
 *                   type: string
 *                   nullable: true
 *                   example: "/findly-upload/user_item_images/12345_image.png"
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

// get specific item

/**
 * @swagger
 * /items/get-specific-item/{id}:
 *   get:
 *     summary: Get specific item details
 *     description: Retrieve detailed information for a specific user item by its ID, including related user information.
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
 *         description: ID of the item to retrieve
 *     responses:
 *       200:
 *         description: Specific item details retrieved successfully
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
 *                   example: "Wallet"
 *                 item_description:
 *                   type: string
 *                   nullable: true
 *                   example: "Black leather wallet"
 *                 status:
 *                   type: string
 *                   example: "lost"
 *                 image_url:
 *                   type: string
 *                   nullable: true
 *                   example: "uploads/downpayment/user_item_qr.png"
 *                 qr_token:
 *                   type: string
 *                   example: "abc123xyz"
 *                 created_by:
 *                   type: integer
 *                   example: 1
 *                 updated_by:
 *                   type: integer
 *                   nullable: true
 *                   example: null
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-11-30T03:00:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-11-30T03:05:00Z"
 *                 userInformation:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     first_name:
 *                       type: string
 *                       example: "John"
 *                     middle_name:
 *                       type: string
 *                       example: "C"
 *                     last_name:
 *                       type: string
 *                       example: "Doe"
 *                     contact_number:
 *                       type: string
 *                       example: "09123456789"
 *                     address:
 *                       type: string
 *                       example: "123 Main St, City"
 *                     created_by:
 *                       type: integer
 *                       example: 1
 *                     updated_by:
 *                       type: integer
 *                       nullable: true
 *                       example: null
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-30T03:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-30T03:05:00Z"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */

// get specific item based on token
/**
 * @swagger
 * /items/get-specific-token-item/{token}:
 *   get:
 *     summary: Get specific item by QR token
 *     description: Retrieve detailed information for a specific user item using its QR token, including related user information.
 *     tags: [UserItems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           example: "abc123xyz"
 *         description: QR token of the item to retrieve
 *     responses:
 *       200:
 *         description: Specific item details retrieved successfully
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
 *                   example: "Wallet"
 *                 item_description:
 *                   type: string
 *                   nullable: true
 *                   example: "Black leather wallet"
 *                 status:
 *                   type: string
 *                   example: "lost"
 *                 image_url:
 *                   type: string
 *                   nullable: true
 *                   example: "uploads/downpayment/user_item_qr.png"
 *                 qr_token:
 *                   type: string
 *                   example: "abc123xyz"
 *                 created_by:
 *                   type: integer
 *                   example: 1
 *                 updated_by:
 *                   type: integer
 *                   nullable: true
 *                   example: null
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-11-30T03:00:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-11-30T03:05:00Z"
 *                 userInformation:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     first_name:
 *                       type: string
 *                       example: "John"
 *                     middle_name:
 *                       type: string
 *                       example: "C"
 *                     last_name:
 *                       type: string
 *                       example: "Doe"
 *                     contact_number:
 *                       type: string
 *                       example: "09123456789"
 *                     address:
 *                       type: string
 *                       example: "123 Main St, City"
 *                     created_by:
 *                       type: integer
 *                       example: 1
 *                     updated_by:
 *                       type: integer
 *                       nullable: true
 *                       example: null
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-30T03:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-30T03:05:00Z"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */

//send qr notification
/**
 * @swagger
 * /items/send-qr-notification/{token}:
 *   get:
 *     summary: Send QR scan notification email
 *     description: Sends an email to the owner of the item when their QR code is scanned. Only allowed if `allow_download_image` is true.
 *     tags: [UserItems]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           example: "b231c43cecdd335625268c95c81b3e26"
 *         description: QR token of the scanned item
 *     responses:
 *       200:
 *         description: Notification sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successs:
 *                   type: boolean
 *                   example: true
 *                 result:
 *                   type: string
 *                   example: "Notification email sent successfully"
 *       400:
 *         description: Invalid request or item not found / not allowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Item not found"
 *       500:
 *         description: Internal server error
 */

// delete item
/**
 * @swagger
 * /items/delete-item/{id}:
 *   delete:
 *     summary: Delete a user item along with its files
 *     description: Deletes a user item from the database and also removes the associated image and QR files from the server.
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
 *         description: ID of the item to delete
 *     responses:
 *       200:
 *         description: Item successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully removed"
 *       400:
 *         description: Item not found or invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Item not found"
 *       401:
 *         description: Unauthorized – JWT token missing or invalid
 *       500:
 *         description: Internal server error
 */

// create admin item
/**
 * @swagger
 * /items/createAdminItem:
 *   post:
 *     summary: Create a new admin item
 *     tags: [AdminItems]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - product_title
 *               - price
 *               - available_quantity
 *               - category
 *               - stock_status
 *             properties:
 *               product_title:
 *                 type: string
 *                 example: "Wireless Mouse"
 *               product_description:
 *                 type: string
 *                 nullable: true
 *                 example: "Ergonomic wireless mouse with 2.4GHz connectivity"
 *               price:
 *                 type: number
 *                 format: decimal
 *                 example: 29.99
 *               available_quantity:
 *                 type: integer
 *                 example: 100
 *               category:
 *                 type: string
 *                 example: "Electronics"
 *               badge:
 *                 type: string
 *                 nullable: true
 *                 example: "Best Seller"
 *               stock_status:
 *                 type: string
 *                 example: "in_stock"
 *               image:
 *                 type: string
 *                 format: binary
 *                 nullable: true
 *                 description: Optional product image file
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
 *                 product_title:
 *                   type: string
 *                   example: "Wireless Mouse"
 *                 product_description:
 *                   type: string
 *                   nullable: true
 *                   example: "Ergonomic wireless mouse with 2.4GHz connectivity"
 *                 price:
 *                   type: number
 *                   format: decimal
 *                   example: 29.99
 *                 available_quantity:
 *                   type: integer
 *                   example: 100
 *                 category:
 *                   type: string
 *                   example: "Electronics"
 *                 badge:
 *                   type: string
 *                   nullable: true
 *                   example: "Best Seller"
 *                 stock_status:
 *                   type: string
 *                   example: "in_stock"
 *                 product_image_url:
 *                   type: string
 *                   nullable: true
 *                   example: "/findly-upload/admin_item_images/12345_image.png"
 *                 created_by:
 *                   type: string
 *                   example: "admin@example.com"
 *                 updated_by:
 *                   type: string
 *                   example: "admin@example.com"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-12-01T03:00:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-12-01T03:00:00Z"
 *       400:
 *         description: Invalid input - Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "product_title is required"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       403:
 *         description: Forbidden - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Admin access required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

// get admin item
/**
 * @swagger
 * /items/getAdminItem:
 *   get:
 *     summary: Get all admin items
 *     description: Retrieve a list of all items in the admin shop
 *     tags: [AdminItems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: stock_status
 *         schema:
 *           type: string
 *           enum: [in_stock, out_of_stock, pre_order]
 *         description: Filter by stock status
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by product title or description
 *     responses:
 *       200:
 *         description: Successfully retrieved items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       product_title:
 *                         type: string
 *                         example: "Wireless Mouse"
 *                       product_description:
 *                         type: string
 *                         nullable: true
 *                         example: "Ergonomic wireless mouse with 2.4GHz connectivity"
 *                       price:
 *                         type: number
 *                         format: decimal
 *                         example: 29.99
 *                       available_quantity:
 *                         type: integer
 *                         example: 100
 *                       category:
 *                         type: string
 *                         example: "Electronics"
 *                       badge:
 *                         type: string
 *                         nullable: true
 *                         example: "Best Seller"
 *                       stock_status:
 *                         type: string
 *                         example: "in_stock"
 *                       product_image_url:
 *                         type: string
 *                         nullable: true
 *                         example: "/findly-upload/admin_item_images/12345_image.png"
 *                       created_by:
 *                         type: string
 *                         example: "admin@example.com"
 *                       updated_by:
 *                         type: string
 *                         example: "admin@example.com"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-12-01T03:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-12-01T03:00:00Z"
 *                 total:
 *                   type: integer
 *                   example: 50
 *                   description: Total number of items
 *                 page:
 *                   type: integer
 *                   example: 1
 *                   description: Current page number
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                   description: Total number of pages
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       403:
 *         description: Forbidden - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Admin access required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

// update admin iteme status
// update admin item status
/**
 * @swagger
 * /items/updateAdminItemStatus/{id}:
 *   post:
 *     summary: Update admin item status
 *     description: Update the stock status and badge of an existing admin item.
 *     tags: [AdminItems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stock_status:
 *                 type: string
 *                 enum: [in_stock, out_of_stock, pre_order]
 *                 example: "in_stock"
 *               badge:
 *                 type: string
 *                 nullable: true
 *                 example: "Best Seller"
 *             required:
 *               - stock_status
 *     responses:
 *       200:
 *         description: Successfully updated item status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Item status updated successfully"
 *                 updatedItem:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     stock_status:
 *                       type: string
 *                       example: "in_stock"
 *                     badge:
 *                       type: string
 *                       example: "Best Seller"
 *                     updated_by:
 *                       type: string
 *                       example: "admin@example.com"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-12-01T04:00:00Z"
 *       400:
 *         description: Bad request - Invalid data provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid stock_status value"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Item not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

// get orders
/**
 * @swagger
 * /items/getOrder:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve a list of all orders placed by customers
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of orders per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Pending, Completed, Cancelled]
 *         description: Filter orders by status
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by customer name or item name
 *     responses:
 *       200:
 *         description: Successfully retrieved orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       customer_id:
 *                         type: integer
 *                         example: 1
 *                       user_item_id:
 *                         type: integer
 *                         example: 2
 *                       contact_number:
 *                         type: string
 *                         example: "0912345678"
 *                       address:
 *                         type: string
 *                         example: "123 Main St"
 *                       payment_method:
 *                         type: string
 *                         example: "COD"
 *                       additional_notes:
 *                         type: string
 *                         nullable: true
 *                         example: "Leave at the front desk"
 *                       status:
 *                         type: string
 *                         example: "Pending"
 *                       created_by:
 *                         type: string
 *                         example: "admin@example.com"
 *                       updated_by:
 *                         type: string
 *                         nullable: true
 *                         example: "admin@example.com"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-12-01T03:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-12-01T03:00:00Z"
 *                       orderDetails:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             item_id:
 *                               type: integer
 *                               example: 5
 *                             quantity:
 *                               type: integer
 *                               example: 2
 *                             price:
 *                               type: number
 *                               format: decimal
 *                               example: 1500.50
 *                             order_id:
 *                               type: integer
 *                               example: 1
 *                             item_name:
 *                               type: string
 *                               example: "Laptop"
 *                 total:
 *                   type: integer
 *                   example: 20
 *                   description: Total number of orders
 *                 page:
 *                   type: integer
 *                   example: 1
 *                   description: Current page number
 *                 totalPages:
 *                   type: integer
 *                   example: 2
 *                   description: Total number of pages
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       403:
 *         description: Forbidden - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Admin access required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post(
  "/createUserItem",
  authenticateJWT,
  multerUpload.single("image"),
  itemController.createUserItem
);
router.get("/userItemLost", authenticateJWT, itemController.getUserLostItem);
router.put(
  "/update-status/:id",
  authenticateJWT,
  itemController.updateItemStatus
);
router.get("/getAllUserItem", authenticateJWT, itemController.getAllUserItem);
router.patch("/update-item/:id", authenticateJWT, itemController.updateUserItem);
router.get(
  "/get-specific-item/:id",
  authenticateJWT,
  itemController.getSpecificItem
);
router.get(
  "/get-specific-token-item/:token",
  itemController.getSpecificItemByToken
);
router.get("/send-qr-notification/:token", itemController.sendQRNotification);
router.delete("/delete-item/:id", authenticateJWT, itemController.deleteItem);

router.post(
  "/createAdminItem",
  authenticateJWT,
  multerUpload.single("image"),
  itemController.createAdminItem
);

router.get("/getAdminItem", authenticateJWT, itemController.getAdminItem);

router.post(
  "/updateAdminItemStatus/:id",
  authenticateJWT,
  itemController.updateAdminItemStatus
);

router.patch(
  "/updateAdminItem/:id",
  authenticateJWT,
  itemController.updateAdminItem
);

router.post("/createOrder", authenticateJWT, itemController.createOrder);

router.get("/getOrder", authenticateJWT, itemController.getOrder);

router.post("/submitReport/:token", itemController.submitReport);

router.post("/order-toggle/:id", authenticateJWT, itemController.orderToggle);

router.get("/item-report-found", authenticateJWT, itemController.itemReportFound);


export default router;
