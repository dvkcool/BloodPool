import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Alert, ListView, Image, ScrollView, TouchableOpacity } from 'react-native'
import {Button } from 'native-base'
var responsejson = require('./responsejson.json');

export default class Allcharges extends PureComponent {
  static title = 'Last 10 transactions'
  state = {
    loading: false,
    buttonclk: false,
    dataSource: '',
  }

  handleCardPayPress = async () => {
                      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                      this.setState({ loading: false,
                       dataSource: ds.cloneWithRows(responsejson.data),});
                     this.setState({ buttonclk: true });
  }

  render() {
    const { loading, token } = this.state

    return (
      <View style={styles.container}>
        <Button
          text="Click to get nearest Blood Banks"
          loading={loading}
          onPress={this.handleCardPayPress}
          {...testID('cardFormButton')}
        />
     <Listcharges press={this.state.buttonclk} data ={this.state.dataSource}/>
      </View>
    )
  }
}

class Listcharges extends PureComponent{
  ListViewItemSeparator = () => {
  return (
    <View
      style={{
        height: 2,
        width: "100%",
        backgroundColor: "#000",
      }}
    />
  );
  }
  GetStatus=(rowData)=>{
    if(rowData.paid){
      Alert.alert("Payment successful", "Payment was successful with\n transaction id: "+ rowData.id);
    }
    else{
      Alert.alert("Payment failed", "Your payment failed as \n"+rowData.failure_message );
    }
  }
  render(){
    if(this.props.press){
      return(
        <View>
	<Text> Click on any transaction to get its details, its failure code etc.</Text>
        <ScrollView>
            <ListView
          dataSource={this.props.data}
          style={{paddingRight: 10,}}
          renderSeparator= {this.ListViewItemSeparator}
          renderRow={(rowData) =>
            <TouchableOpacity onPress={this.GetStatus.bind(this, rowData)} >
            <View style={{borderColor: '#DAFF7F', backgroundColor:'#FFFFFF', padding: 5, paddingTop: 5, paddingLeft: 5}}>
            <Text> Name:  <Text style={{color: '#F73131', size: 20}}>{rowData.name}</Text></Text>
            <Text> Location:  <Text style={{color: '#F73131', size: 20}}>{rowData.loc} {rowData.distance}</Text>
            </Text>
            <Text> Capacity:  {rowData.capacity} </Text>
            </View>
            </TouchableOpacity>
          }
          />
          </ScrollView>
          </View>
      );
    }
    else{
      return(
        <View>
        <Text> </Text>
        </View>
      );
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})
