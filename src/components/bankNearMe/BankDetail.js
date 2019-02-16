import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View, Image, TouchableOpacity
} from 'react-native';
import { Container, Header, Content, Tab, Tabs,
Left, Right, Title, Body, Button} from 'native-base';

export default class BankDetail extends Component {
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

    
    </View>
  );

}

}
