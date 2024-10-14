import React from 'react';
import { TitleCoin } from '../../VisibilityIcons';
import styles from './HelloTitle.module.css';

type HelloTitleProps = {
  userName: string;
};

const HelloTitle = ({ userName }: HelloTitleProps) => {
  return (
    <p className={styles.helloTitle}>
      <TitleCoin />
      ¡Hola <span>{userName}!</span>
    </p>
  );
};

export default HelloTitle;
