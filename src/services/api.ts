import { ExchangeParams } from '../interfaces';

const BASE_URL = 'https://api.qa.vitawallet.io/api';

const getHeaders = () => {
  const accessToken = localStorage.getItem('access-token');
  const client = localStorage.getItem('client');
  const uid = localStorage.getItem('uid');

  if (!accessToken || !client || !uid) {
    throw new Error('Authentication headers are missing. Please log in again.');
  }

  return {
    'Content-Type': 'application/json',
    'access-token': accessToken,
    client,
    uid,
  };
};

export const authService = {
  login: async (email: string, password: string) => {
    const myHeaders = new Headers();
    myHeaders.append('app-name', 'ANGIE');

    const urlencoded = new URLSearchParams();
    urlencoded.append('email', email);
    urlencoded.append('password', password);
    urlencoded.append('dev_mode', 'true');

    const response = await fetch(`${BASE_URL}/auth/sign_in`, {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    return { data, headers: response.headers };
  },
};

export const transactionService = {
  fetchTransactions: async () => {
    const response = await fetch(`${BASE_URL}/transactions`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }

    return response.json();
  },

  executeExchange: async (params: ExchangeParams) => {
    const response = await fetch(`${BASE_URL}/transactions/exchange`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Failed to execute exchange');
    }

    return response.json();
  },
};

export const profileService = {
  fetchProfile: async () => {
    const response = await fetch(`${BASE_URL}/profile`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    return response.json();
  },
};

export const cryptoService = {
  fetchCryptoPrices: async () => {
    const response = await fetch(`${BASE_URL}/users/get_crypto_multi_prices`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch crypto prices');
    }

    return response.json();
  },
};
