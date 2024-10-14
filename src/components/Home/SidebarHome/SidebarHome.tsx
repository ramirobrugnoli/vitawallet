import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SidebarHome.module.css';

interface SidebarHomeProps {
  onSelectOption: (option: string) => void;
  logout: () => void;
  selectedOption: string;
}

const SidebarHome = ({ logout, onSelectOption, selectedOption }: SidebarHomeProps) => {
  const options = ['Inicio', 'Transferir', 'Recargar', 'Intercambiar', 'Perfil', 'Ayuda'];
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {options.map((option) => (
            <li key={option} className={styles.navItem}>
              <button
                onClick={() => onSelectOption(option)}
                className={`${styles.navLink} ${selectedOption === option ? styles.active : ''}`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <button onClick={logout} className={styles.logoutButton}>
        Cerrar sesión
      </button>
    </aside>
  );
};

export default SidebarHome;
