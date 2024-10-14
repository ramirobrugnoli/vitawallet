import React from 'react';
import styles from './TransactionRow.module.css';

interface TransactionRowProps {
  transaction: {
    id: string;
    type: string;
    attributes: {
      amount: string;
      created_at: string;
      currency: string;
      description: string;
      category: string;
      category_translate: string;
      status: string;
    };
  };
}

const TransactionRow = ({ transaction }: TransactionRowProps): JSX.Element => {
  const { attributes } = transaction;
  const amount = parseFloat(attributes.amount);
  const isPositive = ['deposit', 'received'].includes(attributes.category);
  const isExchange = attributes.category === 'exchange';

  const getAmountClass = () => {
    if (isExchange) return styles.neutral;
    return isPositive ? styles.positive : styles.negative;
  };

  const formattedAmount = `${isPositive ? '+' : isExchange ? '' : '-'} $${Math.abs(amount).toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${attributes.currency.toUpperCase()}`;

  return (
    <tr className={styles.transactionRow}>
      <td>{attributes.category_translate}</td>
      <td className={`${styles.amount} ${getAmountClass()}`}>{formattedAmount}</td>
    </tr>
  );
};

export default TransactionRow;
