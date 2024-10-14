import React, { useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import styles from './TransactionSummary.module.css';
import { GoBackArrow } from '../../VisibilityIcons';

interface TransactionSummaryProps {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: string;
  toAmount: string;
  onBack: () => void;
}

interface SuccessModalProps {
  onClose: () => void;
}

const SuccessModal = ({ onClose }: SuccessModalProps) => (
  <div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      <button className={styles.closeButton} onClick={onClose}>
        ×
      </button>
      <img src="/path/to/success-image.png" alt="Intercambio exitoso" />
      <h3>¡Intercambio exitoso!</h3>
      <p>Ya cuentas con los BTC en tu saldo.</p>
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleConfirm = async () => {
    try {
      await executeExchange({
        currency_sent: fromCurrency,
        currency_received: toCurrency,
        amount_sent: parseFloat(fromAmount),
      });
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error executing exchange:', error);
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
      {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}
    </div>
  );
};

export default TransactionSummary;
