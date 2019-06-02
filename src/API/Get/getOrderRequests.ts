import axios from 'axios';

const DOMAIN = 'https://otoli.net';
const GET_ORDER_REQUESTS = '/core/rental-car/order/list';

export const REQUEST_getOrderRequests = (data: IgetOrderRequests) => {
  return new Promise((resolve, reject) => {
    axios
      .post(DOMAIN + GET_ORDER_REQUESTS, null, {
        headers: {
          Authorization: 'Bearer ' + data.token
        }
      })
      .then(response => {
        if (response.data.success) {
          resolve(response.data);
        }
      });
  });
};

interface IgetOrderRequests {
  token: string;
}