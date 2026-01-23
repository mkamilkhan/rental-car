// Helper to ensure Google Translate works on all pages
export const initializeGoogleTranslate = () => {
  if (typeof window === 'undefined') return;

  // Check if already initialized
  if (window.googleTranslateInitialized) return;
  
  // Wait for Google Translate script to load
  const checkGoogleTranslate = () => {
    // eslint-disable-next-line no-undef
    if (typeof google !== 'undefined' && google.translate) {
      // Google Translate is loaded
      if (!document.getElementById('google_translate_element')) {
        const div = document.createElement('div');
        div.id = 'google_translate_element';
        div.style.cssText = 'position: absolute; top: -9999px; left: -9999px; width: 0; height: 0; overflow: hidden; opacity: 0; pointer-events: none;';
        document.body.appendChild(div);
      }

      // Initialize if not already done
      if (!window.googleTranslateElementInit) {
        // eslint-disable-next-line no-undef
        new google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,ar,fr,de,es,it,pt,ru,zh-CN,ja,ko,hi,tr,nl,pl,th',
          // eslint-disable-next-line no-undef
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
          multilanguagePage: true
        }, 'google_translate_element');
        
        window.googleTranslateInitialized = true;
      }
      return true;
    }
    return false;
  };

  // Try immediately
  if (checkGoogleTranslate()) return;

  // Retry if not loaded yet
  const interval = setInterval(() => {
    if (checkGoogleTranslate()) {
      clearInterval(interval);
    }
  }, 100);

  // Stop after 5 seconds
  setTimeout(() => clearInterval(interval), 5000);
};

// Trigger translation for a specific language
export const triggerTranslation = (langCode) => {
  const googleTranslateCodes = {
    'en': 'en',
    'ar': 'ar',
    'fr': 'fr',
    'de': 'de',
    'es': 'es',
    'it': 'it',
    'pt': 'pt',
    'ru': 'ru',
    'zh': 'zh-CN',
    'ja': 'ja',
    'ko': 'ko',
    'hi': 'hi',
    'tr': 'tr',
    'nl': 'nl',
    'pl': 'pl',
    'th': 'th'
  };

  const translateCode = googleTranslateCodes[langCode] || 'en';
  
  const triggerTranslate = () => {
    // Method 1: Try using the select element
    const selectElement = document.querySelector('.goog-te-combo');
    if (selectElement) {
      selectElement.value = translateCode;
      const event = new Event('change', { bubbles: true });
      selectElement.dispatchEvent(event);
      selectElement.click();
      return true;
    }
    
    // Method 2: Try using iframe
    const iframes = document.querySelectorAll('iframe');
    for (let iframe of iframes) {
      try {
        if (iframe.contentWindow && iframe.contentWindow.document) {
          const select = iframe.contentWindow.document.querySelector('.goog-te-combo');
          if (select) {
            select.value = translateCode;
            const event = new Event('change', { bubbles: true });
            select.dispatchEvent(event);
            return true;
          }
        }
      } catch (e) {
        // Cross-origin or other error, continue
      }
    }
    
    return false;
  };

  // Try immediately
  let success = triggerTranslate();
  
  // Retry multiple times
  if (!success) setTimeout(() => triggerTranslate(), 100);
  if (!success) setTimeout(() => triggerTranslate(), 300);
  if (!success) setTimeout(() => triggerTranslate(), 500);
  if (!success) setTimeout(() => triggerTranslate(), 1000);
  if (!success) setTimeout(() => triggerTranslate(), 2000);
};
