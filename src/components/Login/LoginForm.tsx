import React, { useState, FormEvent } from 'react';
import styles from './LoginForm.module.css';
import { ValidEmail, VisibilityIcon, VisibilityOffIcon } from '../VisibilityIcons';

type LoginFormProps = {
  onSubmit: (email: string, password: string) => void;
};

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    setIsEmailValid(validateEmail(email));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <div className={styles.inputGroup}>
        <label htmlFor="email">Correo electrónico</label>
        <div className={styles.loginInput}>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="juan@gmail.com"
            required
          />
          <span className={styles.inputIcons}>{isEmailValid ? <ValidEmail /> : null}</span>
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password">Contraseña</label>
        <div className={styles.loginInput}>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Escribe tu contraseña"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.inputIcons}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
        </div>
      </div>
      <div className={styles.forgotPassword}>
        <a href="/recuperar-contrasena">¿Olvidaste tu contraseña?</a>
      </div>
      <button
        type="submit"
        className={`${styles.submitButton} ${isEmailValid ? styles.active : ''}`}
        disabled={!isEmailValid}
      >
        Iniciar sesión
      </button>
    </form>
  );
};

export default LoginForm;
