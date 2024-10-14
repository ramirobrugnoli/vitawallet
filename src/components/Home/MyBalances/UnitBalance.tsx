import React from 'react';
import styles from './UnitBalance.module.css';
import clpImage from '../../../assets/Home/Chile.png';
import btcImage from '../../../assets/Home/Bitcoin.png';
import usdcImage from '../../../assets/Home/usdc.png';
import usdtImage from '../../../assets/Home/Tether.png';
import defaultIcon from '../../../assets/Home/defaultIcon.png';

interface UnitBalanceProps {
  currency: string;
  balance: string;
}

const currencyIcons: { [key: string]: string } = {
  clp: clpImage,
  btc: btcImage,
  usdc: usdcImage,
  usdt: usdtImage,
};

const currencyNames: { [key: string]: string } = {
  clp: 'Peso chileno',
  btc: 'Bitcoin',
  usdt: 'Tether',
  usd: 'Dolares',
  usdc: 'USDC',
};

const UnitBalance = ({ balance, currency }: UnitBalanceProps): JSX.Element => {
  const iconSrc = currencyIcons[currency.toLowerCase()];
  const name = currencyNames[currency];

  return (
    <div className={styles.balanceItem}>
      <div className={styles.balanceName}>
        <span className={styles.currencyName}>{name}</span>
        <span className={styles.icon}>
          <img src={iconSrc ? iconSrc : defaultIcon} alt={name} />
        </span>
      </div>
      <div className={styles.balanceInfo}>
        <span className={styles.balanceAmount}>{balance}</span>
      </div>
    </div>
  );
};

export default UnitBalance;
