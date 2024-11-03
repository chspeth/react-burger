import { FC } from 'react';
import { useAppSelector } from '../utils/types';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import '@ya.praktikum/react-developer-burger-ui-components';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import styles from './home.module.css';

const HomePage: FC = () => {
  const { productData, isLoading, hasError } = useAppSelector(state => state.products);

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