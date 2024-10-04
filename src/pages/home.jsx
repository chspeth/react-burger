import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from '../services/actions/productData';
import AppHeader from '../components/app-header/app-header';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import Modal from '../components/modal/modal';
import '@ya.praktikum/react-developer-burger-ui-components';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import styles from './home.module.css';

function HomePage() {
  const dispatch = useDispatch();
  const { productData, isLoading, hasError } = useSelector((state) => state.products);
  const { isModalOpen } = useSelector(state => state.modal);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch])

  return (
    <>
      <AppHeader />
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
      {isModalOpen && <Modal />}
    </>
  );
}

export default HomePage;