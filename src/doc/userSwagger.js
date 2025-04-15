/**
 * @swagger
 * tags:
 *   name: User
 *   description: CRUD operations for managing users
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email address of the person
 *         password:
 *           type: string
 *           description: The hashed password of the person
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Person logged in successfully
 *       401:
 *         description: Incorrect email or password
 *       404:
 *         description: Person not found
 *       500:
 *         description: Internal server error
 */