import axios from 'axios';

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const NEW_CAR_MEDIA = '/core/rental-car/media/new';

export const REQUEST_newCarMedia = (data: InewCarMedia) => {
  return new Promise((resolve, reject) => {
    const { 
        token,
        file
    } = data;
    let form = new FormData();
    form.append('media', file);
    axios
      .post(
        DOMAIN + NEW_CAR_MEDIA,
        form,
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type':
              'application/x-www-form-urlencoded'
          }
        }
      )
      .then(response => {
        if (response.data.success) {
          resolve(response.data);
        }
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

interface InewCarMedia {
  token: string;
  file: any;
}
