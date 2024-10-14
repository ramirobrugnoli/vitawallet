import React from 'react';
import HelloTitle from '../HelloTitle/HelloTitle';
import MyBalances from '../MyBalances/MyBalances';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import styles from './Inicio.module.css';

const balancesTest = {
  vita_card: 0,
  usd: 0,
  clp: 50000,
  cop: 0,
  ars: 0,
  mxn: 0,
  btc: 0.0045,
  usdt: 56,
  usdc: 12,
};

const transactionsArray = [
  {
    id: '1',
    type: 'transaction',
    attributes: {
      amount: '2000.00',
      created_at: '2024-03-01T10:00:00Z',
      currency: 'clp',
      description: 'Recibiste dinero',
      category: 'received',
      category_translate: 'Recibiste',
      status: 'completed',
    },
  },
  {
    id: '2',
    type: 'transaction',
    attributes: {
      amount: '500200.00',
      created_at: '2024-03-02T14:30:00Z',
      currency: 'clp',
      description: 'Recarga de saldo',
      category: 'deposit',
      category_translate: 'Recargaste',
      status: 'completed',
    },
  },
  {
    id: '3',
    type: 'transaction',
    attributes: {
      amount: '10000.00',
      created_at: '2024-03-03T09:15:00Z',
      currency: 'clp',
      description: 'Transferencia saliente',
      category: 'transfer',
      category_translate: 'Transferiste',
      status: 'completed',
    },
  },
  {
    id: '4',
    type: 'transaction',
    attributes: {
      amount: '20000.00',
      created_at: '2024-03-04T16:45:00Z',
      currency: 'clp',
      description: 'Transferencia saliente',
      category: 'transfer',
      category_translate: 'Transferiste',
      status: 'completed',
    },
  },
  {
    id: '5',
    type: 'transaction',
    attributes: {
      amount: '50000.00',
      created_at: '2024-03-05T11:20:00Z',
      currency: 'clp',
      description: 'Recarga de saldo',
      category: 'deposit',
      category_translate: 'Recargaste',
      status: 'completed',
    },
  },
  {
    id: '6',
    type: 'transaction',
    attributes: {
      amount: '2000.00',
      created_at: '2024-03-06T13:00:00Z',
      currency: 'usdt',
      description: 'Intercambio de moneda',
      category: 'exchange',
      category_translate: 'Intercambiaste',
      status: 'completed',
    },
  },
  {
    id: '7',
    type: 'transaction',
    attributes: {
      amount: '10000.00',
      created_at: '2024-03-07T10:30:00Z',
      currency: 'clp',
      description: 'Transferencia saliente',
      category: 'transfer',
      category_translate: 'Transferiste',
      status: 'completed',
    },
  },
  {
    id: '8',
    type: 'transaction',
    attributes: {
      amount: '20000.00',
      created_at: '2024-03-08T09:00:00Z',
      currency: 'clp',
      description: 'Transferencia saliente',
      category: 'transfer',
      category_translate: 'Transferiste',
      status: 'completed',
    },
  },
  {
    id: '9',
    type: 'transaction',
    attributes: {
      amount: '50000.00',
      created_at: '2024-03-09T15:45:00Z',
      currency: 'clp',
      description: 'Recarga de saldo',
      category: 'deposit',
      category_translate: 'Recargaste',
      status: 'completed',
    },
  },
];

const Inicio = () => {
  return (
    <div className={styles.userInfoContainer}>
      <HelloTitle userName={'David'} />
      <MyBalances balances={balancesTest} />
      <TransactionHistory transactions={transactionsArray} />
    </div>
  );
};

export default Inicio;
