
import axios from 'axios';
// axios.defaults.headers.common["x-api-key"] = 'live_jrKB6rlgTq7akJYruOO77QVXT4VbLNgI2twIseaYtTPyi1ThxUwBTWno1quNpVIs';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios.get('breeds').then(({ data }) => {
    return data;
  });
}
export function fetchCatByBreed(breedId) {
  return axios.get(`/images/search?breed_ids=${breedId}&api_key=live_jrKB6rlgTq7akJYruOO77QVXT4VbLNgI2twIseaYtTPyi1ThxUwBTWno1quNpVIs
  `).then(({ data }) => {
    return data;
  });
}
