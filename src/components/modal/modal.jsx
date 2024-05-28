import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from './modal.module.css';

const Modal = ({ isOpen, onClose }) => {
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

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <>
      {isOpen && (
        <>
        <ModalOverlay onClose={onClose} />
        <div className={styles['modal']} onClick={handleOverlayClick}>
          {/* {<h2 className={styles['modal-header']}></h2>} */}
          <button className={styles['close-btn']} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
        </>
      )}
    </>, 
    modalRoot
  )
}

export default Modal;