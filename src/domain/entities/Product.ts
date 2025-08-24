export default class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: number,
    public readonly categoryId: string,
    public readonly sellerId: string,
    public readonly description?: string,
    public readonly quantity: number = 0,
    public readonly sales: number = 0,
    public readonly rating?: number,
    public readonly condition: string = 'Novo',
    public readonly images: string[] = [],
    public readonly realUrl?: string,
    public readonly productFeatures?: any
  ) {
    this.validateName(name);
    this.validatePrice(price);
    this.validateCategoryId(categoryId);
    this.validateSellerId(sellerId);
    this.validateQuantity(quantity);
    this.validateSales(sales);
    this.validateRating(rating);
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Product name is required');
    }
    if (name.length > 200) {
      throw new Error('Product name cannot exceed 200 characters');
    }
  }

  private validatePrice(price: number): void {
    if (price === undefined || price === null) {
      throw new Error('Product price is required');
    }
    if (price < 0) {
      throw new Error('Product price cannot be negative');
    }
  }

  private validateCategoryId(categoryId: string): void {
    if (!categoryId || categoryId.trim().length === 0) {
      throw new Error('Product categoryId is required');
    }
  }

  private validateSellerId(sellerId: string): void {
    if (!sellerId || sellerId.trim().length === 0) {
      throw new Error('Product sellerId is required');
    }
  }

  private validateQuantity(quantity: number): void {
    if (quantity < 0) {
      throw new Error('Product quantity cannot be negative');
    }
  }

  private validateSales(sales: number): void {
    if (sales < 0) {
      throw new Error('Product sales cannot be negative');
    }
  }

  private validateRating(rating?: number): void {
    if (rating !== undefined && (rating < 0 || rating > 5)) {
      throw new Error('Product rating must be between 0 and 5');
    }
  }

  static create(
    name: string,
    price: number,
    categoryId: string,
    sellerId: string,
    description?: string,
    quantity: number = 0,
    images: string[] = [],
    realUrl?: string,
    productFeatures?: any
  ): Product {
    const { v4: uuidv4 } = require('uuid');
    return new Product(
      uuidv4(),
      name.trim(),
      price,
      categoryId.trim(),
      sellerId.trim(),
      description?.trim(),
      quantity,
      0, // sales start at 0
      undefined, // rating starts undefined
      'Novo',
      images,
      realUrl?.trim(),
      productFeatures
    );
  }
}