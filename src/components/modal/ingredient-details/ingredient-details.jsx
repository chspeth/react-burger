import PropTypes from 'prop-types';
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
  ingredient: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  }).isRequired
}

export default IndredientDetails;