import { FC } from 'react';
import { useAppSelector } from '../../../utils/types';
import { filterProducts } from '../../../utils/util';
import IngredientsItem from '../ingredient-item/ingredient-item';
import styles from './ingredients-list.module.css';
import { IIngredientsListProps, IIngredientBase } from '../../../utils/types';

const IngredientsList: FC<IIngredientsListProps> = ({ categoryType }) => {
  const productData = useAppSelector(state => state.products.productData);
  const ingredients: IIngredientBase[] = filterProducts(productData, categoryType);
  
  return (
    <ul className={ styles['ingredients-list'] }>
      {ingredients.map(ingredient => (
        <IngredientsItem key={ingredient._id} ingredient={ingredient} />
      ))}
    </ul>
  )
}

export default IngredientsList;