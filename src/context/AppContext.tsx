import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);

  return (
    <AppContext.Provider value={{ user, setUser, balance, setBalance }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
