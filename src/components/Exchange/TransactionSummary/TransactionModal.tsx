import React from 'react';
import styles from './TransactionSummary.module.css';
import transactionConfirm from '../../../assets/Exchanges/transactionConfirm.png';
import transactionError from '../../../assets/Exchanges/transactionError.png';

interface TransactionModalProps {
  onClose: () => void;
  currency: string;
  success: boolean;
  message: string;
}

const TransactionModal = ({ onClose, success, message }: TransactionModalProps) => (
  <div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      <button className={styles.closeButton} onClick={onClose}>
        ×
      </button>
      <img
        className={styles.modalImage}
        src={success ? transactionConfirm : transactionError}
        alt={success ? 'Intercambio exitoso' : 'Error en el intercambio'}
      />
      <h3>{success ? '¡Intercambio exitoso!' : 'Error en el intercambio'}</h3>
      <p>{message}</p>
    </div>
  </div>
);

export default TransactionModal;
