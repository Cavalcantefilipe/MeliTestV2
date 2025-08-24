import Category from '../../domain/entities/Category';
import CategoryRepository from '../../domain/CategoryRepository';

export default class CreateCategory {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
    // Check if category name already exists (unique constraint)
    const existingCategory = await this.categoryRepository.findByName(input.name);
    if (existingCategory) {
      throw new Error('Category name already exists');
    }

    const category = Category.create(input.name);
    await this.categoryRepository.create(category);

    return {
      id: category.id,
      name: category.name
    };
  }
}

export interface CreateCategoryInput {
  name: string;
}

export interface CreateCategoryOutput {
  id: string;
  name: string;
}