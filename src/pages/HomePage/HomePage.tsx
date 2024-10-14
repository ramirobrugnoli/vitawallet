import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { SidebarHome, HelloTitle } from '../../components/Home';
import styles from './HomePage.module.css';
import MyBalances from '../../components/Home/MyBalances/MyBalances';

const balancesTest = {
  vita_card: 0,
  usd: 0,
  clp: 50000,
  cop: 0,
  ars: 0,
  mxn: 0,
  btc: 0.0045,
  usdt: 56,
  usdc: 12,
};

const HomePage = () => {
  const { user, logout } = useAppContext();
  console.log('user en componente home', user);

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.sidebarContainer}>
        <SidebarHome />
      </div>
      <div className={styles.userInfoContainer}>
        <HelloTitle userName={'David'} />
        <MyBalances balances={balancesTest} />
      </div>
    </div>
  );
};

export default HomePage;
