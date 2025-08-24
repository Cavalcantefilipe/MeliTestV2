import Seller from '../../src/domain/entities/Seller';

describe('Seller', () => {
  it('should create a seller with valid data', () => {
    const seller = new Seller('test-id', 'Test Store', 'test@example.com', '+5511999999999', 100);
    expect(seller.id).toBe('test-id');
    expect(seller.name).toBe('Test Store');
    expect(seller.email).toBe('test@example.com');
    expect(seller.phone).toBe('+5511999999999');
    expect(seller.sales).toBe(100);
  });

  it('should create a seller using static method', () => {
    const seller = Seller.create('Test Store', 'test@example.com', '+5511999999999');
    expect(seller.name).toBe('Test Store');
    expect(seller.email).toBe('test@example.com');
    expect(seller.phone).toBe('+5511999999999');
    expect(seller.sales).toBe(0);
    expect(seller.id).toBeDefined();
  });

  it('should throw error for empty name', () => {
    expect(() => new Seller('test-id', '', 'test@example.com')).toThrow('Seller name is required');
  });

  it('should throw error for invalid email', () => {
    expect(() => new Seller('test-id', 'Test Store', 'invalid-email')).toThrow('Seller email must be valid');
  });

  it('should throw error for negative sales', () => {
    expect(() => new Seller('test-id', 'Test Store', 'test@example.com', '+5511999999999', -1)).toThrow('Sales count cannot be negative');
  });

  it('should normalize email to lowercase', () => {
    const seller = Seller.create('Test Store', 'TEST@EXAMPLE.COM');
    expect(seller.email).toBe('test@example.com');
  });
});