import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../services/actions/modal';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import CustomScrollbar from '../scrollbar/scrollbar';
import { filterProducts } from '../../utils/util';
import OrderDetails from '../modal/order-details/order-details';
import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.products.productData);

  const buns = filterProducts(productData, 'bun');
  const sauces = filterProducts(productData, 'sauce');
  const main = filterProducts(productData, 'main');

  const handleOrderClick = () => {
    dispatch(openModal(<OrderDetails />, false));
  };
  
  return (
    <section className={ styles['constructor-section'] }>
      <div className={`${ styles['flex-container'] } ${ styles['flex-wrapper'] }`}>
        <div className={`${ styles['element-container'] } ${ styles['bun-element'] }`}>
          {buns[0] && (
          <ConstructorElement
            type='top'
            isLocked={true}
            text={`${buns[0].name} (верх)`}
            price={buns[0].price}
            thumbnail={buns[0].image}
          />
          )}
        </div>
        <CustomScrollbar customStyles={{ wrapperHeight: '100%', wrapperMaxHeight: '464px', thumbHeight: '62,9%', top: '0', bottom: '0' }}>
          <div className={ `${ styles['flex-container'] } ${ styles['inner-container'] }` }>
            {sauces && sauces.length > 0 && main && [sauces[0], ...main].map(element => (
              <div className={ styles['element-container'] } key={element._id}>
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text={element.name}
                price={element.price}
                thumbnail={element.image}
              />
            </div>
            ))}
          </div>
        </CustomScrollbar>
        <div className={`${ styles['element-container'] } ${ styles['bun-element'] }`}>
          {buns[0] && (
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={`${buns[0].name} (низ)`}
            price={buns[0].price}
            thumbnail={buns[0].image}
          />)}
        </div>
      </div>
      <div className={ styles['total'] }>
        <p className={ styles['total-price'] }>
          <span className="text text_type_digits-medium">610</span> 
          <CurrencyIcon type="primary" />
        </p>
        <Button htmlType="button" type="primary" size="large" onClick={handleOrderClick}>Оформить заказ</Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;