/**
 * @swagger
 * tags:
 *   name: Accessory
 *   description: CRUD operations for managing accessory
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Accessory:
 *       type: object
 *       required:
 *         - name
 *         - options
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the accessory
 *         options:
 *           type: array
 *           items:
 *             type: string
 *           description: The list of available options for the accessory
 *         price:
 *           type: number
 *           description: The price of the accessory
 */

/**
 * @swagger
 * /accessories:
 *   post:
 *     summary: Create a new accessory
 *     tags: [Accessory]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Accessory'
 *     responses:
 *       201:
 *         description: Accessory created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       403:
 *         description: One of the fields is empty, or the accessory already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /accessories:
 *   get:
 *     summary: Retrieve all accessories
 *     tags: [Accessory]
 *     responses:
 *       200:
 *         description: A list of all accessories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Accessory'
 *       404:
 *         description: No accessories found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /accessories/{name}:
 *   get:
 *     summary: Retrieve a specific accessory by its name
 *     tags: [Accessory]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the accessory to retrieve
 *     responses:
 *       200:
 *         description: The details of the requested accessory
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Accessory'
 *       404:
 *         description: Accessory not found
 *       500:
 *         description: Internal server error
 */
