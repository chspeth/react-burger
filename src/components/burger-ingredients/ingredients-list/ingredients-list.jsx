import PropTypes from 'prop-types';
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
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number
    })
  )
}

export default IngredientsList;