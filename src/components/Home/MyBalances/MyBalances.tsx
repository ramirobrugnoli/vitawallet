import React from 'react';
import { Balances } from '../../../context/AppContext';
import UnitBalance from './UnitBalance';
import styles from './MyBalances.module.css';

type MyBalancesProps = {
  balances: Balances;
};

const MyBalances = ({ balances }: MyBalancesProps) => {
  console.log('balances en myBalances:', balances);

  const formatBalance = (currency: string, amount: number): string => {
    if (currency === 'btc') {
      return amount.toFixed(3);
    } else {
      return `$ ${amount.toLocaleString('es-CL')}`;
    }
  };

  return (
    <>
      <div className={styles.title}>
        <span>Mis saldos</span>
      </div>
      <div className={styles.balancesContainer}>
        {Object.entries(balances).map(([currency, amount]) => {
          if (amount > 0) {
            return (
              <UnitBalance
                key={currency}
                balance={formatBalance(currency, amount)}
                currency={currency}
              />
            );
          }
          return null;
        })}
      </div>
    </>
  );
};

export default MyBalances;
