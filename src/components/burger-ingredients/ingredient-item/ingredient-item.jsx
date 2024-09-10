// import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ModalContext } from '../../../services/appContext'; 
import { ingredientType } from '../../../utils/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../../modal/ingredient-details/ingredient-details';
import styles from './ingredient-item.module.css';

const IngredientItem = ({ ingredient }) => {
  const { openModal } = useContext(ModalContext);
  const handleIngredientClick = () => {
    openModal(<IngredientDetails ingredient={ingredient} />, true);
  };

  return (
    <li className={ styles['ingredient-item'] } onClick={handleIngredientClick}>
      <img className={`${ styles['image'] } mb-1`} src={ingredient.image} alt={ingredient.name} />
      <p className={`text text_type_digits-default mb-1 ${ styles['price'] }`}> {ingredient.price} <CurrencyIcon type="primary" /></p>
      <p className={`text text_type_main-default ${ styles['name'] }`}> {ingredient.name} </p>
    </li>
  )
}

IngredientItem.propTypes = {
  ingredient: ingredientType.isRequired
}

export default IngredientItem;