import { FC } from 'react';
import styles from './modal-overlay.module.css';
import { IModalOverlayProps } from '../../../utils/types';

const ModalOverlay: FC<IModalOverlayProps> = ({ onClose }) => <div className={styles['overlay']} onClick={onClose}></div>;

export default ModalOverlay;