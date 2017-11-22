import React from 'react';
import { StyleSheet, View, ListView, Modal} from 'react-native';
import { Container, Header, Title, Content, List, ListItem, Button, Right, Body, Icon, Text } from 'native-base';
import { connect } from 'react-redux';
import { deleteCountry } from '../actions/actions';
import SVGImage from 'react-native-svg-image';

import CountryFormView from './countryFormView';

class CountriesView extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      modalVisible: false,
      listViewData: this.props.countries,
    };

    this.setModalVisible = this.setModalVisible.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onModalClose() {
    this.setState({modalVisible: false});
  }

  deleteRow(data, secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.props.countries];
    newData.splice(rowId, 1);

    this.props.dispatchDeleteCountry(data);
  }

  addCountry = () => {
    if (this.state.inputValue === '') return;
    this.props.dispatchAddCountry({
      name: this.state.inputValue,
    });
    this.setState({ inputValue: ''});
  }

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    return (
    <Container>
        <Header>
          <Body>
            <Title>Países visitados</Title>
          </Body>
          <Right>
            <Button
            transparent
            onPress={() => {
                this.setModalVisible(!this.state.modalVisible)
            }}>
              <Icon name='add' />
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={styles.container}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {this.onModalClose()}}
              >
              <CountryFormView onModalClose={this.onModalClose}/>
            </Modal>
            <List
              dataSource={this.ds.cloneWithRows(this.props.countries)}
              renderRow={data =>
                <ListItem avatar>
                  <View style={styles.row}>
                    <View style={styles.rowLeft}>
                      <SVGImage
                        style={{ width: 80, height: 60 }}
                        source={{uri:data.flag}}
                      />
                    </View>
                    <View style={styles.rowRight}>
                      <Body style={styles.rowBody}>
                        <Text>{data.name}</Text>
                        <Text note>{data.startDate} - {data.endDate}</Text>
                      </Body>
                    </View>
                  </View>
                </ListItem>
              }
              renderLeftHiddenRow={data =>
                <View />
              }
              renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                <Button full danger onPress={_ => this.deleteRow(data, secId, rowId, rowMap) }>
                  <Icon active name="trash" />
                </Button>
              }
              rightOpenValue={-75}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex:1,
    flexDirection:'row',
    paddingLeft:10,
    paddingRight:10,
  },
  rowLeft: {
    width: 80,
  },
  rowBody: {
    borderColor:'#FFF',
    borderWidth:0
  },
  rowRight: {
    flex:1,
    flexDirection:'column',
    textAlign:'left',
    alignItems:'flex-start'
  }
});

function mapStateToProps (state) {
  return {
    countries: state.countries.countries
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchDeleteCountry: (country) => dispatch(deleteCountry(country)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CountriesView)
