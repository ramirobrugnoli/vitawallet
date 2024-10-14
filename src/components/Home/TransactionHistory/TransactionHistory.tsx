import React from 'react';
import styles from './TransactionHistory.module.css';
import { Transaction } from '../../../context/AppContext';
import TransactionRow from './TransactionRow';

interface TransactionHistoryTableProps {
  transactions: Transaction[];
}

const TransactionHistory = ({ transactions }: TransactionHistoryTableProps) => {
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
