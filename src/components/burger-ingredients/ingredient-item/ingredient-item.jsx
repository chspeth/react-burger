// import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux'; 
import { openModal } from '../../../services/actions/modal';
import { ingredientType } from '../../../utils/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../../modal/ingredient-details/ingredient-details';
import styles from './ingredient-item.module.css';
import { useDrag } from 'react-dnd';

const IngredientItem = ({ ingredient }) => {
  const dispatch = useDispatch();
  
  const handleIngredientClick = () => {
    dispatch(openModal(<IngredientDetails ingredient={ingredient} />, true));
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <li 
      className={ styles['ingredient-item'] } 
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={handleIngredientClick} 
      ref={dragRef}>
      <img 
        className={`${ styles['image'] } mb-1`} 
        src={ingredient.image} 
        alt={ingredient.name} />
      <p className={`text text_type_digits-default mb-1 ${ styles['price'] }`}> 
        {ingredient.price} <CurrencyIcon type="primary" />
      </p>
      <p className={`text text_type_main-default ${ styles['name'] }`}> {ingredient.name} </p>
    </li>
  )
}

IngredientItem.propTypes = {
  ingredient: ingredientType.isRequired
}

export default IngredientItem;