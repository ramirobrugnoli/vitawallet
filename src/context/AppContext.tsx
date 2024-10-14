import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export interface Balances {
  usd?: number;
  usdc?: number;
  usdt?: number;
  btc?: number;
}

export interface LoginInfo {
  country: string;
  city: string;
  created_at: string;
  ip_address: string;
}

export interface Address {
  bsc?: string;
  dummy?: string;
}

export interface ActiveCryptos {
  btc: { addresses: Address[] };
  usdt: { addresses: Address[] };
  usdc: { addresses: Address[] };
}

export interface UserAttributes {
  email: string;
  first_name: string;
  last_name: string;
  birthdate: string;
  document_type: string;
  document_number: string;
  daily_transbank_recharge_limit_total: string;
  balances: Balances;
  login_current: LoginInfo;
  login_last: LoginInfo;
  active_cryptos: ActiveCryptos;
  is_email_code_verification: boolean;
  country_name: string;
  residence_country_name: string;
  state_name: string;
  city_name: string;
  phone: string;
}

export interface User {
  id: string;
  type: string;
  attributes: UserAttributes;
  relationships: {
    country: { data: { id: string; type: string } };
    residence_country: { data: { id: string; type: string } };
    state: { data: { id: string; type: string } };
  };
}

export interface Transaction {
  id: string;
  type: string;
  attributes: {
    amount: string;
    created_at: string;
    currency: string;
    description: string;
    category: string;
    category_translate: string;
    status: string;
  };
}

interface AppContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  transactions: Transaction[];
  fetchTransactions: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

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
      localStorage.setItem('expiry', response.headers.get('expiry') || '');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access-token');
    localStorage.removeItem('client');
    localStorage.removeItem('uid');
  };

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);

    const accessToken = localStorage.getItem('access-token');
    const client = localStorage.getItem('client');
    const uid = localStorage.getItem('uid');

    if (!accessToken || !client || !uid) {
      setError('Authentication headers are missing. Please log in again.');
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch('https://api.qa.vitawallet.io/api/transactions', {
        headers: {
          'access-token': accessToken,
          uid: uid,
          client: client,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      const data = await response.json();
      setTransactions(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{ user, login, logout, isLoading, error, transactions, fetchTransactions }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
