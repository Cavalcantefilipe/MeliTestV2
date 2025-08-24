// Main - Composition Root
import ExpressAdapter from './infra/http/ExpressAdapter';
import Registry from './infra/di/Registry';

// Repositories
import CategoryRepositoryJson from './infra/repository/CategoryRepositoryJson';
import SellerRepositoryJson from './infra/repository/SellerRepositoryJson';
import ProductRepositoryJson from './infra/repository/ProductRepositoryJson';

// Use Cases
import CreateCategory from './application/usecases/CreateCategory';
import GetCategories from './application/usecases/GetCategories';
import CreateSeller from './application/usecases/CreateSeller';
import GetSellers from './application/usecases/GetSellers';
import CreateProduct from './application/usecases/CreateProduct';
import GetProducts from './application/usecases/GetProducts';

// Controllers
import CategoryController from './infra/controller/CategoryController';
import SellerController from './infra/controller/SellerController';
import ProductController from './infra/controller/ProductController';

// Infrastructure setup
const httpServer = new ExpressAdapter();

// Repositories
const categoryRepository = new CategoryRepositoryJson();
const sellerRepository = new SellerRepositoryJson();
const productRepository = new ProductRepositoryJson();

// Use Cases
const createCategory = new CreateCategory(categoryRepository);
const getCategories = new GetCategories(categoryRepository);
const createSeller = new CreateSeller(sellerRepository);
const getSellers = new GetSellers(sellerRepository);
const createProduct = new CreateProduct(productRepository, categoryRepository, sellerRepository);
const getProducts = new GetProducts(productRepository);

// Dependency Injection
const registry = Registry.getInstance();
registry.provide('httpServer', httpServer);
registry.provide('categoryRepository', categoryRepository);
registry.provide('sellerRepository', sellerRepository);
registry.provide('productRepository', productRepository);
registry.provide('createCategory', createCategory);
registry.provide('getCategories', getCategories);
registry.provide('createSeller', createSeller);
registry.provide('getSellers', getSellers);
registry.provide('createProduct', createProduct);
registry.provide('getProducts', getProducts);

// Controllers
new CategoryController();
new SellerController();
new ProductController();

// Start server
httpServer.listen(3000);