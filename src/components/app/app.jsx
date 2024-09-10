import { useState, useEffect } from 'react';
import { ModalContext } from '../../services/appContext';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app.module.css';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
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
    const getProductData = async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error('Network response err')
        }
        const data = await res.json();
        setProductData(data.data);
      } catch (error) {
        setHasError(true);
        console.error('Error:', error)
      } finally {
        setIsLoading(false);
      }
    }

    getProductData();
  }, [])

  return (
    <div>
      <ModalContext.Provider value={{ openModal, closeModal }}>
        <AppHeader />
        <main>
          <h1 className={ styles['visually-hidden'] }>Бургерная «Stellar Burgers»</h1>
          {!isLoading && productData && !hasError && (
            <div className={ styles['wrapper'] }>
              <BurgerIngredients productData={productData} />
              <BurgerConstructor productData={productData} />
            </div>
            )
          }
        </main>
        <Modal isModalOpen={isModalOpen} hasTitle={hasTitle}>
          {modalContent}
        </Modal>
      </ModalContext.Provider>
    </div>
  );
}

export default App;
