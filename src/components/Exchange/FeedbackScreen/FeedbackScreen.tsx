import React from 'react';
import styles from './FeedbackScreen.module.css';

interface FeedbackScreenProps {
  onClose: () => void;
}

const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ onClose }) => {
  return (
    <div className={styles.feedbackContainer}>
      <img src="/path/to/success-image.png" alt="Intercambio exitoso" />
      <h2>¡Intercambio exitoso!</h2>
      <p>Tu orden se ha procesado con éxito.</p>
      <button className={styles.closeButton} onClick={onClose}>
        Cerrar
      </button>
    </div>
  );
};

export default FeedbackScreen;
