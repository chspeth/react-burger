import PropTypes from 'prop-types';
import IngredientsTabs from './ingredients-tabs/ingredients-tabs';
import IngredientsList from './ingredients-list/ingredients-list';
import CustomScrollbar from '../scrollbar/scrollbar';
import { filterProducts } from '../../product-data/util';
import { productsCategories } from '../../product-data/util';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = ({ productData }) => {
  return (
    <section className={ styles['ingredients-section'] }>
      <h2 className={'text text_type_main-large mb-5'}>Соберите бургер</h2>
      <IngredientsTabs />
      <CustomScrollbar  customStyles={{ wrapperHeight: '756px', thumbHeight: '76%', top: '40px', bottom: '50px' }}>
        <div className={ styles['ingredients-lists'] }>
          {productsCategories.map(category => (
            <div className={ styles['group'] } key={category.type}>
              <h3 className={`text text_type_main-medium ${ styles['group-header'] }`}> {category.title} </h3>
              <IngredientsList ingredients={filterProducts(productData, category.type)} />
            </div>
          ))}
        </div>
      </CustomScrollbar>
    </section>
  )
}

BurgerIngredients.propTypes = {
  productData: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  )
}

export default BurgerIngredients;