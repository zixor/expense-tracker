import { CategoryModel } from './category.model';

export interface SavingModel {
    id?: number,
    category: CategoryModel,
    description: string,
    goalDate: string,
    amount: number,
    deposit: string,
    percentage?: string
}