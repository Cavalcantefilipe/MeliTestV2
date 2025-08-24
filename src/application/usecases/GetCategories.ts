import CategoryRepository from '../../domain/CategoryRepository';

export default class GetCategories {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(): Promise<GetCategoriesOutput[]> {
    const categories = await this.categoryRepository.findAll();
    return categories.map(category => ({
      id: category.id,
      name: category.name
    }));
  }
}

export interface GetCategoriesOutput {
  id: string;
  name: string;
}