import React, { useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import styles from './TransactionSummary.module.css';
import { GoBackArrow } from '../../VisibilityIcons';
import transactionConfirm from '../../../assets/Exchanges/transactionConfirm.png';
import transactionError from '../../../assets/Exchanges/transactionError.png';

interface TransactionSummaryProps {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: string;
  toAmount: string;
  onBack: () => void;
}

interface TransactionModalProps {
  onClose: () => void;
  currency: string;
  success: boolean;
  message: string;
}

const TransactionModal = ({ onClose, currency, success, message }: TransactionModalProps) => (
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

const TransactionSummary = ({
  fromCurrency,
  toCurrency,
  fromAmount,
  toAmount,
  onBack,
}: TransactionSummaryProps) => {
  const { executeExchange } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleConfirm = async () => {
    try {
      await executeExchange({
        currency_sent: fromCurrency,
        currency_received: toCurrency,
        amount_sent: parseFloat(fromAmount),
      });
      setTransactionSuccess(true);
      setModalMessage(`Ya cuentas con los ${toCurrency.toUpperCase()} en tu saldo.`);
    } catch (error) {
      setTransactionSuccess(false);
      setModalMessage(
        error instanceof Error
          ? error.message
          : 'Ocurrió un error desconocido durante el intercambio.',
      );
    } finally {
      setShowModal(true);
    }
  };

  return (
    <div className={styles.summaryContainer}>
      <div className={styles.titleContainer}>
        <button onClick={onBack} className={styles.goBackButton}>
          <GoBackArrow />
        </button>
        <h2>Resumen de transacción</h2>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.details}>
          <table className={styles.resumeTable}>
            <tbody>
              <tr>
                <td className={styles.tableInfo}>Monto a Intercambiar</td>
                <td className={styles.amount}>
                  {fromAmount} {fromCurrency.toUpperCase()}
                </td>
              </tr>
              <tr>
                <td className={styles.tableInfo}>Tasa de cambio:</td>
                <td className={styles.amount}>
                  1 {fromCurrency.toUpperCase()} ={' '}
                  {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(8)}{' '}
                  {toCurrency.toUpperCase()}
                </td>
              </tr>
              <tr>
                <td className={styles.tableInfo}>Monto a Recibir</td>
                <td className={styles.amountRecibe}>
                  {toAmount} {toCurrency.toUpperCase()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <button className={styles.backButton} onClick={onBack}>
          Atrás
        </button>
        <button className={styles.continueButton} onClick={handleConfirm}>
          Intercambiar
        </button>
      </div>
      {showModal && (
        <TransactionModal
          currency={toCurrency}
          onClose={() => {
            setShowModal(false);
            if (transactionSuccess) onBack();
          }}
          success={transactionSuccess}
          message={modalMessage}
        />
      )}
    </div>
  );
};

export default TransactionSummary;
