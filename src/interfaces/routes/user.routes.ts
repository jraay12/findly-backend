import { Router } from "express";
import userController from "../controllers/user.controller";
import { authenticateJWT } from "../../middleware/auth.middleware";
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUserDTO:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - role
 *         - first_name
 *         - last_name
 *       properties:
 *         email:
 *           type: string
 *           description: Unique email for the user
 *         password:
 *           type: string
 *           description: User password
 *         role:
 *           type: string
 *           description: Role of the user (e.g., admin, site engineer)
 *         first_name:
 *           type: string
 *         middle_name:
 *           type: string
 *         last_name:
 *           type: string
 *         contact_number:
 *           type: string
 *         address:
 *           type: string
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         email:
 *           type: string
 *         role:
 *           type: string
 *         status:
 *           type: boolean
 *         created_by:
 *           type: integer
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         user_information:
 *           $ref: '#/components/schemas/CreateUserDTO'
 */

/**
 * @swagger
 * /users/createUser:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDTO'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /users/getUser:
 *   get:
 *     summary: Get all users (requires authentication)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Unauthorized - missing or invalid token
 */

/**
 * @swagger
 * /users/loginUser:
 *   post:
 *     summary: Login a user and get JWT token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /users/updateStatus/{id}:
 *   patch:
 *     summary: Update user status (activate/deactivate) by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []   # Requires JWT token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to update
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
 *                 type: boolean
 *                 description: New status of the user (true = active, false = inactive)
 *     responses:
 *       200:
 *         description: User status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User status updated successfully
 *                 user:
 *                   $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Invalid ID or input
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       404:
 *         description: User not found
 */


// user information
/**
 * @swagger
 * /users/getUserInformation:
 *   get:
 *     summary: Get information of the currently authenticated user
 *     description: Retrieves detailed information of the user based on the JWT token provided in the request header.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Users retrieved successfully"
 *                 data:
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
 *                     email:
 *                       type: string
 *                       example: "john@example.com"
 *                     contact_number:
 *                       type: string
 *                       example: "09123456789"
 *                     address:
 *                       type: string
 *                       example: "123 Main St, City"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-30T03:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-30T03:05:00Z"
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Internal server error
 */

router.post("/createUser", userController.createUser);
router.get("/getUser", authenticateJWT, userController.getUser);
router.post("/loginUser", userController.loginUser);
router.patch(
  "/updateStatus/:id",
  authenticateJWT,
  userController.updateUserStatus
);
router.get("/verify", userController.verify);
router.get("/getUserInformation", authenticateJWT, userController.getUserInformation);


export default router;
