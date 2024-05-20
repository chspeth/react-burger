import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';

const IngredientItem = ({ ingredient }) => {
  return (
    <li className={ styles['ingredient-item'] }>
      <img className={`${ styles['image'] } mb-1`} src={ingredient.image} alt={ingredient.name} />
      <p className={`text text_type_digits-default mb-1 ${ styles['price'] }`}> {ingredient.price} <CurrencyIcon /></p>
      <p className={`text text_type_main-default ${ styles['name'] }`}> {ingredient.name} </p>
    </li>
  )
}

export default IngredientItem;