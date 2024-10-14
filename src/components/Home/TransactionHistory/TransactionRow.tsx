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
      total_in_exchange_currency?: string;
      exchange_currency?: string;
    };
  };
}

const TransactionRow = ({ transaction }: TransactionRowProps) => {
  const { attributes } = transaction;
  const { amount, currency, category, total_in_exchange_currency, exchange_currency } = attributes;
  const isExchange = category === 'exchange';

  const formatCurrency = (value: number, curr: string) =>
    `$${value.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${curr.toUpperCase()}`;

  const getSign = (isPositive: boolean) => (isPositive ? '+' : '-');

  const getExchangeAmount = () => {
    if (total_in_exchange_currency) {
      return `${getSign(true)} ${formatCurrency(parseFloat(total_in_exchange_currency), exchange_currency || '')}`;
    }
    return `${getSign(false)} ${formatCurrency(parseFloat(amount), currency)}`;
  };

  const getNormalAmount = () => {
    const isPositive = ['deposit', 'received'].includes(category);
    return `${getSign(isPositive)} ${formatCurrency(Math.abs(parseFloat(amount)), currency)}`;
  };

  const formattedAmount = isExchange ? getExchangeAmount() : getNormalAmount();

  const getAmountClass = () => {
    if (isExchange) {
      return total_in_exchange_currency ? styles.positive : styles.negative;
    }
    return ['deposit', 'received'].includes(category) ? styles.positive : styles.negative;
  };

  return (
    <tr className={styles.transactionRow}>
      <td>{attributes.category_translate}</td>
      <td className={`${styles.amount} ${getAmountClass()}`}>{formattedAmount}</td>
    </tr>
  );
};

export default TransactionRow;
