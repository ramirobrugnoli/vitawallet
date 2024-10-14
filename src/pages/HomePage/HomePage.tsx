import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import {
  SidebarHome,
  Inicio,
  /*   Transferir,
  Recargar,
  Intercambiar,
  Perfil,
  Ayuda, */
} from '../../components/Home';

import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  const { user, logout } = useAppContext();
  const [selectedOption, setSelectedOption] = useState('Inicio');

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'Inicio':
        return <Inicio />;
      case 'Transferir':
        return null;
      case 'Recargar':
        return null;
      case 'Intercambiar':
        return null;
      case 'Perfil':
        return null;
      case 'Ayuda':
        return null;
      default:
        return null;
    }
  };

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.sidebarContainer}>
        <SidebarHome
          onSelectOption={handleSelectOption}
          logout={logout}
          selectedOption={selectedOption}
        />
      </div>
      <div className={styles.contentContainer}>{renderContent()}</div>
    </div>
  );
};

export default HomePage;
