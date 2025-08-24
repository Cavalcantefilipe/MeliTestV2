import { HttpServer } from '../http/HttpServer';
import Registry from '../di/Registry';
import CreateProduct from '../../application/usecases/CreateProduct';
import GetProducts from '../../application/usecases/GetProducts';

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - categoryId
 *         - sellerId
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated unique identifier
 *         name:
 *           type: string
 *           description: The product name
 *         price:
 *           type: number
 *           minimum: 0
 *           description: The product price
 *         categoryId:
 *           type: string
 *           format: uuid
 *           description: The category ID (must reference existing category)
 *         sellerId:
 *           type: string
 *           description: The seller ID (must reference existing seller)
 *         description:
 *           type: string
 *           description: The product description
 *         quantity:
 *           type: number
 *           minimum: 0
 *           description: The product quantity in stock
 *         sales:
 *           type: number
 *           minimum: 0
 *           description: The number of sales made
 *         rating:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *           description: The product rating
 *         condition:
 *           type: string
 *           description: The product condition
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs
 *         realUrl:
 *           type: string
 *           description: The real product URL
 *         productFeatures:
 *           type: object
 *           description: Product features object
 *       example:
 *         id: "ef91feca-23e5-46ea-831d-5ddb1d8bd436"
 *         name: "Brinquedo Cachorro Bolas Borracha"
 *         price: 21.9
 *         categoryId: "90cf70ec-0d74-439e-9ab3-6fde1e3a2d10"
 *         sellerId: "MLB123456789"
 *         description: "Brinquedo para cachorro de alta qualidade"
 *         quantity: 500
 *         sales: 2300
 *         rating: 4.8
 *         condition: "Novo"
 *         images: []
 *     CreateProductRequest:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - categoryId
 *         - sellerId
 *       properties:
 *         name:
 *           type: string
 *           description: The product name
 *         price:
 *           type: number
 *           minimum: 0
 *           description: The product price
 *         categoryId:
 *           type: string
 *           format: uuid
 *           description: The category ID
 *         sellerId:
 *           type: string
 *           description: The seller ID
 *         description:
 *           type: string
 *           description: The product description
 *         quantity:
 *           type: number
 *           minimum: 0
 *           description: The product quantity
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs
 *         realUrl:
 *           type: string
 *           description: The real product URL
 *         productFeatures:
 *           type: object
 *           description: Product features object
 *       example:
 *         name: "New Product"
 *         price: 29.99
 *         categoryId: "90cf70ec-0d74-439e-9ab3-6fde1e3a2d10"
 *         sellerId: "MLB123456789"
 *         description: "A great new product"
 *         quantity: 100
 */

export default class ProductController {
  constructor() {
    const httpServer: HttpServer = Registry.getInstance().inject('httpServer');
    const createProduct: CreateProduct = Registry.getInstance().inject('createProduct');
    const getProducts: GetProducts = Registry.getInstance().inject('getProducts');

    /**
     * @swagger
     * /products:
     *   post:
     *     summary: Create a new product
     *     tags: [Products]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateProductRequest'
     *     responses:
     *       200:
     *         description: Product created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Product'
     *       400:
     *         description: Bad request (validation error, category not found, or seller not found)
     */
    httpServer.register('post', '/products', async (params: any, body: any) => {
      return await createProduct.execute(body);
    });

    /**
     * @swagger
     * /products:
     *   get:
     *     summary: Get all products (with optional filters)
     *     tags: [Products]
     *     parameters:
     *       - in: query
     *         name: categoryId
     *         schema:
     *           type: string
     *           format: uuid
     *         description: Filter products by category ID
     *       - in: query
     *         name: sellerId
     *         schema:
     *           type: string
     *         description: Filter products by seller ID
     *     responses:
     *       200:
     *         description: List of products
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Product'
     */
    httpServer.register('get', '/products', async (params: any, body: any, query: any) => {
      return await getProducts.execute(query);
    });
  }
}