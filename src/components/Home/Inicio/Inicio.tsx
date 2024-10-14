import React from 'react';
import HelloTitle from '../HelloTitle/HelloTitle';
import MyBalances from '../MyBalances/MyBalances';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import styles from './Inicio.module.css';
import { useAppContext } from '../../../context/AppContext';

const Inicio = () => {
  const { user, transactions } = useAppContext();
  console.log('transactions en inicio', transactions);
  const username = user?.attributes?.first_name || 'Invitado';
  const balances = user?.attributes?.balances || {};

  return (
    <div className={styles.userInfoContainer}>
      <HelloTitle userName={username} />
      <MyBalances balances={balances} />
      <TransactionHistory transactions={transactions} />
    </div>
  );
};

export default Inicio;
