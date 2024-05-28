import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import CustomScrollbar from '../scrollbar/scrollbar';
import { filterProducts } from '../../product-data/util';
import OrderDetails from '../modal/order-details/order-details';
import styles from './burger-constructor.module.css';

const BurgerConstructor = ({ productData, openModal }) => {
  const buns = filterProducts(productData, 'bun');
  const sauces = filterProducts(productData, 'sauce');
  const main = filterProducts(productData, 'main');

  const handleOrderClick = () => {
    openModal(<OrderDetails />, false);
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

BurgerConstructor.propTypes = {
  productData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number
    })
  ),
  openModal: PropTypes.func.isRequired
}

export default BurgerConstructor;