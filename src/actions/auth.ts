import jsCookie from 'js-cookie';

export const auth = () => {
  const out: Iuser = {
    token: jsCookie.get('token'),
    phone: jsCookie.get('phone'),
    complete_register: jsCookie.get('complete_register'),
    first_name: jsCookie.get('first_name'),
    last_name: jsCookie.get('last_name'),
    user_id: jsCookie.get('user_id')
  };
  if (out.token) return out;
  else return false;
};

export const signin = (authData: Iuser) => {
  jsCookie.set('token', authData.token);
  jsCookie.set('phone', authData.phone);
  if (authData.complete_register) {
    jsCookie.set('', authData.complete_register);
  }
  if (authData.first_name) jsCookie.set('first_name', authData.first_name);
  if (authData.last_name) jsCookie.set('last_name', authData.last_name);
  if (authData.user_id) jsCookie.set('user_id', authData.user_id);
  return authData;
};

export const completeRegister = (user: IuserNames) => {
  jsCookie.set('first_name', user.first_name);
  jsCookie.set('last_name', user.last_name);
  jsCookie.set('complete_register', user.complete_register);
  return user;
};

interface IuserNames {
  first_name: string;
  last_name: string;
  complete_register?: boolean;
}

interface Iuser {
  token: string;
  phone: string;
  complete_register?: boolean;
  first_name?: string;
  last_name?: string;
  user_id?: number;
}
