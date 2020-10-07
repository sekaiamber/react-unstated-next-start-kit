import { useState } from 'react';
import { createContainer } from 'unstated-next';
import i18NJson from '../i18n';
import { storage } from '../utils';

window.locale = storage('LOCAL') || 'zh-cn';
window.i18n = i18NJson[window.locale];

const defaultStates = {
  locale: window.locale,
  i18n: window.i18n,
};

function useI18N(customInitialStates = {}) {
  const initialStates = {
    ...defaultStates,
    ...customInitialStates,
  };
  const [locale, setLocale] = useState(initialStates.locale);
  const [i18n, setI18n] = useState(initialStates.i18n);
  return {
    locale,
    i18n,
    setLocale: (payload) => {
      const selectedI18n = i18NJson[payload];
      if (i18n) {
        // 一些全局變量以及LocalStorage
        window.locale = payload;
        window.i18n = selectedI18n;
        storage('LOCAL', payload);
        setLocale(payload);
        setI18n(selectedI18n);
      }
    },
  };
}

const I18N = createContainer(useI18N);

export default I18N;
