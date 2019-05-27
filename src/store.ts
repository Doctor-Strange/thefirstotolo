// tslint:disable: object-literal-sort-keys
import createStore from 'react-waterfall';
import { auth, changeLangFunc, signin } from './actions';

const config = {
  initialState: {
    lang: 'fa',
    user: { token: null, phone: null, first_name: null, last_name: null }
  },
  actionsCreators: {
    changeLang: () => ({ lang: changeLangFunc() }),
    auth: ({ user }, _a) => {
      const val = auth();
      return { user: val };
    },
    signin: ({ user }, _a, payload) => {
      const val = signin(payload);
      return { user: val };
    }
  }
};

export const { Provider, connect, actions } = createStore(config);
