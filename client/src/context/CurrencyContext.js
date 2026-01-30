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

  // Exchange rates (AED to other currencies) - approximate rates
  const exchangeRates = {
    'AED': 1,      // Base currency
    'USD': 0.27,   // 1 AED = 0.27 USD
    'EUR': 0.25,   // 1 AED = 0.25 EUR
    'GBP': 0.21,   // 1 AED = 0.21 GBP
    'INR': 22.5,   // 1 AED = 22.5 INR
    'SAR': 1.02,   // 1 AED = 1.02 SAR
    'PKR': 75,     // 1 AED = 75 PKR
    'JPY': 40,     // 1 AED = 40 JPY
    'CNY': 1.95,   // 1 AED = 1.95 CNY
    'KRW': 360,    // 1 AED = 360 KRW
    'AUD': 0.41,   // 1 AED = 0.41 AUD
    'CAD': 0.37,   // 1 AED = 0.37 CAD
    'CHF': 0.24,   // 1 AED = 0.24 CHF
    'HKD': 2.11,   // 1 AED = 2.11 HKD
    'SGD': 0.36,   // 1 AED = 0.36 SGD
    'MYR': 1.28,   // 1 AED = 1.28 MYR
    'THB': 9.8,    // 1 AED = 9.8 THB
    'PHP': 15.2,   // 1 AED = 15.2 PHP
    'IDR': 4250,   // 1 AED = 4250 IDR
    'BHD': 0.10,   // 1 AED = 0.10 BHD
    'KWD': 0.082,  // 1 AED = 0.082 KWD
    'OMR': 0.10,   // 1 AED = 0.10 OMR
    'QAR': 0.98,   // 1 AED = 0.98 QAR
    'EGP': 8.3,    // 1 AED = 8.3 EGP
    'ZAR': 5.1     // 1 AED = 5.1 ZAR
  };

  // Convert price from AED to selected currency
  const convertPrice = (priceInAED, targetCurrency = currency) => {
    if (!priceInAED || isNaN(priceInAED)) return 0;
    const rate = exchangeRates[targetCurrency] || 1;
    const converted = Number(priceInAED) * rate;
    return Math.round(converted * 100) / 100; // Round to 2 decimal places
  };

  // Format price with currency symbol
  const formatPrice = (priceInAED, targetCurrency = currency) => {
    const converted = convertPrice(priceInAED, targetCurrency);
    const symbol = getCurrencySymbol(targetCurrency);
    return `${symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  };

  const value = {
    currency,
    setCurrency: changeCurrency,
    getCurrencySymbol,
    convertPrice,
    formatPrice,
    exchangeRates
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
