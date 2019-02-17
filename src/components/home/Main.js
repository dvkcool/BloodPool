import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View, Image, TouchableOpacity
} from 'react-native';
import { Container, Header, Content, Tab, Tabs,
Left, Right, Title, Body, Button} from 'native-base';

var user = require('./user.json');
export default class Main extends Component {
    render() {
        return (
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
          <Right>
            <Button block rounded info
                        onPress={this.props.onLogoutPress}
                    >
                    <Text>Logout</Text>
                  </Button>
          </Right>
        </Header>
        <Text style={{ fontWeight: 'bold', fontSize: 18}}>Welcome {user.name} </Text>
            <Image
              source={require('../user.png')}
              style={{width: 150, height: 150, borderRadius: 75, marginLeft: '30%'}}
            />
          <Text style={{marginLeft: '30%', fontWeight: 'bold', fontSize: 16}}> Donations made: {user.donationsMade} </Text>
            <View style={{height: 200, width: '100%', flexDirection: 'row', marginTop: 50}}>
              <TouchableOpacity style={{height: 200, width: '50%'}} onPress={() => this.props.onBank()}>
                <View style={{height: 200, width: '50%'}}>
                  <Image
                    source={require('../bank.png')}
                    style={{width: 150, height: 150, borderRadius: 75, marginLeft: 10}}
                  />
                <Text style={{ marginLeft: 10}}>Blood Banks Nearby Me</Text>
                </View>
              </TouchableOpacity>

              <View style={{height: 200, width: '50%'}}>
                <Image
                  source={require('../events.png')}
                  style={{width: 150, height: 150, borderRadius: 75, marginLeft: 10}}
                />
              <Text style={{ marginLeft: 30}}>Upcoming Events</Text>
              </View>
            </View>
            <View style={{height: 200, width: '100%', flexDirection: 'row', marginTop: 20}}>
              <View style={{height: 200, width: '50%'}}>
                <Image
                  source={require('../urgent.png')}
                  style={{width: 150, height: 150, borderRadius: 75, marginLeft: 10}}
                />
              <Text style={{ marginLeft: 30}}>Urgent Requirements</Text>
              </View>
              <TouchableOpacity style={{height: 200, width: '50%'}} onPress={() => this.props.onCard()}>
              <View style={{height: 200, width: '50%'}}>
                <Image
                  source={require('../donorcard.png')}
                  style={{width: 150, height: 150, borderRadius: 75, marginLeft: 10}}
                />
              <Text style={{ marginLeft: 30}}>Donor Card</Text>
              </View>
            </TouchableOpacity>

            </View>
          </View>
                )
    }
}
