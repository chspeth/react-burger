export const filterProducts = (products, type) => {
  return products.filter(product => product.type === type);
};

export const productsCategories = [
  {type: 'bun', title: 'Булки'},
  {type: 'sauce', title: 'Соусы'},
  {type: 'main', title: 'Начинки'}
];

export const BASE_URL = 'https://norma.nomoreparties.space/api';

async function checkResponse(res) {
  if (!res.ok) {
    const error = new Error(`Ошибка: ${res.status}`);
    error.status = res.status;
    throw error;
  }
  return await res.json();
}

export async function request(url, options) {
  const res = await fetch(url, options);
  return await checkResponse(res);
}
