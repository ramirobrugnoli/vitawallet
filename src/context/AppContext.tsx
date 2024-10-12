import { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  email: string;
}

interface AppContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AppContext = createContext<AppContextType | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

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
        redirect: 'follow',
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('data que devolvio login:', data);

      const accessToken = response.headers.get('access-token');
      const client = response.headers.get('client');
      const uid = response.headers.get('uid');

      if (!accessToken || !client || !uid) {
        throw new Error('Missing authentication headers');
      }

      localStorage.setItem('access-token', accessToken);
      localStorage.setItem('client', client);
      localStorage.setItem('uid', uid);

      setUser(data.data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      throw new Error(errorMessage); //dentro del catch vuelvo a lanzar el error para poder agarrarlo en el componente y condicionar la dredireccion
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('access-token');
    localStorage.removeItem('client');
    localStorage.removeItem('uid');
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
    error,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
