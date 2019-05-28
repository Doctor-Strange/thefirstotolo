import axios from 'axios';

const DOMAIN = 'https://otoli.net';
const GET_RENTAL_CAR = '/core/rental-car/search-for-rent/get';

export const REQUEST_getCar = (data: IgetCar) => {
  return new Promise((resolve, reject) => {
    let queryString = '';
    if (data.start && data.end) {
      queryString =
        queryString + `&start_date=${data.start}&end_date=${data.end}`;
    }
    axios
      .post(DOMAIN + GET_RENTAL_CAR + '?rental_car_id=' + data.id + queryString)
      .then(response => {
        if (response.data.id) {
          const data = response.data;
          const facilities = [];
          data.facility_set.map((value, index) => {
            facilities.push({
              id: value.id,
              name: value.name.fa
            });
          });
          const media_set = [];
          data.media_set.map((value, index) => media_set.push(value.url));
          resolve({
            year: data.year.name,
            mileage_range: data.mileage_range,
            avg_price_per_day: data.avg_price_per_day,
            owner: data.owner,
            body_style: data.body_style.name,
            color: data.color.name,
            color_code: data.color.code,
            deliver_at_renters_place: data.deliver_at_renters_place,
            cancellation_policy: data.cancellation_policy,
            transmission_type: data.transmission_type.name,
            location: data.location,
            max_km_per_day: data.max_km_per_day,
            description: data.description,
            capacity: data.capacity,
            extra_km_price: data.extra_km_price,
            car: data.car,
            facility_set: facilities,
            loaded: true,
            media_set
          });
        } else {
          reject(false);
        }
      });
  });
};

interface IgetCar {
  start: string;
  end: string;
  id: any;
}
