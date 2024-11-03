import { FC } from 'react';
import { useAppSelector } from '../utils/types';
import IngredientDetails from '../components/modal/ingredient-details/ingredient-details';
import styles from './pages.module.css';

const IngredientDetailsPage: FC = () => {
  const { isLoading, hasError } = useAppSelector(state => state.products);
  
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
