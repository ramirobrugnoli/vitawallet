import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/Login';
import { useAppContext } from '../context/AppContext';

const LoginPage: React.FC = () => {
  /*   const navigate = useNavigate();
  const { login } = useAppContext();

  const handleLogin = async (username: string, password: string) => {
    try {
      await login(username, password);
      navigate('/home');
    } catch (error) {
      console.error('Login failed', error);
      // Manejar error de login
    }
  }; */

  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
