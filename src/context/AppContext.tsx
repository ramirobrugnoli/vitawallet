import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface User {
  email: string;
}

interface AppContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    console.log('user en context:', user);
  }, [user]);

  const login = async (email: string, password: string) => {
    const myHeaders = new Headers();
    myHeaders.append('app-name', 'ANGIE');

    const urlencoded = new URLSearchParams();
    urlencoded.append('email', email);
    urlencoded.append('password', password);
    urlencoded.append('dev_mode', 'true');

    try {
      const response = await fetch('https://api.qa.vitawallet.io/api/auth/sign_in', {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      /* const userData: User = { email: data.data.email }; */

      localStorage.setItem('user', JSON.stringify(data.data));
      setUser(data.data);

      localStorage.setItem('access-token', response.headers.get('access-token') || '');
      localStorage.setItem('client', response.headers.get('client') || '');
      localStorage.setItem('uid', response.headers.get('uid') || '');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access-token');
    localStorage.removeItem('client');
    localStorage.removeItem('uid');
  };

  return <AppContext.Provider value={{ user, login, logout }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
