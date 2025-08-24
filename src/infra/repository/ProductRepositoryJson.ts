import * as fs from 'fs';
import * as path from 'path';
import Product from '../../domain/entities/Product';
import ProductRepository from '../../domain/ProductRepository';

export default class ProductRepositoryJson implements ProductRepository {
  private filePath: string;

  constructor() {
    this.filePath = path.join(process.cwd(), 'database', 'product.json');
  }

  private async readData(): Promise<Record<string, any>> {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return {};
    }
  }

  private async writeData(data: Record<string, any>): Promise<void> {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(this.filePath, jsonData);
  }

  async create(product: Product): Promise<void> {
    const data = await this.readData();
    data[product.id] = {
      id: product.id,
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
      sellerId: product.sellerId,
      description: product.description,
      quantity: product.quantity,
      sales: product.sales,
      rating: product.rating,
      condition: product.condition,
      images: product.images,
      realUrl: product.realUrl,
      productFeatures: product.productFeatures
    };
    await this.writeData(data);
  }

  async findById(id: string): Promise<Product | null> {
    const data = await this.readData();
    const productData = data[id];
    if (!productData) return null;
    return new Product(
      productData.id,
      productData.name,
      productData.price,
      productData.categoryId,
      productData.sellerId,
      productData.description,
      productData.quantity || 0,
      productData.sales || 0,
      productData.rating,
      productData.condition || 'Novo',
      productData.images || [],
      productData.realUrl,
      productData.productFeatures
    );
  }

  async findByCategoryId(categoryId: string): Promise<Product[]> {
    const data = await this.readData();
    return Object.values(data)
      .filter((product: any) => product.categoryId === categoryId)
      .map((product: any) => new Product(
        product.id,
        product.name,
        product.price,
        product.categoryId,
        product.sellerId,
        product.description,
        product.quantity || 0,
        product.sales || 0,
        product.rating,
        product.condition || 'Novo',
        product.images || [],
        product.realUrl,
        product.productFeatures
      ));
  }

  async findBySellerId(sellerId: string): Promise<Product[]> {
    const data = await this.readData();
    return Object.values(data)
      .filter((product: any) => product.sellerId === sellerId)
      .map((product: any) => new Product(
        product.id,
        product.name,
        product.price,
        product.categoryId,
        product.sellerId,
        product.description,
        product.quantity || 0,
        product.sales || 0,
        product.rating,
        product.condition || 'Novo',
        product.images || [],
        product.realUrl,
        product.productFeatures
      ));
  }

  async findAll(): Promise<Product[]> {
    const data = await this.readData();
    return Object.values(data).map((product: any) => new Product(
      product.id,
      product.name,
      product.price,
      product.categoryId,
      product.sellerId,
      product.description,
      product.quantity || 0,
      product.sales || 0,
      product.rating,
      product.condition || 'Novo',
      product.images || [],
      product.realUrl,
      product.productFeatures
    ));
  }

  async update(product: Product): Promise<void> {
    const data = await this.readData();
    if (!data[product.id]) {
      throw new Error('Product not found');
    }
    data[product.id] = {
      id: product.id,
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
      sellerId: product.sellerId,
      description: product.description,
      quantity: product.quantity,
      sales: product.sales,
      rating: product.rating,
      condition: product.condition,
      images: product.images,
      realUrl: product.realUrl,
      productFeatures: product.productFeatures
    };
    await this.writeData(data);
  }

  async delete(id: string): Promise<void> {
    const data = await this.readData();
    if (!data[id]) {
      throw new Error('Product not found');
    }
    delete data[id];
    await this.writeData(data);
  }
}