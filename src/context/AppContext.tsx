import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, Transaction, Balance, CryptoPrices, ExchangeParams } from '../interfaces';
import { authService, transactionService, profileService, cryptoService } from '../services/api';

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
  executeExchange: (arg0: ExchangeParams) => Promise<any>;
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
    try {
      const { data, headers } = await authService.login(email, password);
      localStorage.setItem('user', JSON.stringify(data.data));
      setUser(data.data);

      localStorage.setItem('access-token', headers.get('access-token') || '');
      localStorage.setItem('client', headers.get('client') || '');
      localStorage.setItem('uid', headers.get('uid') || '');
      localStorage.setItem('expiry', headers.get('expiry') || '');
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
    try {
      const data = await transactionService.fetchTransactions();
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
    try {
      const data = await profileService.fetchProfile();
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
    try {
      const data: CryptoPrices = await cryptoService.fetchCryptoPrices();
      setCryptoPrices(data);
      const validUntil = new Date(data.valid_until).getTime();
      const now = new Date().getTime();
      const readableNow = new Date(now).toLocaleString();
      const timeUntilNextUpdate = Math.max(0, validUntil - now);
      console.log(
        `Se actualizo el precio de crytpo a las ${readableNow}, será valido durante ${Math.floor(timeUntilNextUpdate / 60000)} minutos`,
      );

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
    try {
      const data = await transactionService.executeExchange(params);
      await Promise.all([fetchBalances(), fetchTransactions()]);
      return data;
    } catch (error) {
      console.error('Error executing exchange:', error);
      if (error instanceof Error) {
        throw new Error(error.message);
      } else if (typeof error === 'object' && error !== null && 'error' in error) {
        throw new Error((error as { error: string }).error);
      } else {
        throw new Error('An unknown error occurred during the exchange');
      }
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
