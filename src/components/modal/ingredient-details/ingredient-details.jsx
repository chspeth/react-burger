import { ingredientType } from '../../../utils/types';
import styles from './ingredient-details.module.css';

const IndredientDetails = ({ ingredient }) => {
  return (
    <div className={styles['wrapper']}>
      <img className={styles['image']} src={ingredient.image_large} alt={ingredient.name} />
      <h3 className='text text_type_main-medium'> {ingredient.name} </h3>
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
            <td>{ingredient.calories}</td>
            <td>{ingredient.proteins}</td>
            <td>{ingredient.fat}</td>
            <td>{ingredient.carbohydrates}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

IndredientDetails.propTypes = {
  ingredient: ingredientType.isRequired
}

export default IndredientDetails;