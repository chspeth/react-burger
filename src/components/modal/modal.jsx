import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from './modal.module.css';

const Modal = ({ isModalOpen, onClose, hasTitle, children }) => {
  const modalRoot = document.getElementById('modal-root');

  useEffect(() => {
    const handleKeyPress = e => {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [onClose])

  const handleOverlayClick = e => {
    if (e.target.classList.contains('overlay')) onClose();
  }

  if (!isModalOpen) {
    return null;
  }

  return createPortal(
    <>
      {isModalOpen && (
        <>
        <ModalOverlay onClose={onClose} />
        <div className={styles['modal']} onClick={handleOverlayClick}>
          {hasTitle && <h2 className='text text_type_main-large'>Детали ингредиента</h2>}
          <button className={styles['close-btn']} onClick={onClose}>
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
  onClose: PropTypes.func.isRequired, 
  hasTitle: PropTypes.bool.isRequired, 
  children: PropTypes.node.isRequired
}

export default Modal;