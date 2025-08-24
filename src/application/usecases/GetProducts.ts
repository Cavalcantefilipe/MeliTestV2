import ProductRepository from '../../domain/ProductRepository';

export default class GetProducts {
  constructor(private productRepository: ProductRepository) {}

  async execute(filters?: GetProductsFilters): Promise<GetProductsOutput[]> {
    let products;

    if (filters?.categoryId) {
      products = await this.productRepository.findByCategoryId(filters.categoryId);
    } else if (filters?.sellerId) {
      products = await this.productRepository.findBySellerId(filters.sellerId);
    } else {
      products = await this.productRepository.findAll();
    }

    return products.map(product => ({
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
    }));
  }
}

export interface GetProductsFilters {
  categoryId?: string;
  sellerId?: string;
}

export interface GetProductsOutput {
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