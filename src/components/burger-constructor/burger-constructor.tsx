import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import CustomScrollbar from '../scrollbar/scrollbar';
import productData from '../../product-data/product-data';
import { filterProducts } from '../../product-data/util';
import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
  const buns = filterProducts(productData, 'bun');
  const sauces = filterProducts(productData, 'sauce');
  const main = filterProducts(productData, 'main');
  
  return (
    <section className={ styles['constructor-section'] }>
      <div className={`${ styles['flex-container'] } ${ styles['flex-wrapper'] }`}>
        <div className={`${ styles['element-container'] } ${ styles['bun-element'] }`}>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={`${buns[0].name} (верх)`}
            price={buns[0].price}
            thumbnail={buns[0].image}
          />
        </div>
        <CustomScrollbar customStyles={{ wrapperHeight: '100%', wrapperMaxHeight: '464px', thumbHeight: '62,9%', top: '0', bottom: '0' }}>
          <div className={ `${ styles['flex-container'] } ${ styles['inner-container'] }` }>
            {[sauces[0], ...main].map(element => (
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
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={`${buns[0].name} (низ)`}
            price={buns[0].price}
            thumbnail={buns[0].image}
          />
        </div>
      </div>
      <div className={ styles['total'] }>
        <p className={ styles['total-price'] }>
          <span className="text text_type_digits-medium">610</span> 
          <CurrencyIcon type="primary" />
        </p>
        <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;