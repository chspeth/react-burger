import { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app.module.css';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  // const [modalState, modalDispatch] = useReducer(modalReducer, modalInitialState, undefined);

  useEffect(() => {
    const getProductData = async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error('Network response err')
        }
        const data = await res.json();
        setProductData(data.data);
      } catch (error) {
        setHasError(true);
        console.error('Error:', error)
      } finally {
        setIsLoading(false);
      }
    }

    getProductData();
  }, [])

  return (
    <div>
      <AppHeader />
      <main>
        <h1 className={ styles['visually-hidden'] }>Бургерная «Stellar Burgers»</h1>
        {!isLoading && productData && !hasError && (
          <div className={ styles['wrapper'] }>
            <BurgerIngredients productData={productData} />
            <BurgerConstructor productData={productData} />
          </div>
          )
        }
      </main>
      <Modal />
    </div>
  );
}

export default App;
