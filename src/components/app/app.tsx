import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
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
        </div>
      </main>
    </div>
  );
}

export default App;
