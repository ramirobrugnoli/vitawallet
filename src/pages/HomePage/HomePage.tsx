import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { SidebarHome, Inicio } from '../../components/Home';

import styles from './HomePage.module.css';

const HomePage = () => {
  const { user, logout } = useAppContext();
  console.log('user en componente home', user);

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.sidebarContainer}>
        <SidebarHome />
      </div>
      <Inicio />
    </div>
  );
};

export default HomePage;
