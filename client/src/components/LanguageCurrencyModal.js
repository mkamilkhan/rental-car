import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { triggerTranslation } from '../utils/translateHelper';
import './LanguageCurrencyModal.css';

const LanguageCurrencyModal = ({ isOpen, onClose }) => {
  const { language, changeLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [activeTab, setActiveTab] = useState('language');

  // Initialize Google Translate - MUST be before early return
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Wait for Google Translate to load
    const initTranslate = () => {
      if (window.google && window.google.translate) {
        // Google Translate is loaded
        return;
      }
      
      // Check if script is already added
      if (!document.querySelector('script[src*="translate.google.com"]')) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
      }
    };

    // Try to initialize
    if (window.googleTranslateElementInit) {
      window.googleTranslateElementInit();
    } else {
      // Define the callback function
      window.googleTranslateElementInit = function() {
        // eslint-disable-next-line no-undef
        if (typeof window !== 'undefined' && typeof google !== 'undefined' && google.translate) {
          // eslint-disable-next-line no-undef
          new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,ar,fr,de,es,it,pt,ru,zh-CN,ja,ko,hi,tr,nl,pl,th',
            // eslint-disable-next-line no-undef
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            multilanguagePage: true
          }, 'google_translate_element');
          
          // Ensure the entire page is translatable
          if (document.documentElement) {
            document.documentElement.setAttribute('lang', 'en');
          }
        }
      };
      initTranslate();
    }
  }, []);

  if (!isOpen) return null;

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧', country: 'United Kingdom' },
    { code: 'ar', name: 'العربية', flag: '🇦🇪', country: 'United Arab Emirates' },
    { code: 'en', name: 'English (US)', flag: '🇺🇸', country: 'United States' },
    { code: 'en', name: 'English (Australia)', flag: '🇦🇺', country: 'Australia' },
    { code: 'en', name: 'English (India)', flag: '🇮🇳', country: 'India' },
    { code: 'en', name: 'English (Singapore)', flag: '🇸🇬', country: 'Singapore' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', country: 'France' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', country: 'Germany' },
    { code: 'es', name: 'Español', flag: '🇪🇸', country: 'Spain' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹', country: 'Italy' },
    { code: 'pt', name: 'Português', flag: '🇵🇹', country: 'Portugal' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺', country: 'Russia' },
    { code: 'zh', name: '中文', flag: '🇨🇳', country: 'China' },
    { code: 'ja', name: '日本語', flag: '🇯🇵', country: 'Japan' },
    { code: 'ko', name: '한국어', flag: '🇰🇷', country: 'South Korea' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', country: 'India' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷', country: 'Turkey' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱', country: 'Netherlands' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱', country: 'Poland' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭', country: 'Thailand' },
  ];

  const currencies = [
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
    { code: 'AUD', symbol: '$', name: 'Australian Dollar' },
    { code: 'CAD', symbol: '$', name: 'Canadian Dollar' },
    { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
    { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
    { code: 'SGD', symbol: '$', name: 'Singapore Dollar' },
    { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
    { code: 'THB', symbol: '฿', name: 'Thai Baht' },
    { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
    { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
    { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
    { code: 'BHD', symbol: '.د.ب', name: 'Bahraini Dinar' },
    { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar' },
    { code: 'OMR', symbol: '﷼', name: 'Omani Rial' },
    { code: 'QAR', symbol: '﷼', name: 'Qatari Riyal' },
    { code: 'EGP', symbol: '£', name: 'Egyptian Pound' },
    { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  ];


  const handleLanguageSelect = (langCode) => {
    changeLanguage(langCode);
    
    // Trigger Google Translate for entire page
    triggerTranslation(langCode);
    
    onClose();
  };

  const handleCurrencySelect = (currencyCode) => {
    setCurrency(currencyCode);
    onClose();
  };

  return (
    <div className="lang-currency-modal-overlay" onClick={onClose}>
      <div className="lang-currency-modal" onClick={(e) => e.stopPropagation()}>
        <button className="lang-currency-modal-close" onClick={onClose}>
          ✕
        </button>
        
        <div className="lang-currency-tabs">
          <button
            className={`lang-currency-tab ${activeTab === 'language' ? 'active' : ''}`}
            onClick={() => setActiveTab('language')}
          >
            Language & Country
          </button>
          <button
            className={`lang-currency-tab ${activeTab === 'currency' ? 'active' : ''}`}
            onClick={() => setActiveTab('currency')}
          >
            Currency
          </button>
        </div>

        <div className="lang-currency-content">
          {activeTab === 'language' && (
            <div className="lang-currency-list">
              {languages.map((lang, index) => (
                <div
                  key={index}
                  className={`lang-currency-item ${language === lang.code ? 'selected' : ''}`}
                  onClick={() => handleLanguageSelect(lang.code)}
                >
                  <span className="lang-flag">{lang.flag}</span>
                  <span className="lang-name">{lang.name}</span>
                  <span className="lang-country">{lang.country}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'currency' && (
            <div className="lang-currency-list">
              {currencies.map((curr, index) => (
                <div
                  key={index}
                  className={`lang-currency-item ${currency === curr.code ? 'selected' : ''}`}
                  onClick={() => handleCurrencySelect(curr.code)}
                >
                  <span className="currency-name">{curr.name}</span>
                  <span className="currency-code">{curr.code} - {curr.symbol}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LanguageCurrencyModal;
