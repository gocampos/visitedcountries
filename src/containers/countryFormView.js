import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
import { Container, Header, Title, Content, Toast, Button, List, ListItem, Item, Input, Icon, Text } from 'native-base';
import { connect } from 'react-redux';
import axios from 'react-native-axios';

import CountrySelectDateView from './countrySelectDateView';

class CountryFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      searchedCountries: []
    };
  }

  _onChangeText(query) {
    this.setState({ value: query });

    const url = 'https://restcountries.eu/rest/v2/name/' + query;

    axios.get(url)
    .then((response) => {
      list = (response.data != undefined) ? response.data : [];
      listToShow = (list.length >= 15) ? list.slice(0, 15) : list;
      this.setState({ searchedCountries: listToShow });
    });

  }

  onListItemClicked(item) {
    name = (item.translations && item.translations.pt) ? item.translations.pt : item.name;
    item.name = name;
    this.setState({countrySelected: item, searchedCountries: []});
  }

  renderRow(country) {
    name = (country.translations && country.translations.pt) ? country.translations.pt : country.name;
    return (
      <ListItem>
        <TouchableOpacity onPress={() => this.onListItemClicked(country)}>
          <Text>{name}</Text>
        </TouchableOpacity>
      </ListItem>
    );
  }

  render() {
    if(this.state.countrySelected) {
      return (<CountrySelectDateView country={this.state.countrySelected} onModalClose={this.props.onModalClose} />);
    }

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Digite um país"
              autoCorrect={false}
              onChangeText={(text) => { this._onChangeText(text); }}
            />
          </Item>
          <Button transparent>
            <Text>Buscar</Text>
          </Button>
        </Header>
        <Content>
            <List>
              {
                this.state.searchedCountries && this.state.searchedCountries.length ?
                this.state.searchedCountries.map((country, index) => (
                  this.renderRow(country)
                ))
                : null
              }
            </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20
  }
});

function mapStateToProps (state) {
  return {
    countries: state.countries.countries
  }
}

function mapDispatchToProps (dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CountryFormView)
