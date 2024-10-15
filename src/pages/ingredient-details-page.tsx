import { FC } from 'react';
import { useSelector } from 'react-redux';
import IngredientDetails from '../components/modal/ingredient-details/ingredient-details';
import styles from './pages.module.css';
import { IProductsState } from '../utils/types';

const IngredientDetailsPage: FC = () => {
  const { isLoading, hasError } = useSelector((state: { products: IProductsState }) => state.products);
  
  return (
    <>
      <main className={ `${styles['center-container']} pt-25` }>
        {isLoading && <p className='text text_type_main-medium'>Загрузка...</p>}
        {hasError && <p className='text text_type_main-medium'>Ошибка загрузки данных</p>}
        <IngredientDetails />
      </main>
    </>
  );
}

export default IngredientDetailsPage;
