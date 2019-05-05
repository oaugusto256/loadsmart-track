import axios from 'axios';

const api = 'https://loadsmart-coding-test-frontend.herokuapp.com';

export const getShipments = () => {
  return axios.get(`${api}/json/shipments.json`).then(result => {
    return result.data;
  });
};
