import { HttpServer } from '../http/HttpServer';
import Registry from '../di/Registry';
import CreateCategory from '../../application/usecases/CreateCategory';
import GetCategories from '../../application/usecases/GetCategories';

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated unique identifier
 *         name:
 *           type: string
 *           description: The category name (must be unique)
 *       example:
 *         id: "90cf70ec-0d74-439e-9ab3-6fde1e3a2d10"
 *         name: "Brinquedos para Pet"
 *     CreateCategoryRequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The category name
 *       example:
 *         name: "Electronics"
 */

export default class CategoryController {
  constructor() {
    const httpServer: HttpServer = Registry.getInstance().inject('httpServer');
    const createCategory: CreateCategory = Registry.getInstance().inject('createCategory');
    const getCategories: GetCategories = Registry.getInstance().inject('getCategories');

    /**
     * @swagger
     * /categories:
     *   post:
     *     summary: Create a new category
     *     tags: [Categories]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateCategoryRequest'
     *     responses:
     *       200:
     *         description: Category created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Category'
     *       400:
     *         description: Bad request (validation error or category name already exists)
     */
    httpServer.register('post', '/categories', async (params: any, body: any) => {
      return await createCategory.execute(body);
    });

    /**
     * @swagger
     * /categories:
     *   get:
     *     summary: Get all categories
     *     tags: [Categories]
     *     responses:
     *       200:
     *         description: List of all categories
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Category'
     */
    httpServer.register('get', '/categories', async () => {
      return await getCategories.execute();
    });
  }
}