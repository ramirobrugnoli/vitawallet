import React, { useState, useEffect } from 'react';
import styles from './ExchangeSelector.module.css';
import { useAppContext } from '../../../context/AppContext';
import CustomDropdown from './CustomDropdown';
import clpImage from '../../../assets/Home/Chile.png';
import btcImage from '../../../assets/Home/Bitcoin.png';
import usdcImage from '../../../assets/Home/usdc.png';
import usdtImage from '../../../assets/Home/Tether.png';
import defaultIcon from '../../../assets/Home/defaultIcon.png';

export const currencyIcons: { [key: string]: string } = {
  clp: clpImage,
  btc: btcImage,
  usdc: usdcImage,
  usdt: usdtImage,
  default: defaultIcon,
};

const ExchangeSelector = () => {
  const { balances, cryptoPrices } = useAppContext();
  const [fromCurrency, setFromCurrency] = useState('usd');
  const [toCurrency, setToCurrency] = useState('BTC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isValid, setIsValid] = useState(false);

  const availableCurrencies = Object.entries(balances)
    .filter(([_, balance]) => balance > 0)
    .map(([currency]) => currency);

  const allCryptoCurrencies = cryptoPrices
    ? Object.keys(cryptoPrices.prices).map((currency) => currency)
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

  const fromOptions = availableCurrencies.map((currency) => ({
    value: currency,
    label: currency,
    icon: currencyIcons[currency.toLowerCase()] || currencyIcons.default,
  }));

  const toOptions = allCryptoCurrencies.map((currency) => ({
    value: currency,
    label: currency,
    icon: currencyIcons[currency.toLowerCase()] || currencyIcons.default,
  }));

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromAmount(e.target.value);
  };

  return (
    <div className={styles.exchangeContainer}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.exchangeTitle}>¿Qué deseas intercambiar?</h2>
        <p className={styles.exchangeBalance}>
          Saldo disponible: ${balances[fromCurrency].toLocaleString('es-CL')}{' '}
          {fromCurrency.toUpperCase()}
        </p>

        <div className={styles.inputGroup}>
          <label>Monto a intercambiar</label>
          <div className={styles.inputRow}>
            <CustomDropdown options={fromOptions} value={fromCurrency} onChange={setFromCurrency} />
            <input
              type="number"
              value={fromAmount}
              onChange={handleFromAmountChange}
              placeholder="0,00"
              min="0"
              className={styles.amountInput}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>Quiero recibir</label>
          <div className={styles.inputRow}>
            <CustomDropdown options={toOptions} value={toCurrency} onChange={setToCurrency} />
            <input
              type="number"
              value={toAmount}
              readOnly
              placeholder="0,00"
              className={styles.amountInput}
            />
          </div>
        </div>

        {cryptoPrices && (
          <p className={styles.exchangeRate}>
            1 {fromCurrency} ={' '}
            {cryptoPrices.prices[fromCurrency.toLowerCase()][toCurrency.toLowerCase()]} {toCurrency}
          </p>
        )}
      </div>
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
