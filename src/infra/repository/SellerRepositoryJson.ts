import * as fs from 'fs';
import * as path from 'path';
import Seller from '../../domain/entities/Seller';
import SellerRepository from '../../domain/SellerRepository';

export default class SellerRepositoryJson implements SellerRepository {
  private filePath: string;

  constructor() {
    this.filePath = path.join(process.cwd(), 'database', 'seeler.json');
  }

  private async readData(): Promise<Record<string, any>> {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return {};
    }
  }

  private async writeData(data: Record<string, any>): Promise<void> {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(this.filePath, jsonData);
  }

  async create(seller: Seller): Promise<void> {
    const data = await this.readData();
    data[seller.id] = {
      id: seller.id,
      name: seller.name,
      email: seller.email,
      phone: seller.phone,
      sales: seller.sales
    };
    await this.writeData(data);
  }

  async findById(id: string): Promise<Seller | null> {
    const data = await this.readData();
    const sellerData = data[id];
    if (!sellerData) return null;
    return new Seller(
      sellerData.id,
      sellerData.name,
      sellerData.email,
      sellerData.phone,
      sellerData.sales || 0
    );
  }

  async findByEmail(email: string): Promise<Seller | null> {
    const data = await this.readData();
    const sellerEntry = Object.values(data).find((seller: any) => 
      seller.email.toLowerCase() === email.toLowerCase()
    );
    if (!sellerEntry) return null;
    const seller = sellerEntry as any;
    return new Seller(seller.id, seller.name, seller.email, seller.phone, seller.sales || 0);
  }

  async findAll(): Promise<Seller[]> {
    const data = await this.readData();
    return Object.values(data).map((seller: any) => 
      new Seller(seller.id, seller.name, seller.email, seller.phone, seller.sales || 0)
    );
  }

  async update(seller: Seller): Promise<void> {
    const data = await this.readData();
    if (!data[seller.id]) {
      throw new Error('Seller not found');
    }
    data[seller.id] = {
      id: seller.id,
      name: seller.name,
      email: seller.email,
      phone: seller.phone,
      sales: seller.sales
    };
    await this.writeData(data);
  }

  async delete(id: string): Promise<void> {
    const data = await this.readData();
    if (!data[id]) {
      throw new Error('Seller not found');
    }
    delete data[id];
    await this.writeData(data);
  }
}