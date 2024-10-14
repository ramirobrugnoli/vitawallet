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
        return <div>Contenido de Transferir</div>;
      case 'Recargar':
        return <div>Contenido de Recargar</div>;
      case 'Intercambiar':
        return <div>Contenido de Intercambiar</div>;
      case 'Perfil':
        return <div>Contenido de Perfil</div>;
      case 'Ayuda':
        return <div>Contenido de Ayuda</div>;
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
