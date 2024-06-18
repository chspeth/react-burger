import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay';
import { closeModal } from '../../services/actions/modal';
import { clearModalContent } from '../../services/actions/modal-content';
import styles from './modal.module.css';

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const { isModalOpen, hasTitle } = useSelector((state) => state.modal);

  const modalRoot = document.getElementById('modal-root');

  const handleCloseModal = () => {
    dispatch(closeModal());
    dispatch(clearModalContent());
  }

  useEffect(() => {
    const handleKeyPress = e => {
      if (e.key === 'Escape') handleCloseModal();
    }

    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keydown', handleKeyPress);
  })
  

  const handleOverlayClick = e => {
    if (e.target.classList.contains('overlay')) handleCloseModal();
  }

  if (!isModalOpen) {
    return null;
  }
  

  return createPortal(
    <>
      {isModalOpen && (
        <>
        <ModalOverlay onClose={handleCloseModal} />
        <div className={styles['modal']} onClick={handleOverlayClick}>
          {hasTitle && <h2 className='text text_type_main-large'>Детали ингредиента</h2>}
          <button className={styles['close-btn']} onClick={handleCloseModal}>
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
  children: PropTypes.node
}

export default Modal;