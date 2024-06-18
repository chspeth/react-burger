import PropTypes from 'prop-types';
import { ingredientType } from '../../../utils/types';
import IngredientsItem from '../ingredient-item/ingredient-item';
import styles from './ingredients-list.module.css';

const IngredientsList = ({ ingredients }) => {
  return (
    <ul className={ styles['ingredients-list'] }>
      {ingredients.map(ingredient => (
      <IngredientsItem key={ingredient._id} ingredient={ingredient} />
      ))}
    </ul>
  )
}

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType)
}

export default IngredientsList;