export default class Category {
  constructor(
    public readonly id: string,
    public readonly name: string
  ) {
    this.validateName(name);
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Category name is required');
    }
    if (name.length > 100) {
      throw new Error('Category name cannot exceed 100 characters');
    }
  }

  static create(name: string): Category {
    const { v4: uuidv4 } = require('uuid');
    return new Category(uuidv4(), name.trim());
  }
}