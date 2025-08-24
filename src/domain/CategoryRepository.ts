import Category from './entities/Category';

export default interface CategoryRepository {
  create(category: Category): Promise<void>;
  findById(id: string): Promise<Category | null>;
  findByName(name: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  update(category: Category): Promise<void>;
  delete(id: string): Promise<void>;
}