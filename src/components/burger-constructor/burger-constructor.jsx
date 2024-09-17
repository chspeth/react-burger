import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../services/actions/modal';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import CustomScrollbar from '../scrollbar/scrollbar';
import OrderDetails from '../modal/order-details/order-details';
import styles from './burger-constructor.module.css';
import { useDrop } from 'react-dnd';
import { addUserItem, deleteItem, moveItem } from '../../services/actions/constructorDnd';
import { orderDetails } from '../../services/actions/orderDetails';
import ConstructorIngredient from './constructor-ingredient/constructor-ingredient';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { bun, fillings } = useSelector((state) => state.constructorItems);
  
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      dispatch(addUserItem(item));
    }
  });

  const moveIngredient = (dragIndex, hoverIndex) => {
    dispatch(moveItem(dragIndex, hoverIndex));
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  const handleOrderClick = () => {
    const ingredients = [bun?._id, ...fillings.map(item => item._id)];
    dispatch(orderDetails(ingredients));
    dispatch(openModal(<OrderDetails />, false));
  };

  const itemHeight = 80; 
  const maxVisibleItems = 5;
  const fillingsCount = fillings ? fillings.length : 0;
  const containerHeight = fillingsCount <= maxVisibleItems  
    ? `${fillingsCount * itemHeight + ((fillingsCount - 1) * 16)}px`
    : `${maxVisibleItems * itemHeight + (16 * 4)}px`;
  
  const totalPrice = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    return bunPrice + fillings.reduce((acc, curr) => acc + curr.price, 0);
  }, [bun, fillings]);
  
  return (
    <section className={ styles['constructor-section'] }>
      <div className={styles['flex-wrapper']} ref={dropTarget}>
        <div className={`${ styles['element-container'] } ${ styles['bun-element'] }`}>
          {!bun && (
            <div className={`${ styles['empty-element'] } ${ styles['top'] }`}>
              <span className="text text_type_main-medium">Выберите булку</span>
            </div>
          )}
          {bun && (
            <ConstructorElement
              type='top'
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
              />
          )}
        </div>
        {fillings.length === 0 && (
          <div className={`${ styles['empty-element'] } ${ styles['middle'] }`}>
            <span className="text text_type_main-medium">Выберите ингредиенты</span>
          </div>
        )}
        {fillings.length > 0 && (<div className={styles['fillings-container']}>
          <CustomScrollbar
            customStyles={{
              wrapperHeight: containerHeight,
              top: '0',
              bottom: '0'
            }}>
            <div className={ `${ styles['flex-container'] } ${ styles['inner-container'] }` }>
              {fillings.map((element, index) => (
                <ConstructorIngredient
                  key={element.id}
                  index={index}
                  element={element}
                  moveIngredient={moveIngredient}
                  handleDeleteItem={handleDeleteItem}
                />
              ))}
            </div>
          </CustomScrollbar>
        </div>)}
        <div className={`${ styles['element-container'] } ${ styles['bun-element'] }`}>
          {!bun && (
            <div className={`${ styles['empty-element'] } ${ styles['bottom'] }`}>
              <span className="text text_type_main-medium">Выберите булку</span>
            </div>
          )}
          {bun && (
            <ConstructorElement
              type='bottom'
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
        </div>
      </div>
      <div className={ styles['total'] }>
        <p className={ styles['total-price'] }>
          <span className="text text_type_digits-medium">{totalPrice}</span> 
          <CurrencyIcon type="primary" />
        </p>
        <Button htmlType="button" type="primary" size="large" onClick={handleOrderClick}>Оформить заказ</Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;