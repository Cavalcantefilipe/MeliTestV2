import Product from './entities/Product';

export default interface ProductRepository {
  create(product: Product): Promise<void>;
  findById(id: string): Promise<Product | null>;
  findByCategoryId(categoryId: string): Promise<Product[]>;
  findBySellerId(sellerId: string): Promise<Product[]>;
  findAll(): Promise<Product[]>;
  update(product: Product): Promise<void>;
  delete(id: string): Promise<void>;
}