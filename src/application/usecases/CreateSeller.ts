import Seller from '../../domain/entities/Seller';
import SellerRepository from '../../domain/SellerRepository';

export default class CreateSeller {
  constructor(private sellerRepository: SellerRepository) {}

  async execute(input: CreateSellerInput): Promise<CreateSellerOutput> {
    // Check if email already exists (unique constraint)
    const existingSeller = await this.sellerRepository.findByEmail(input.email);
    if (existingSeller) {
      throw new Error('Email already exists');
    }

    const seller = Seller.create(input.name, input.email, input.phone);
    await this.sellerRepository.create(seller);

    return {
      id: seller.id,
      name: seller.name,
      email: seller.email,
      phone: seller.phone,
      sales: seller.sales
    };
  }
}

export interface CreateSellerInput {
  name: string;
  email: string;
  phone?: string;
}

export interface CreateSellerOutput {
  id: string;
  name: string;
  email: string;
  phone?: string;
  sales: number;
}