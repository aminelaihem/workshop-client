/**
 * @swagger
 * tags:
 *   name: Product
 *   description: CRUD operations for managing products
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - attributes
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the product
 *         attributes:
 *           type: array
 *           items:
 *             type: object
 *           description: Array with all the attributes of the product
 *         price:
 *           type: number
 *           description: The price of the product
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the created product
 *       403:
 *         description: One of the fields is empty or product already exists
 *       500:
 *         description: Internal server error
 */
