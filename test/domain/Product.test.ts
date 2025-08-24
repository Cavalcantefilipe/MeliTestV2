import Product from '../../src/domain/entities/Product';

describe('Product', () => {
  it('should create a product with valid data', () => {
    const product = new Product(
      'test-id',
      'Test Product',
      99.99,
      'cat-id',
      'seller-id',
      'Test description',
      10,
      5,
      4.5,
      'Novo',
      ['image1.jpg'],
      'http://example.com',
      { brand: 'Test' }
    );

    expect(product.id).toBe('test-id');
    expect(product.name).toBe('Test Product');
    expect(product.price).toBe(99.99);
    expect(product.categoryId).toBe('cat-id');
    expect(product.sellerId).toBe('seller-id');
    expect(product.description).toBe('Test description');
    expect(product.quantity).toBe(10);
    expect(product.sales).toBe(5);
    expect(product.rating).toBe(4.5);
    expect(product.condition).toBe('Novo');
    expect(product.images).toEqual(['image1.jpg']);
    expect(product.realUrl).toBe('http://example.com');
    expect(product.productFeatures).toEqual({ brand: 'Test' });
  });

  it('should create a product using static method', () => {
    const product = Product.create(
      'Test Product',
      99.99,
      'cat-id',
      'seller-id',
      'Test description',
      10,
      ['image1.jpg'],
      'http://example.com',
      { brand: 'Test' }
    );

    expect(product.name).toBe('Test Product');
    expect(product.price).toBe(99.99);
    expect(product.categoryId).toBe('cat-id');
    expect(product.sellerId).toBe('seller-id');
    expect(product.sales).toBe(0);
    expect(product.condition).toBe('Novo');
    expect(product.id).toBeDefined();
  });

  it('should throw error for empty name', () => {
    expect(() => new Product('test-id', '', 99.99, 'cat-id', 'seller-id'))
      .toThrow('Product name is required');
  });

  it('should throw error for negative price', () => {
    expect(() => new Product('test-id', 'Test Product', -1, 'cat-id', 'seller-id'))
      .toThrow('Product price cannot be negative');
  });

  it('should throw error for empty categoryId', () => {
    expect(() => new Product('test-id', 'Test Product', 99.99, '', 'seller-id'))
      .toThrow('Product categoryId is required');
  });

  it('should throw error for empty sellerId', () => {
    expect(() => new Product('test-id', 'Test Product', 99.99, 'cat-id', ''))
      .toThrow('Product sellerId is required');
  });

  it('should throw error for invalid rating', () => {
    expect(() => new Product('test-id', 'Test Product', 99.99, 'cat-id', 'seller-id', undefined, 0, 0, 6))
      .toThrow('Product rating must be between 0 and 5');
  });

  it('should throw error for negative quantity', () => {
    expect(() => new Product('test-id', 'Test Product', 99.99, 'cat-id', 'seller-id', undefined, -1))
      .toThrow('Product quantity cannot be negative');
  });
});