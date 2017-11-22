import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { Container, Header, Title, Content, Toast, Right, Body, Text } from 'native-base';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { addCountry } from '../actions/actions'

class CountrySelectDateView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null
    };

    this.saveCountry = this.saveCountry.bind(this);
  }

  saveCountry() {
    if(this.props.onModalClose) {
      var newCountry = {
        name: this.props.country.name,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        flag: this.props.country.flag
      };

      this.props.dispatchAddCountry(newCountry);

      Toast.show({
        text: name + ' adicionado em seus países',
        position: 'bottom',
        buttonText: 'Ok',
        type: 'success'
      });

      this.props.onModalClose();
    }
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>{this.props.country.name}</Title>
          </Body>
          <Right>
              <TouchableOpacity
              onPress={() => { this.saveCountry(); }}>
                <Text>Salvar</Text>
              </TouchableOpacity>
          </Right>
        </Header>
        <View style={styles.fieldDateRow}>
          <DatePicker
            style={styles.fieldDate}
            date={this.state.startDate}
            mode="date"
            placeholder="Data de Partida"
            format="DD/MM/YYYY"
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={(date) => {this.setState({startDate: date})}}
          />
          <DatePicker
            style={styles.fieldDate}
            date={this.state.endDate}
            mode="date"
            placeholder="Data de Retorno"
            format="DD/MM/YYYY"
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={(date) => {this.setState({endDate: date})}}
          />
        </View>
      </Container>
    );
  }
}

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20
  },
  fieldDateRow: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'column',
  },
  fieldDate: {
    marginBottom:20,
    width:window.width*0.6
  },
});

function mapStateToProps (state) {
  return {
    countries: state.countries.countries
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchAddCountry: (country) => dispatch(addCountry(country))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CountrySelectDateView);
