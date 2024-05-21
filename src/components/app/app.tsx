import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app.module.css';

function App() {
  return (
    <div>
      <AppHeader />
      <main>
        <h1 className={ styles['visually-hidden'] }>Бургерная «Stellar Burgers»</h1>
        <div className={ styles['wrapper'] }>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </main>
    </div>
  );
}

export default App;
