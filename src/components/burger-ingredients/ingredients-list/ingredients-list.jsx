import IngredientsItem from '../ingredient-item/ingredient-item';
import styles from './ingredients-list.module.css';

const IngredientsList = ({ ingredients }) => {
  return (
    <ul className={ styles['ingredients-list'] }>
      {ingredients.map(ingredient => (
      <IngredientsItem key={ingredient.id} ingredient={ingredient} />
      ))}
    </ul>
  )
}

export default IngredientsList;