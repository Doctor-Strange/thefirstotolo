// tslint:disable: object-literal-sort-keys
import createStore from 'react-waterfall';
import { i18n } from './i18n';

function changeLangFunc() {
  console.log('changeLang happend in me', i18n.language);
  const nextLang = i18n.language === 'en' ? 'fa' : 'en';
  i18n.changeLanguage(nextLang);
  return nextLang;
}

const config = {
  initialState: { count: 0, lang: 'fa' },
  actionsCreators: {
    increment: ({ count }) => ({ count: count + 1 }),
    changeLang: () => ({ lang: changeLangFunc() })
  }
};

export const { Provider, connect, actions } = createStore(config);
