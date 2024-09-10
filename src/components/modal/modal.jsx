// import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../services/actions/modal';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from './modal.module.css';

const Modal = () => {
  const { isModalOpen, modalContent, hasTitle } = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const modalRoot = document.getElementById('modal-root');

  const handleClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  useEffect(() => {
    const handleKeyPress = e => {
      if (e.key === 'Escape') handleClose();
    }

    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleClose])

  const handleOverlayClick = e => {
    if (e.target.classList.contains('overlay')) handleClose();
  }

  if (!isModalOpen) {
    return null;
  }

  return createPortal(
    <>
      {isModalOpen && (
        <>
        <ModalOverlay onClose={handleClose} />
        <div className={styles['modal']} onClick={handleOverlayClick}>
          {hasTitle && <h2 className='text text_type_main-large'>Детали ингредиента</h2>}
          <button className={styles['close-btn']} onClick={handleClose}>
            <CloseIcon type="primary" />
          </button>
          <div className={styles['modal-content']}> {modalContent} </div>
        </div>
        </>
      )}
    </>, 
    modalRoot
  )
}

export default Modal;