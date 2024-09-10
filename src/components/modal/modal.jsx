import PropTypes from 'prop-types';
import { useEffect, useContext } from 'react';
import { ModalContext } from '../../services/appContext';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from './modal.module.css';

const Modal = ({ isModalOpen, hasTitle, children }) => {
  const { closeModal } = useContext(ModalContext);
  const modalRoot = document.getElementById('modal-root');

  useEffect(() => {
    const handleKeyPress = e => {
      if (e.key === 'Escape') closeModal();
    }

    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [closeModal])

  const handleOverlayClick = e => {
    if (e.target.classList.contains('overlay')) closeModal();
  }

  if (!isModalOpen) {
    return null;
  }

  return createPortal(
    <>
      {isModalOpen && (
        <>
        <ModalOverlay onClose={closeModal} />
        <div className={styles['modal']} onClick={handleOverlayClick}>
          {hasTitle && <h2 className='text text_type_main-large'>Детали ингредиента</h2>}
          <button className={styles['close-btn']} onClick={closeModal}>
            <CloseIcon type="primary" />
          </button>
          <div className={styles['modal-content']}> {children} </div>
        </div>
        </>
      )}
    </>, 
    modalRoot
  )
}

Modal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired, 
  hasTitle: PropTypes.bool.isRequired, 
  children: PropTypes.node
}

export default Modal;