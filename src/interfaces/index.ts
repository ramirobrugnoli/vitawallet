//export de interfaces. iba a separar en varios archivos pero considero que por el momento no es necesario debido a que son pocas y casi todas están vinculadas

export interface ActiveCryptos {
  btc: { addresses: Address[] };
  usdt: { addresses: Address[] };
  usdc: { addresses: Address[] };
}

export interface Address {
  bsc?: string;
  dummy?: string;
}

export type Balance = {
  [key: string]: number;
};
export interface LoginInfo {
  country: string;
  city: string;
  created_at: string;
  ip_address: string;
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

export interface ExchangeParams {
  currency_sent: string;
  currency_received: string;
  amount_sent: number;
}

export type CryptoPrices = {
  prices: {
    [key: string]: {
      [key: string]: number;
    };
  };
  valid_until: string;
};

export interface Option {
  value: string;
  label: string;
  icon: string;
}
