import { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app.module.css';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

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
        console.log(data);
        setProductData(data.data);
        setIsLoading(false);
      } catch (error) {
        setHasError(true);
        setIsLoading(false);
        console.error('Error:', error)
      }
    }

    getProductData();
  }, [])

  return (
    <div>
      <AppHeader />
      <main>
        <h1 className={ styles['visually-hidden'] }>Бургерная «Stellar Burgers»</h1>
        {hasError && <p>Ошибка!</p>}
        {!isLoading && productData && !hasError && (
          <div className={ styles['wrapper'] }>
            <BurgerIngredients productData={productData} />
            <BurgerConstructor productData={productData} />
          </div>
          )
        }
      </main>
    </div>
  );
}

export default App;
