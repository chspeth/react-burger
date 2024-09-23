// import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { openModal } from '../../../services/actions/modal';
import { ingredientType } from '../../../utils/types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../../modal/ingredient-details/ingredient-details';
import styles from './ingredient-item.module.css';
import { useDrag } from 'react-dnd';

const IngredientItem = ({ ingredient }) => {
  const dispatch = useDispatch();
  const { bun, fillings } = useSelector(store => store.constructorItems);

  const ingredientsCounter = useMemo(() => {
    if (ingredient.type === 'bun') {
      return bun && bun._id === ingredient._id ? 2 : null;
    } else {
      return fillings.filter((item) => item._id === ingredient._id).length || null;
    }
  }, [ingredient.type, ingredient._id, bun, fillings]);
  
  const handleIngredientClick = () => {
    dispatch(openModal(<IngredientDetails ingredient={ingredient} />, 'Детали ингредиента'));
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
      {ingredientsCounter && <Counter count={ingredientsCounter} size="default" />}
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