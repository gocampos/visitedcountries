// configureStore.js

import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import rootReducer from './reducers'

export default function configureStore() {
  let store = createStore(
    rootReducer,
    {},
    compose(
      applyMiddleware(thunk),
      autoRehydrate()
    )
  );

  persistStore(store, {storage: AsyncStorage, whiteList: ['countries']});

  return store
}
