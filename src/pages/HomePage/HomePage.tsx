import React from 'react';
import { useAppContext } from '../../context/AppContext';

const HomePage = () => {
  const { user, logout } = useAppContext();
  console.log('user en componente home', user);

  return (
    <div>
      <h1>Welcome to HomePage</h1>
      <p>User Email: {user?.email}</p>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default HomePage;
