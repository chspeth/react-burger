import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from '../../services/actions/productData';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app.module.css';

function App() {
  const dispatch = useDispatch();
  const { productData, isLoading, hasError } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch])

  return (
    <div>
      <AppHeader />
      <main>
        <h1 className={ styles['visually-hidden'] }>Бургерная «Stellar Burgers»</h1>
        {!isLoading && productData && !hasError && (
          <div className={ styles['wrapper'] }>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
          )
        }
      </main>
      <Modal />
    </div>
  );
}

export default App;
