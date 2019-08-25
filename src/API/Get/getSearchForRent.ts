import axios from 'axios';

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_SEARCH_FOR_RENT = '/core/rental-car/search-for-rent/list';

export const REQUEST_getSearchForRent = (data: IgetSearchForRent) => {
  return new Promise((resolve, reject) => {
    //console.log("let's search", data);
    let queryString;
    if (data.result_key) {
      queryString = 'result_key=' + data.result_key;
    } else {
      queryString = data.queryString;
    }
    axios
      .post(
        DOMAIN +
          GET_SEARCH_FOR_RENT +
          ('?limit=' + data.limit + '&page=' + data.page) +
          ('&' + queryString)
      )
      .then(response => {
        if (response.data.success) {
          //console.log(response.data.items[1]);
          const results = response.data.items.map((value, index) => ({
            key: value.index,
            id: value.id,
            avg_price_per_day: value.avg_price_per_day,
            discount_percent: value.discount_percent,
            avg_discounted_price_per_day: value.avg_discounted_price_per_day,
            body_style: value.body_style,
            cancellation_policy: value.cancellation_policy,
            capacity: value.capacity,
            car: value.car,
            color: value.color,
            deliver_at_renters_place: value.deliver_at_renters_place,
            description: value.description,
            extra_km_price: value.extra_km_price,
            location: value.location,
            max_km_per_day: value.max_km_per_day,
            media_set: value.media_set,
            mileage_range: value.mileage_range,
            min_days_to_rent: value.min_days_to_rent,
            no_of_days: value.no_of_days,
            owner: value.owner,
            total_price: value.total_price,
            transmission_type: value.transmission_type,
            year: value.year,
            search_id: value.search_id,
            is_out_of_service: value.is_out_of_service
          }));
          if (results === undefined || results.length == 0) {
            resolve({
              results: [],
              loadingResults: false,
              noResult: true,
              lodingMore: false
            });
          } else {
            let statsObj = {};
            if (data.page <= 1 && !data.result_key) {
              const stats = response.data.extra_info.stats;
              const body_style_stats = stats.body_style_set.map(
                (value, index) => ({
                  id: value.id,
                  count: value.count
                })
              );
              statsObj = {
                stats: {
                  body_style_set: body_style_stats,
                  deliver_at_renters_place: stats.deliver_at_renters_place
                }
              };
            }
            resolve({
              results,
              loadingResults: false,
              noResult: false,
              lodingMore: false,
              latest_result_key: response.data.result_key,
              total_count: response.data.total_count,
              ...statsObj
            });
          }
        }
      });
  });
};

interface IgetSearchForRent {
  limit: number;
  page: number;
  queryString?: string;
  result_key?: string;
}
