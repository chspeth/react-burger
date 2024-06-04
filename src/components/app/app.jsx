import { useState, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../../services/actions/burger-ingredients';
import { configureStore } from '../../services/store';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app.module.css';

const store = configureStore();

function App() {
  const dispatch = useDispatch();
  const { ingredients, isLoading, hasError } = useSelector((state) => state.ingredients);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [hasTitle, setHasTitle] = useState(false);

  const openModal = (content, hasTitle) => {
    setModalContent(content);
    setHasTitle(hasTitle);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setHasTitle(false);
  }

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch])

  return (
    <>
      <AppHeader />
      <main>
        <h1 className={ styles['visually-hidden'] }>Бургерная «Stellar Burgers»</h1>
        {!isLoading && ingredients && !hasError && (
          <div className={ styles['wrapper'] }>
            <BurgerIngredients openModal={openModal} />
            <BurgerConstructor productData={ingredients} openModal={openModal} />
          </div>
          )
        }
      </main>
      <Modal isModalOpen={isModalOpen} onClose={closeModal} hasTitle={hasTitle}>
        {modalContent}
      </Modal>
    </>
  );
}

const AppWithProvider = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWithProvider;
