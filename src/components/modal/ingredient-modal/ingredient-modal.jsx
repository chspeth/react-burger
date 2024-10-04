import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from '../modal.module.css';
import PropTypes from 'prop-types';

const IngredientModal = ({ children }) => {
  const navigate = useNavigate();
  const modalRoot = document.getElementById('modal-root');

  const handleClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    const handleKeyPress = e => {
      if (e.key === 'Escape') handleClose();
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleClose]);

  return createPortal(
    <>
      <ModalOverlay onClose={handleClose} />
      <div className={styles['modal']}>
        <button className={styles['close-btn']} onClick={handleClose}>
          <CloseIcon type='primary' />
        </button>
        <div className={styles['modal-content']}> {children} </div>
      </div>
    </>,
    modalRoot
  );
};

IngredientModal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IngredientModal;
