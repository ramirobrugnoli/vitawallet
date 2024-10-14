import React, { useState, useEffect } from 'react';
import styles from './ExchangeSelector.module.css';
import { useAppContext } from '../../../context/AppContext';

const ExchangeSelector = () => {
  const { defaultCurrency, balances, cryptoPrices } = useAppContext();
  const [fromCurrency, setFromCurrency] = useState(defaultCurrency);
  const [toCurrency, setToCurrency] = useState('BTC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isValid, setIsValid] = useState(false);

  const availableCurrencies = Object.entries(balances)
    .filter(([_, balance]) => balance > 0)
    .map(([currency]) => currency.toUpperCase());

  const allCryptoCurrencies = cryptoPrices
    ? Object.keys(cryptoPrices.prices).map((currency) => currency.toUpperCase())
    : [];

  useEffect(() => {
    if (cryptoPrices && fromAmount) {
      const rate = cryptoPrices.prices[fromCurrency.toLowerCase()][toCurrency.toLowerCase()];
      const calculatedAmount = parseFloat(fromAmount) * rate;
      setToAmount(calculatedAmount.toFixed(8));

      const available = balances[fromCurrency.toLowerCase()] || 0;
      setIsValid(parseFloat(fromAmount) > 0 && parseFloat(fromAmount) <= available);
    }
  }, [fromAmount, fromCurrency, toCurrency, cryptoPrices, balances]);

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value);
  };

  return (
    <div className={styles.exchangeContainer}>
      <h2 className={styles.exchangeTitle}>¿Qué deseas intercambiar?</h2>
      <p className={styles.exchangeBalance}>
        Saldo disponible: ${balances[defaultCurrency.toLowerCase()]} {defaultCurrency}
      </p>

      <div className={styles.inputGroup}>
        <label>Monto a intercambiar</label>
        <div className={styles.inputWithCurrency}>
          <select value={fromCurrency} onChange={handleFromCurrencyChange}>
            {availableCurrencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={fromAmount}
            onChange={handleFromAmountChange}
            placeholder="0.00"
            min="0"
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label>Quiero recibir</label>
        <div className={styles.inputWithCurrency}>
          <select value={toCurrency} onChange={handleToCurrencyChange}>
            {allCryptoCurrencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <input type="number" value={toAmount} readOnly placeholder="0.00" min="0" />
        </div>
      </div>

      {cryptoPrices && (
        <p className={styles.exchangeRate}>
          1 {fromCurrency} ={' '}
          {cryptoPrices.prices[fromCurrency.toLowerCase()][toCurrency.toLowerCase()]} {toCurrency}
        </p>
      )}

      <div className={styles.buttonGroup}>
        <button className={styles.backButton}>Atrás</button>
        <button className={styles.continueButton} disabled={!isValid}>
          Continuar
        </button>
      </div>
    </div>
  );
};

export default ExchangeSelector;
