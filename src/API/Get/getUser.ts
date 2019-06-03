import axios from 'axios';

const DOMAIN = 'https://otoli.net';
const GET_USER = '/core/user/info';

export const REQUEST_getUser = (data: IgetUser) => {
  return new Promise((resolve, reject) => {
    axios
      .post(DOMAIN + GET_USER + '?id=' + data.id)
      .then(response => {
        if (response.data.success) {
          resolve(response.data.data);
        } else {
          reject(false);
        }
      })
      .catch(err => {
        console.warn('prifle request filed: ', err.message);
      });
  });
};

interface IgetUser {
  id: string;
}
