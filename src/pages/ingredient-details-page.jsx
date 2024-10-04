import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../services/actions/productData';
import IngredientDetails from '../components/modal/ingredient-details/ingredient-details';
import AppHeader from '../components/app-header/app-header';
import styles from './pages.module.css';

function IngredientDetailsPage() {
  const dispatch = useDispatch();
  const { productData, isLoading, hasError } = useSelector((state) => state.products);

  useEffect(() => {
    if (!productData.length) {
      dispatch(getItems());
    }
  }, [dispatch, productData.length]);
  
  return (
    <>
      <AppHeader />
      <main className={ `${styles['center-container']} pt-25` }>
        <h1 className='text text_type_main-large'>Детали ингредиента</h1>
        {isLoading && <p className='text text_type_main-medium'>Загрузка...</p>}
        {hasError && <p className='text text_type_main-medium'>Ошибка загрузки данных</p>}
        <IngredientDetails />
      </main>
    </>
  );
}

export default IngredientDetailsPage;
