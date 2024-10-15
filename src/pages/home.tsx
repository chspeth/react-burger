import { FC } from 'react';
import { useSelector } from 'react-redux';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import '@ya.praktikum/react-developer-burger-ui-components';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import styles from './home.module.css';
import { IProductsState } from '../utils/types';

const HomePage: FC = () => {
  const { productData, isLoading, hasError } = useSelector((state: { products: IProductsState }) => state.products);

  return (
    <>
      <main>
        <h1 className={'visually-hidden'}>Бургерная «Stellar Burgers»</h1>
        {!isLoading && productData && !hasError && (
          <div className={ styles['wrapper'] }>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </div>
          )
        }
      </main>
    </>
  );
}

export default HomePage;