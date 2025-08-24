import Product from '../../domain/entities/Product';
import ProductRepository from '../../domain/ProductRepository';
import CategoryRepository from '../../domain/CategoryRepository';
import SellerRepository from '../../domain/SellerRepository';

export default class CreateProduct {
  constructor(
    private productRepository: ProductRepository,
    private categoryRepository: CategoryRepository,
    private sellerRepository: SellerRepository
  ) {}

  async execute(input: CreateProductInput): Promise<CreateProductOutput> {
    // Validate that category exists
    const category = await this.categoryRepository.findById(input.categoryId);
    if (!category) {
      throw new Error('Category not found');
    }

    // Validate that seller exists
    const seller = await this.sellerRepository.findById(input.sellerId);
    if (!seller) {
      throw new Error('Seller not found');
    }

    const product = Product.create(
      input.name,
      input.price,
      input.categoryId,
      input.sellerId,
      input.description,
      input.quantity,
      input.images,
      input.realUrl,
      input.productFeatures
    );

    await this.productRepository.create(product);

    return {
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
  }
}

export interface CreateProductInput {
  name: string;
  price: number;
  categoryId: string;
  sellerId: string;
  description?: string;
  quantity?: number;
  images?: string[];
  realUrl?: string;
  productFeatures?: any;
}

export interface CreateProductOutput {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  sellerId: string;
  description?: string;
  quantity: number;
  sales: number;
  rating?: number;
  condition: string;
  images: string[];
  realUrl?: string;
  productFeatures?: any;
}