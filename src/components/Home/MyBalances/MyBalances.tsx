import React from 'react';
import { Balance } from '../../../context/AppContext';
import UnitBalance from './UnitBalance';
import styles from './MyBalances.module.css';

type MyBalancesProps = {
  balances: Balance[];
};

const MyBalances = ({ balances }: MyBalancesProps) => {
  const formatBalance = (currency: string, amount: number): string => {
    if (currency === 'btc') {
      return amount.toFixed(3);
    } else {
      return `$ ${amount.toLocaleString('es-CL')}`;
    }
  };

  return (
    <>
      <div className={styles.myBalancesContainer}>
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
      </div>
    </>
  );
};

export default MyBalances;
