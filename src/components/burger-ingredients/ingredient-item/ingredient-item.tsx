import { FC } from 'react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';
import { useDrag } from 'react-dnd';

interface IIngredient {
  _id: string;
  name: string;
  type: 'bun' | 'sauce' | 'main';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

interface IIngredientItemProps {
  ingredient: IIngredient
}

interface IConstructorItemsState {
  bun: IIngredient | null;
  fillings: IIngredient[];
}

const IngredientItem: FC<IIngredientItemProps> = ({ ingredient }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bun, fillings } = useSelector((state: { constructorItems: IConstructorItemsState }) => state.constructorItems);

  const ingredientsCounter = useMemo(() => {
    if (ingredient.type === 'bun') {
      return bun && bun._id === ingredient._id ? 2 : null;
    } else {
      return fillings.filter((item) => item._id === ingredient._id).length || null;
    }
  }, [ingredient.type, ingredient._id, bun, fillings]);
  
  const handleIngredientClick = () => {
    navigate(`/ingredients/${ingredient._id}`, { state: { backgroundLocation: location } });
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
      {ingredientsCounter && <Counter count={ingredientsCounter} size='default' />}
      <img 
        className={`${ styles['image'] } mb-1`} 
        src={ingredient.image} 
        alt={ingredient.name} />
      <p className={`text text_type_digits-default mb-1 ${ styles['price'] }`}> 
        {ingredient.price} <CurrencyIcon type='primary' />
      </p>
      <p className={`text text_type_main-default ${ styles['name'] }`}> {ingredient.name} </p>
    </li>
  )
}

export default IngredientItem;