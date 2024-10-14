import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { SidebarHome, HelloTitle } from '../../components/Home';

const HomePage = () => {
  const { user, logout } = useAppContext();
  console.log('user en componente home', user);

  return (
    <div>
      <HelloTitle userName={'David'} />
      <SidebarHome />
    </div>
  );
};

export default HomePage;
