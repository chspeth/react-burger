import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { filterProducts } from '../../../utils/util';
import IngredientsItem from '../ingredient-item/ingredient-item';
import styles from './ingredients-list.module.css';

const IngredientsList = ({ categoryType }) => {
  const productData = useSelector((state) => state.products.productData);
  const ingredients= filterProducts(productData, categoryType);
  
  return (
    <ul className={ styles['ingredients-list'] }>
      {ingredients.map(ingredient => (
        <IngredientsItem key={ingredient._id} ingredient={ingredient} />
      ))}
    </ul>
  )
}

IngredientsList.propTypes = {
  categoryType: PropTypes.string
}

export default IngredientsList;