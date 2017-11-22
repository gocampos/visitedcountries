import { AsyncStorage } from 'react-native';
import { ADD_COUNTRY, DELETE_COUNTRY } from '../constants';

export function addCountry(country) {
  return {
    type: 'ADD_COUNTRY',
    country,
  };
}

export function deleteCountry(country) {
  return {
    type: 'DELETE_COUNTRY',
    country,
  };
}
