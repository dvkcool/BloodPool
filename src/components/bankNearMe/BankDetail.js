import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View, Image, TouchableOpacity, Dimensions
} from 'react-native';
import { Container, Header, Content, Tab, Tabs,
Left, Right, Title, Body, Button} from 'native-base';
import {
  LineChart
} from 'react-native-chart-kit'
const screenWidth = Dimensions.get('window').width
export default class BankDetail extends Component {
  const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2 // optional, default 3
}
const data = {
  labels: ['A+ve', 'B+ve', 'AB+ve', 'O+','A-ve', 'B-ve', 'AB-ve', 'O-'],
  datasets: [{
    data: [ 20, 45, 28, 80, 10, 11 , 12, 13],
    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` // optional
    strokeWidth: 2 // optional
  }]
}
render(){
  return(
    <View style={{width:'100%', height:'100%'}}>
      <Header>
    <Left>
    <Image
      source={require('../Blood.png')}
      style={{width: 50, height: 50}}
    />
    </Left>
    <Body>
      <Title>Blood Pool</Title>
    </Body>
    <Right/>
  </Header>
  <Text style={{ fontWeight: 'bold', fontSize: 18}}> {this.props.data.name} </Text>
  <LineChart
    data={data}
    width={screenWidth}
    height={220}
    chartConfig={chartConfig}
  />

    </View>
  );

}

}
