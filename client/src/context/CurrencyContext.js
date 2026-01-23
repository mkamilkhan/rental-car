import React, { createContext, useState, useEffect, useContext } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('currency') || 'AED';
  });

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
  };

  const getCurrencySymbol = (currencyCode) => {
    const symbols = {
      'AED': 'د.إ',
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'INR': '₹',
      'SAR': '﷼',
      'JPY': '¥',
      'CNY': '¥',
      'KRW': '₩',
      'AUD': '$',
      'CAD': '$',
      'CHF': 'Fr',
      'HKD': 'HK$',
      'SGD': '$',
      'MYR': 'RM',
      'THB': '฿',
      'PHP': '₱',
      'IDR': 'Rp',
      'PKR': '₨',
      'BHD': '.د.ب',
      'KWD': 'د.ك',
      'OMR': '﷼',
      'QAR': '﷼',
      'EGP': '£',
      'ZAR': 'R'
    };
    return symbols[currencyCode] || currencyCode;
  };

  const value = {
    currency,
    setCurrency: changeCurrency,
    getCurrencySymbol
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
