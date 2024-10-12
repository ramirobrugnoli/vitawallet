import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/Login';
import { useAppContext } from '../../context/AppContext';
import styles from './LoginPage.module.css';
import amicoImage from '../../assets/Login/amico.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAppContext();
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      navigate('/home');
    } catch (error) {
      console.error('Login failed', error);
      setLoginError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };
  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginTitleContainer}>
        <h1>Iniciar sesión</h1>
      </div>
      <div className={styles.formAndImageContainer}>
        <LoginForm onSubmit={handleLogin} />
        {isLoading && <p>Cargando...</p>}
        {loginError && <p className={styles.errorMessage}>{loginError}</p>}
        <img src={amicoImage} alt="Amico" className={styles.loginImage} />
      </div>
    </div>
  );
};

export default LoginPage;