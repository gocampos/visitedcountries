// reducers/countries.js

import { AsyncStorage } from 'react-native';
import { ADD_COUNTRY, DELETE_COUNTRY } from '../constants';
import { REHYDRATE } from 'redux-persist/src/constants';

// const initialState = { countries: [{ name: 'Brazil', startDate: '01/10/2017', endDate: '14/10/2017', flag: 'https://restcountries.eu/data/bra.svg' }] }

const initialState = { countries: [] }

export default function countriesReducer(state = initialState, action) {
  switch (action.type) {
    case REHYDRATE:
      return action.payload.countries || initialState;
    case ADD_COUNTRY:
      return {
        countries: [...state.countries, action.country],
      };
    case DELETE_COUNTRY:
      return {
        countries: state.countries.filter(p => p.name !== action.country.name),
      };
    default:
      return state;
  }
}
