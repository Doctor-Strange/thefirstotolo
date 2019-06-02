import axios from 'axios';

const DOMAIN = 'https://otoli.net';
const SET_ORDER_CANCEL = '/core/rental-car/order/cancel';
const SET_ORDER_APPROVE = '/core/rental-car/order/approve';
const SET_ORDER_REJECT = '/core/rental-car/order/reject';
const SET_ORDER_PAY = '/core/rental-car/order/pay';
const SET_ORDER_TAHVIL = '';
const SET_ORDER_BAZTAHVIL = '';
const SET_ORDER_RATE = '';

export const REQUEST_setOrderStatus = (data: InewRentRequest) => {
  return new Promise((resolve, reject) => {
    let ACTION_URL;
    switch (data.action) {
      case 'approve':
        ACTION_URL = SET_ORDER_APPROVE;
        break;
      case 'reject':
        ACTION_URL = SET_ORDER_REJECT;
        break;
      case 'cancel':
        ACTION_URL = SET_ORDER_CANCEL;
        break;
      case 'pay':
        ACTION_URL = SET_ORDER_PAY;
        break;
    }
    axios
      .post(
        DOMAIN + ACTION_URL,
        {
          id: data.id
        },
        {
          headers: {
            Authorization: 'Bearer ' + data.token
          }
        }
      )
      .then(response => {
        if (response.data.success) {
          resolve(response.data);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

interface InewRentRequest {
  id: string;
  action: 'approve' | 'reject' | 'pay' | 'cancel';
  token: string;
}
