import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './ingredient-details.module.css';
import { IIndredientDetailsProps, IProductsState } from '../../../utils/types';

const IndredientDetails: FC<IIndredientDetailsProps> = ({ ingredient }) => {
  const { id } = useParams();
  const { productData } = useSelector((state: { products: IProductsState }) => state.products);

  const selectedIngredient = ingredient || productData.find((item) => item._id === id);

  if (!selectedIngredient) {
    return <p className='text text_type_main-small text_color_inactive mt-5'>Ингредиент не найден</p>;
  }

  return (
    <div className={styles['wrapper']}>
      <img className={styles['image']} src={selectedIngredient.image_large} alt={selectedIngredient.name} />
      <h3 className='text text_type_main-medium'> {selectedIngredient.name} </h3>
      <table className={styles['nutrition-facts']}>
        <thead>
          <tr className='text text_type_main-default text_color_inactive'>
            <th>Калории,ккал</th>
            <th>Белки, г</th>
            <th>Жиры, г</th>
            <th>Углеводы, г</th>
          </tr>
        </thead>
        <tbody>
          <tr className='text text_type_digits-default text_color_inactive'>
            <td>{selectedIngredient.calories}</td>
            <td>{selectedIngredient.proteins}</td>
            <td>{selectedIngredient.fat}</td>
            <td>{selectedIngredient.carbohydrates}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default IndredientDetails;