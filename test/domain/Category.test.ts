import Category from '../../src/domain/entities/Category';

describe('Category', () => {
  it('should create a category with valid data', () => {
    const category = new Category('test-id', 'Electronics');
    expect(category.id).toBe('test-id');
    expect(category.name).toBe('Electronics');
  });

  it('should create a category using static method', () => {
    const category = Category.create('Electronics');
    expect(category.name).toBe('Electronics');
    expect(category.id).toBeDefined();
  });

  it('should throw error for empty name', () => {
    expect(() => new Category('test-id', '')).toThrow('Category name is required');
  });

  it('should throw error for long name', () => {
    const longName = 'a'.repeat(101);
    expect(() => new Category('test-id', longName)).toThrow('Category name cannot exceed 100 characters');
  });

  it('should trim whitespace from name', () => {
    const category = Category.create('  Electronics  ');
    expect(category.name).toBe('Electronics');
  });
});