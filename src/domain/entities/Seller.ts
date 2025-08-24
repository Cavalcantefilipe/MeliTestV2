import validator from 'validator';

export default class Seller {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly phone?: string,
    public readonly sales: number = 0
  ) {
    this.validateName(name);
    this.validateEmail(email);
    this.validateSales(sales);
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Seller name is required');
    }
    if (name.length > 100) {
      throw new Error('Seller name cannot exceed 100 characters');
    }
  }

  private validateEmail(email: string): void {
    if (!email || email.trim().length === 0) {
      throw new Error('Seller email is required');
    }
    if (!validator.isEmail(email)) {
      throw new Error('Seller email must be valid');
    }
  }

  private validateSales(sales: number): void {
    if (sales < 0) {
      throw new Error('Sales count cannot be negative');
    }
  }

  static create(name: string, email: string, phone?: string): Seller {
    const { v4: uuidv4 } = require('uuid');
    return new Seller(uuidv4(), name.trim(), email.trim().toLowerCase(), phone?.trim(), 0);
  }
}