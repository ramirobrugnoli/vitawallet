import React from 'react';
import coinsImage from '../../../assets/Proximamente/coins.png';
import styles from './Soon.module.css';

interface SoonProps {
  onSelectOption: (option: string) => void;
}

const Soon = ({ onSelectOption }: SoonProps) => {
  return (
    <>
      <div className={styles.soonContainer}>
        <span>Proximamente...</span>
        <img
          className={styles.soonImage}
          src={coinsImage}
          onClick={() => onSelectOption('Inicio')}
        />
      </div>
    </>
  );
};

export default Soon;
