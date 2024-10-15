import { FC } from 'react';
import { useSelector } from 'react-redux';
import IngredientDetails from '../components/modal/ingredient-details/ingredient-details';
import styles from './pages.module.css';

interface IIngredient {
  _id: string;
  name: string;
  type: 'bun' | 'sauce' | 'main';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

interface IProductsState {
  productData: IIngredient[];
  isLoading: boolean;
  hasError: boolean;
}

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
