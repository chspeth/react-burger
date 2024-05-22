export const filterProducts = (products, type) => {
  return products.filter(product => product.type === type);
};

export const productsCategories = [
  {type: 'bun', title: 'Булки'},
  {type: 'sauce', title: 'Соусы'},
  {type: 'main', title: 'Начинки'}
];
