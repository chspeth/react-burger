import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import CustomScrollbar from '../scrollbar/scrollbar';
import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
  return (
    <section className={ styles['constructor-section'] }>
      <div className={ styles['flex-container'] }>
        <div className={`${ styles['element-container'] } ${ styles['bun-element'] }`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={20}
          />
        </div>
        <CustomScrollbar customStyles={{ wrapperHeight: '464px', thumbHeight: '62,9%', top: '0', bottom: '0' }}>
          <div className={ `${ styles['flex-container'] } ${ styles['inner-container'] }` }>
            <div className={ styles['element-container'] }>
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text="Соус традиционный галактический"
                price={30}
              />
            </div>
            <div className={ styles['element-container'] }>
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text="Соус традиционный галактический"
                price={30}
              />
            </div>
            <div className={ styles['element-container'] }>
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text="Соус традиционный галактический"
                price={30}
              />
            </div>
            <div className={ styles['element-container'] }>
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text="Соус традиционный галактический"
                price={30}
              />
            </div>
            <div className={ styles['element-container'] }>
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text="Соус традиционный галактический"
                price={30}
              />
            </div>
            <div className={ styles['element-container'] }>
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text="Соус традиционный галактический"
                price={30}
              />
            </div>
            <div className={ styles['element-container'] }>
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text="Соус традиционный галактический"
                price={30}
              />
            </div>
          </div>
        </CustomScrollbar>
        <div className={`${ styles['element-container'] } ${ styles['bun-element'] }`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={20}
          />
        </div>
      </div>
      <div className={ styles['total'] }>
        <p className={ styles['total-price'] }>
          <span className="text text_type_digits-medium">610</span> 
          <CurrencyIcon type="primary" width="36" height="36" />
        </p>
        <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;