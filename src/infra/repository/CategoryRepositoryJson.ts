import * as fs from 'fs';
import * as path from 'path';
import Category from '../../domain/entities/Category';
import CategoryRepository from '../../domain/CategoryRepository';

export default class CategoryRepositoryJson implements CategoryRepository {
  private filePath: string;

  constructor() {
    this.filePath = path.join(process.cwd(), 'database', 'category.json');
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

  async create(category: Category): Promise<void> {
    const data = await this.readData();
    data[category.id] = {
      id: category.id,
      name: category.name
    };
    await this.writeData(data);
  }

  async findById(id: string): Promise<Category | null> {
    const data = await this.readData();
    const categoryData = data[id];
    if (!categoryData) return null;
    return new Category(categoryData.id, categoryData.name);
  }

  async findByName(name: string): Promise<Category | null> {
    const data = await this.readData();
    const categoryEntry = Object.values(data).find((cat: any) => 
      cat.name.toLowerCase() === name.toLowerCase()
    );
    if (!categoryEntry) return null;
    return new Category((categoryEntry as any).id, (categoryEntry as any).name);
  }

  async findAll(): Promise<Category[]> {
    const data = await this.readData();
    return Object.values(data).map((cat: any) => 
      new Category(cat.id, cat.name)
    );
  }

  async update(category: Category): Promise<void> {
    const data = await this.readData();
    if (!data[category.id]) {
      throw new Error('Category not found');
    }
    data[category.id] = {
      id: category.id,
      name: category.name
    };
    await this.writeData(data);
  }

  async delete(id: string): Promise<void> {
    const data = await this.readData();
    if (!data[id]) {
      throw new Error('Category not found');
    }
    delete data[id];
    await this.writeData(data);
  }
}