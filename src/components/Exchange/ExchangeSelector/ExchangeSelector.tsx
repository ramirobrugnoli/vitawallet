import React, { useState, useEffect } from 'react';
import styles from './ExchangeSelector.module.css';
import { useAppContext } from '../../../context/AppContext';
import CustomDropdown from './CustomDropdown';
import clpImage from '../../../assets/Home/Chile.png';
import btcImage from '../../../assets/Home/Bitcoin.png';
import usdcImage from '../../../assets/Home/usdc.png';
import usdtImage from '../../../assets/Home/Tether.png';
import defaultIcon from '../../../assets/Home/defaultIcon.png';
import FeedbackScreen from '../FeedbackScreen/FeedbackScreen';
import TransactionSummary from '../TransactionSummary/TransactionSummary';
import { Balance } from '../../../context/AppContext';

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
  const [toCurrency, setToCurrency] = useState('usdc');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [lastEdited, setLastEdited] = useState<'from' | 'to'>('from');
  const [currentStep, setCurrentStep] = useState<'select' | 'summary' | 'feedback'>('select');

  const handleContinue = () => {
    setCurrentStep('summary');
  };

  const handleBack = () => {
    setCurrentStep('select');
  };

  const handleConfirm = () => {
    setCurrentStep('feedback');
  };

  const handleClose = () => {
    setCurrentStep('select');
    setFromAmount('');
    setToAmount('');
  };

  const availableCurrencies = Object.entries(balances)
    .filter(([_, balance]) => balance > 0)
    .map(([currency]) => currency);

  const allCryptoCurrencies = cryptoPrices
    ? Object.keys(cryptoPrices.prices).map((currency) => currency)
    : [];

  useEffect(() => {
    if (cryptoPrices && fromAmount) {
      const rate = cryptoPrices.prices[fromCurrency.toLowerCase()][toCurrency.toLowerCase()];
      const available = balances[fromCurrency] || 0;

      if (lastEdited === 'from') {
        const calculatedAmount = parseFloat(fromAmount) * rate;
        setToAmount(calculatedAmount.toFixed(8));
        setIsValid(parseFloat(fromAmount) > 0 && parseFloat(fromAmount) <= available);
      } else if (lastEdited === 'to' && toAmount) {
        const calculatedAmount = parseFloat(toAmount) / rate;
        setFromAmount(calculatedAmount.toFixed(8));
        setIsValid(calculatedAmount > 0 && calculatedAmount <= available);
      }
    }
  }, [fromAmount, toAmount, fromCurrency, toCurrency, cryptoPrices, balances, lastEdited]);

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
    setLastEdited('from');
  };

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToAmount(e.target.value);
    setLastEdited('to');
  };

  const handleFromCurrencyChange = (value: string) => {
    setFromCurrency(value);
    setLastEdited('from');
  };

  const handleToCurrencyChange = (value: string) => {
    setToCurrency(value);
    setLastEdited('to');
  };

  if (currentStep === 'summary') {
    return (
      <TransactionSummary
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        fromAmount={fromAmount}
        toAmount={toAmount}
        onConfirm={handleConfirm}
        onBack={handleBack}
      />
    );
  }

  if (currentStep === 'feedback') {
    return <FeedbackScreen onClose={handleClose} />;
  }

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
            <CustomDropdown
              options={fromOptions}
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
            />
            <input
              type="number"
              value={fromAmount}
              onChange={handleFromAmountChange}
              placeholder="0,00"
              min="0"
              className={styles.amountInput}
              step="0.01"
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>Quiero recibir</label>
          <div className={styles.inputRow}>
            <CustomDropdown
              options={toOptions}
              value={toCurrency}
              onChange={handleToCurrencyChange}
            />
            <input
              type="number"
              value={toAmount}
              onChange={handleToAmountChange}
              placeholder="0,00"
              min="0"
              className={styles.amountInput}
              step="0.01"
            />
          </div>
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <button className={styles.backButton}>Atrás</button>
        <button className={styles.continueButton} disabled={!isValid} onClick={handleContinue}>
          Continuar
        </button>
      </div>
    </div>
  );
};

export default ExchangeSelector;
