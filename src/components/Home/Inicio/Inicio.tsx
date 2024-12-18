import React, { useEffect } from 'react';
import HelloTitle from '../HelloTitle/HelloTitle';
import MyBalances from '../MyBalances/MyBalances';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import styles from './Inicio.module.css';
import { useAppContext } from '../../../context/AppContext';

const Inicio = () => {
  const { user, transactions, balances, logout } = useAppContext();
  const username = user?.attributes?.first_name || 'Invitado';

  return (
    <div className={styles.userInfoContainer}>
      <HelloTitle userName={username} />
      {transactions.length > 0 && balances != undefined ? (
        <>
          <MyBalances balances={balances} />
          <TransactionHistory transactions={transactions} />
        </>
      ) : (
        <span className={styles.credentialsExpired}>
          Sus credenciales han vencido! Por favor vuelva a{' '}
          <button onClick={logout}>Iniciar sesion</button>
        </span>
      )}
    </div>
  );
};

export default Inicio;
