import { IIngredientBase } from './types';

export const filterProducts = (products: IIngredientBase[], type: string): IIngredientBase[] => {
  return products.filter(product => product.type === type);
};

export const productsCategories: Array<{ type: string; title: string }> = [
  {type: 'bun', title: 'Булки'},
  {type: 'sauce', title: 'Соусы'},
  {type: 'main', title: 'Начинки'}
];

export const BASE_URL = 'https://norma.nomoreparties.space/api';

async function checkResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const error: Error & { status?: number } = new Error(
      errorData?.message || `Ошибка: ${res.status}`
    );
    error.status = res.status;
    throw error;
  }
  return await res.json();
}

export async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  return await checkResponse<T>(res);
}
