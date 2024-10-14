import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import {
  SidebarHome,
  Inicio,
  Soon,
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
        return <Soon onSelectOption={handleSelectOption} />;
      case 'Recargar':
        return <Soon onSelectOption={handleSelectOption} />;
      case 'Intercambiar':
        return <Soon onSelectOption={handleSelectOption} />;
      case 'Perfil':
        return <Soon onSelectOption={handleSelectOption} />;
      case 'Ayuda':
        return <Soon onSelectOption={handleSelectOption} />;
      default:
        return <Inicio />;
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
