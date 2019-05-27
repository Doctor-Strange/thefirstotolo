import jsCookie from 'js-cookie';

export const auth = () => {
  const out: Iuser = {
    token: jsCookie.get('token'),
    phone: jsCookie.get('phone'),
    complete_register: jsCookie.get('complete_register'),
    first_name: jsCookie.get('first_name'),
    last_name: jsCookie.get('last_name')
  };
  if (out.token) return out;
  else return false;
};

export const signin = (authData: Iuser) => {
  console.log(authData);
  jsCookie.set('token', authData.token);
  jsCookie.set('phone', authData.phone);
  if (authData.complete_register) {
    jsCookie.set('complete_register', authData.complete_register);
  }
  if (authData.first_name) jsCookie.set('first_name', authData.first_name);
  if (authData.last_name) jsCookie.set('last_name', authData.last_name);
  console.log('return', authData);
  return authData;
};

interface Iuser {
  token: string;
  phone: string;
  complete_register?: any;
  first_name?: string;
  last_name?: string;
}
