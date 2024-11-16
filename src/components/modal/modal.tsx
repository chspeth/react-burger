import { useEffect, useCallback, FC } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { IModalProps } from '../../utils/types';

const Modal: FC<IModalProps> = ({ title, children, onClose }) => {
  const modalRoot = document.getElementById('modal-root');

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    } 
  }, [onClose]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    }

    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleClose])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('overlay')) handleClose();
  }

  if (!modalRoot) return null;

  return createPortal(
    <>
      <ModalOverlay onClose={handleClose} />
      <div 
        className={styles['modal']} 
        onClick={handleOverlayClick}
        data-test='modal'
      >
        {title && <h2 className='text text_type_main-large'>{ title }</h2>}
        <button 
          className={styles['close-btn']} 
          onClick={handleClose}
          data-test='modal-close'
        >
          <CloseIcon type='primary' />
        </button>
        <div className={styles['modal-content']}> { children } </div>
      </div>
    </>, 
    modalRoot
  )
}

export default Modal;