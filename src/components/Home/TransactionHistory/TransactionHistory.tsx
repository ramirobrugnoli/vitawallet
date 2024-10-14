import React from 'react';
import styles from './TransactionHistory.module.css';
import TransactionRow from './TransactionRow';

interface Transaction {
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
}

interface TransactionHistoryTableProps {
  transactions: Transaction[];
}

const TransactionHistory = ({ transactions }: TransactionHistoryTableProps): JSX.Element => {
  return (
    <div className={styles.tableContainer}>
      <span>Historial</span>
      <table className={styles.transactionTable}>
        <tbody>
          {transactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
