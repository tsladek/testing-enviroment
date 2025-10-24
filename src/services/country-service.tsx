import axios from 'axios';

import { Country } from '../types/country.type';

const API_BASE_URL = 'https://restcountries.com/v3.1';

export const getCountries = async (status: boolean): Promise<Country[]> => {
  const { data } = await axios.get(`${API_BASE_URL}/independent`, {
    params: { status },
  });
  return data;
};
