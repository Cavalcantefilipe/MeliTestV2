import SellerRepository from '../../domain/SellerRepository';

export default class GetSellers {
  constructor(private sellerRepository: SellerRepository) {}

  async execute(): Promise<GetSellersOutput[]> {
    const sellers = await this.sellerRepository.findAll();
    return sellers.map(seller => ({
      id: seller.id,
      name: seller.name,
      email: seller.email,
      phone: seller.phone,
      sales: seller.sales
    }));
  }
}

export interface GetSellersOutput {
  id: string;
  name: string;
  email: string;
  phone?: string;
  sales: number;
}