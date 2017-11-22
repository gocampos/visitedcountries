import Expo from "expo";
import React from 'react';
import CountriesView from './src/containers/countriesView';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false
    };
  }

  async componentWillMount() {
    console.disableYellowBox = true;

    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({ isReady: true });
  }

  render() {

    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
      <CountriesView />
    );
  }
}

export default Main;
