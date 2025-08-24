import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { HttpServer } from './HttpServer';

export default class ExpressAdapter implements HttpServer {
  app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.setupSwagger();
    this.setupCors();
  }

  private setupSwagger(): void {
    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'MeliTest V2 API',
          version: '1.0.0',
          description: 'E-commerce API with clean architecture',
        },
        servers: [
          {
            url: 'http://localhost:3000',
            description: 'Development server',
          },
        ],
      },
      apis: ['./src/infra/controller/*.ts'],
    };

    const specs = swaggerJsdoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private setupCors(): void {
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
  }

  register(method: string, url: string, callback: Function): void {
    (this.app as any)[method](url, async (req: express.Request, res: express.Response) => {
      try {
        const output = await callback(req.params, req.body, req.query);
        res.json(output);
      } catch (error: any) {
        res.status(400).json({
          message: error.message
        });
      }
    });
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
    });
  }
}