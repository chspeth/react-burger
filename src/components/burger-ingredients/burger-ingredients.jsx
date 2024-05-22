import IngredientsTabs from './ingredients-tabs/ingredients-tabs';
import IngredientsList from './ingredients-list/ingredients-list';
import CustomScrollbar from '../scrollbar/scrollbar';
import productData from '../../product-data/product-data';
import styles from './burger-ingredients.module.css';

const filterProducts = (products, type) => {
  return products.filter(product => product.type === type);
};

const productsCategories = [
  {type: 'bun', title: 'Булки'},
  {type: 'sauce', title: 'Соусы'},
  {type: 'main', title: 'Начинки'}
]

const BurgerIngredients = () => {
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

export default BurgerIngredients;