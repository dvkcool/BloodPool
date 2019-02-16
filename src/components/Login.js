import React, { Component } from 'react';
import {
    ScrollView,
    TextInput,
     Dimensions, PixelRatio,
    ImageBackground, Text, View, Image
} from 'react-native';
import { Container, Header, Content, Tab, Tabs,
Left, Right, Title, Body } from 'native-base';
import Tab1 from './tabs/login';
import Tab2 from './tabs/SignUpIndex';

export default class Login extends Component {
  render() {
    return (
      <Container>
        <Header hasTabs>
      <Left>
      <Image
        source={require('./Blood.png')}
        style={{width: 50, height: 50}}
      />
      </Left>
      <Body>
        <Title>Blood Pool</Title>
      </Body>
      <Right />
        </Header>
        <Tabs>
          <Tab heading="Login">
            <Tab1 onLoginPress={this.props.onLoginPress} />
          </Tab>
          <Tab heading="Sign up">
            <Tab2 onLoginPress={this.props.onLoginPress}/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
