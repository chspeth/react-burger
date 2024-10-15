import { FC } from 'react';
import { useSelector } from 'react-redux';
import { filterProducts } from '../../../utils/util';
import IngredientsItem from '../ingredient-item/ingredient-item';
import styles from './ingredients-list.module.css';

interface IIngredientsListProps {
  categoryType: string;
}

interface IIngredient {
  _id: string;
  name: string;
  type: 'bun' | 'sauce' | 'main';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

interface IProductsState {
  productData: IIngredient[];
  isLoading: boolean;
  hasError: boolean;
}

const IngredientsList: FC<IIngredientsListProps> = ({ categoryType }) => {
  const productData = useSelector((state: { products: IProductsState }) => state.products.productData);
  const ingredients: IIngredient[] = filterProducts(productData, categoryType);
  
  return (
    <ul className={ styles['ingredients-list'] }>
      {ingredients.map(ingredient => (
        <IngredientsItem key={ingredient._id} ingredient={ingredient} />
      ))}
    </ul>
  )
}

export default IngredientsList;