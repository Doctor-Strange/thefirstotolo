import axios from 'axios';

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const SET_USER_IMAGE = '/core/user/set-image';

export const REQUEST_setUserImage = (data: IsetUSerImage) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + SET_USER_IMAGE,
        {
          image: data.image
        },
        {
          headers: {
            Authorization: 'Bearer ' + data.token,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      .then(response => {
        if (response.data.success) {
          resolve(response.data.success);
        }
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

interface IsetUSerImage{
  token: string;
  image: any;
}
