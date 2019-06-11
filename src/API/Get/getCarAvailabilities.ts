import axios from 'axios';

const DOMAIN = 'https://core.otoli.net';
const GET_RENTAL_CAR_AVAILABILITIES = '/core/rental-car/availability/list';

export const REQUEST_getCarAvailabilities = (data: IgetCarAvailabilities) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + GET_RENTAL_CAR_AVAILABILITIES,
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
        const output = {};
        if (response.data.success) {
          resolve(response.data.items);
        } else {
          reject(new Error('Error in loading rental car data!'));
        }
      });
  });
};

interface IgetCarAvailabilities {
  token: string;
  id: any;
}
