import IngredientsTabs from './ingredients-tabs/ingredients-tabs';
import IngredientsList from './ingredients-list/ingredients-list';
import CustomScrollbar from '../scrollbar/scrollbar';
import buns from '../../product-data/buns';
import sauces from '../../product-data/sauces';
import fillings from '../../product-data/fillings';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
  return (
    <section className={ styles['ingredients-section'] }>
      <h2 className={'text text_type_main-large mb-5'}>Соберите бургер</h2>
      <IngredientsTabs />
      <CustomScrollbar  customStyles={{ wrapperHeight: '756px', thumbHeight: '76%', top: '40px', bottom: '50px' }}>
        <div className={ styles['ingredients-lists'] }>
          <div className={ styles['group'] }>
            <h3 className={`text text_type_main-medium ${ styles['group-header'] }`}>Булки</h3>
            <IngredientsList ingredients={buns} />
          </div>
          <div className={ styles['group'] }>
            <h3 className={`text text_type_main-medium ${ styles['group-header'] }`}>Соусы</h3>
            <IngredientsList ingredients={sauces} />
          </div>
          <div className={ styles['group'] }>
            <h3 className={`text text_type_main-medium ${ styles['group-header'] }`}>Начинки</h3>
            <IngredientsList ingredients={fillings} />
          </div>
        </div>
      </CustomScrollbar>
    </section>
  )
}

export default BurgerIngredients;