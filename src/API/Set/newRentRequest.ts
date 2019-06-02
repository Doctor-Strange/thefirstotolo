import axios from 'axios';

const DOMAIN = 'https://otoli.net';
const GET_FACTORY_BRANDS = '/core/rental-car/rent-request/new';

export const REQUEST_newRentRequest = (data: InewRentRequest) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + GET_FACTORY_BRANDS,
        {
          search_id: data.search_id
        },
        {
          headers: {
            Authorization: 'Bearer ' + data.token
          }
        }
      )
      .then(response => {
        if (response.data.success) {
          resolve(response.data.success);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

interface InewRentRequest {
  token: string;
  search_id: string;
}