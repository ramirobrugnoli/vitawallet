import React from 'react';
import { useAppContext } from '../../../context/AppContext';
import styles from './TransactionSummary.module.css';

interface TransactionSummaryProps {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: string;
  toAmount: string;
  onConfirm: () => void;
  onBack: () => void;
}

const TransactionSummary = ({
  fromCurrency,
  toCurrency,
  fromAmount,
  toAmount,
  onConfirm,
  onBack,
}: TransactionSummaryProps) => {
  const { executeExchange } = useAppContext();

  const handleConfirm = async () => {
    try {
      await executeExchange({
        currency_sent: fromCurrency,
        currency_received: toCurrency,
        amount_sent: parseFloat(fromAmount),
      });
      onConfirm();
    } catch (error) {
      console.error('Error executing exchange:', error);
    }
  };

  return (
    <div className={styles.summaryContainer}>
      <h2>Resumen de transacción</h2>
      <div className={styles.details}>
        <p>
          Monto a intercambiar: {fromAmount} {fromCurrency.toUpperCase()}
        </p>
        <p>
          Monto a recibir: {toAmount} {toCurrency.toUpperCase()}
        </p>
        <p>
          Tasa de cambio: 1 {fromCurrency.toUpperCase()} ={' '}
          {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(8)} {toCurrency.toUpperCase()}
        </p>
      </div>
      <div className={styles.buttonGroup}>
        <button className={styles.backButton} onClick={onBack}>
          Atrás
        </button>
        <button className={styles.confirmButton} onClick={handleConfirm}>
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default TransactionSummary;
