import Seller from './entities/Seller';

export default interface SellerRepository {
  create(seller: Seller): Promise<void>;
  findById(id: string): Promise<Seller | null>;
  findByEmail(email: string): Promise<Seller | null>;
  findAll(): Promise<Seller[]>;
  update(seller: Seller): Promise<void>;
  delete(id: string): Promise<void>;
}