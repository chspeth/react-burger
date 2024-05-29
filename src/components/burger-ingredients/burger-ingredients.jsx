import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';
import IngredientsTabs from './ingredients-tabs/ingredients-tabs';
import IngredientsList from './ingredients-list/ingredients-list';
import CustomScrollbar from '../scrollbar/scrollbar';
import { filterProducts } from '../../utils/util';
import { productsCategories } from '../../utils/util';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = ({ productData, openModal }) => {
  return (
    <section className={ styles['ingredients-section'] }>
      <h2 className={'text text_type_main-large mb-5'}>Соберите бургер</h2>
      <IngredientsTabs />
      <CustomScrollbar  customStyles={{ wrapperHeight: '756px', thumbHeight: '76%', top: '40px', bottom: '50px' }}>
        <div className={ styles['ingredients-lists'] }>
          {productsCategories.map(category => (
            <div className={ styles['group'] } key={category.type}>
              <h3 className={`text text_type_main-medium ${ styles['group-header'] }`}> {category.title} </h3>
              <IngredientsList ingredients={filterProducts(productData, category.type)} openModal={openModal} />
            </div>
          ))}
        </div>
      </CustomScrollbar>
    </section>
  )
}

BurgerIngredients.propTypes = {
  productData: PropTypes.arrayOf(ingredientType),
  openModal: PropTypes.func.isRequired
}

export default BurgerIngredients;