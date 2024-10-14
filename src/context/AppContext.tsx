import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export type Balance = {
  [key: string]: number;
};

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
  balances: Balance[];
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

interface ExchangeParams {
  currency_sent: string;
  currency_received: string;
  amount_sent: number;
}

type CryptoPrices = {
  prices: {
    [key: string]: {
      [key: string]: number;
    };
  };
  valid_until: string;
};

interface AppContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  transactions: Transaction[];
  balances: Balance[];
  fetchTransactions: () => Promise<void>;
  fetchBalances: () => Promise<void>;
  defaultCurrency: string;
  isLoading: boolean;
  error: string | null;
  cryptoPrices: CryptoPrices | null;
  fetchCryptoPrices: () => Promise<void>;
  executeExchange: () => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balances, setBalances] = useState<Balance[]>([]);
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrices | null>(null);
  const [defaultCurrency, setDefaultCurrency] = useState<string>('');
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
      fetchBalances();
      fetchCryptoPrices();
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

  const fetchBalances = async () => {
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
      const response = await fetch('https://api.qa.vitawallet.io/api/profile', {
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
      setBalances(data.data.attributes.balances);
      setDefaultCurrency(data.data.attributes.default_currency);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCryptoPrices = async () => {
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
      const response = await fetch(
        'https://api.qa.vitawallet.io/api/users/get_crypto_multi_prices',
        {
          headers: {
            'access-token': accessToken,
            uid: uid,
            client: client,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch crypto prices');
      }
      const data: CryptoPrices = await response.json();
      setCryptoPrices(data);
      const validUntil = new Date(data.valid_until).getTime();
      const now = new Date().getTime();
      const timeUntilNextUpdate = Math.max(0, validUntil - now);

      setTimeout(fetchCryptoPrices, timeUntilNextUpdate);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred while fetching crypto prices',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const executeExchange = async (params: ExchangeParams) => {
    const accessToken = localStorage.getItem('access-token');
    const client = localStorage.getItem('client');
    const uid = localStorage.getItem('uid');

    if (!accessToken || !client || !uid) {
      throw new Error('Authentication headers are missing. Please log in again.');
    }

    try {
      const response = await fetch('https://api.qa.vitawallet.io/api/transactions/exchange', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-token': accessToken,
          client: client,
          uid: uid,
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Failed to execute exchange');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error executing exchange:', error);
      throw error;
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        error,
        transactions,
        balances,
        fetchTransactions,
        fetchBalances,
        defaultCurrency,
        cryptoPrices,
        fetchCryptoPrices,
        executeExchange,
      }}
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
