import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';

const IngredientItem = ({ ingredient }) => {
  return (
    <li className={ styles['ingredient-item'] }>
      <img className={`${ styles['image'] } mb-1`} src={ingredient.image} alt={ingredient.name} />
      <p className={`text text_type_digits-default mb-1 ${ styles['price'] }`}> {ingredient.price} <CurrencyIcon type="primary" /></p>
      <p className={`text text_type_main-default ${ styles['name'] }`}> {ingredient.name} </p>
    </li>
  )
}

IngredientItem.propTypes = {
  ingredient: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired
}

export default IngredientItem;