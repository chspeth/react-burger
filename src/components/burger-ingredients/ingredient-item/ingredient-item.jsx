import { useDispatch } from 'react-redux';
import { ingredientType } from '../../../utils/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../../modal/ingredient-details/ingredient-details';
import { openModal } from '../../../services/actions/modal';
import { setModalContent } from '../../../services/actions/modal-content';
import styles from './ingredient-item.module.css';

const IngredientItem = ({ ingredient }) => {
  const dispatch = useDispatch();

  const handleOpenModal = (content, hasTitle) => {
    dispatch(openModal(hasTitle));
    dispatch(setModalContent(content));
  }

  const handleIngredientClick = () => {
    handleOpenModal(<IngredientDetails ingredient={ingredient} />, true);
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