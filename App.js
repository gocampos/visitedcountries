import React from 'react';
import { StatusBar } from 'react-native';
import { Root } from "native-base";
import { Provider } from 'react-redux';
import configureStore from './src/configureStore';
import Main from './main';

const store = configureStore();

export default class App extends React.Component {

  componentWillMount() {
    StatusBar.setHidden(true);
  }

  render() {
    return (
      <Provider store={store}>
       <Root>
         <Main />
       </Root>
     </Provider>
    );
  }
}
