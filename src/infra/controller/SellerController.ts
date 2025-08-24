import { HttpServer } from '../http/HttpServer';
import Registry from '../di/Registry';
import CreateSeller from '../../application/usecases/CreateSeller';
import GetSellers from '../../application/usecases/GetSellers';

/**
 * @swagger
 * components:
 *   schemas:
 *     Seller:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated unique identifier
 *         name:
 *           type: string
 *           description: The seller name
 *         email:
 *           type: string
 *           format: email
 *           description: The seller email (must be unique and valid)
 *         phone:
 *           type: string
 *           description: The seller phone number
 *         sales:
 *           type: number
 *           description: The number of sales made by the seller
 *       example:
 *         id: "MLB123456789"
 *         name: "TenditudoSp"
 *         email: "contato@tenditudosp.com.br"
 *         phone: "+5511999999999"
 *         sales: 10000
 *     CreateSellerRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: The seller name
 *         email:
 *           type: string
 *           format: email
 *           description: The seller email
 *         phone:
 *           type: string
 *           description: The seller phone number
 *       example:
 *         name: "Pet Store"
 *         email: "contact@petstore.com"
 *         phone: "+5511987654321"
 */

export default class SellerController {
  constructor() {
    const httpServer: HttpServer = Registry.getInstance().inject('httpServer');
    const createSeller: CreateSeller = Registry.getInstance().inject('createSeller');
    const getSellers: GetSellers = Registry.getInstance().inject('getSellers');

    /**
     * @swagger
     * /sellers:
     *   post:
     *     summary: Create a new seller
     *     tags: [Sellers]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateSellerRequest'
     *     responses:
     *       200:
     *         description: Seller created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Seller'
     *       400:
     *         description: Bad request (validation error or email already exists)
     */
    httpServer.register('post', '/sellers', async (params: any, body: any) => {
      return await createSeller.execute(body);
    });

    /**
     * @swagger
     * /sellers:
     *   get:
     *     summary: Get all sellers
     *     tags: [Sellers]
     *     responses:
     *       200:
     *         description: List of all sellers
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Seller'
     */
    httpServer.register('get', '/sellers', async () => {
      return await getSellers.execute();
    });
  }
}