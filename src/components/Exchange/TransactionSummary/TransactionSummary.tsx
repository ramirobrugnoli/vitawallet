import React, { useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import styles from './TransactionSummary.module.css';
import { GoBackArrow } from '../../VisibilityIcons';
import TransactionModal from './TransactionModal';

interface TransactionSummaryProps {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: string;
  toAmount: string;
  onBack: () => void;
}

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
  const [loadingTransaction, setLoadingTransaction] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoadingTransaction(true);
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
          ? `Error en el intercambio: ${error.message}`
          : 'Ocurrió un error desconocido durante el intercambio.',
      );
    } finally {
      setShowModal(true);
      setLoadingTransaction(false);
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
          {!loadingTransaction ? 'Intercambiar' : <div className="loadingSpinnerButton"></div>}
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
