import React, { Component } from 'react';
import {
  View,
    ScrollView,
    TextInput,
     Dimensions, PixelRatio,
    ImageBackground, Text, AsyncStorage
} from 'react-native';
import {Button, Picker, Item } from 'native-base';
import firebase from 'react-native-firebase';
const { width, height } = Dimensions.get('window');
export default class signup extends Component {
  state = {
    phn: '',
    password: '',
    fcmid: '',
    lat: '',
    longt: '',
    active: '',
    bgroup: '',
    addr: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  findCoordinates = async () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.setState({
                  lat: position.coords.latitude,
                  longt: position.coords.longitude,
                  error: null,
        });
      },
      error => Alert.alert(error.message)
    );
  };
  signUp = async (onLoginPress) => {
    const {phn, password , lat, longt, active, bgroup, addr } = this.state;
    const fcm = await AsyncStorage.getItem('fcmToken');
    this.setState({fcmid: fcm});
    await this.findCoordinates();
    this.props.onLoginPress();


  }
  onValueChange2(value: string) {
  this.setState({
    act: value
  });
}
onValueChange3(value: string) {
this.setState({
  bgroup: value
});
}

    render() {
        return (
            <ImageBackground
              style={{
                  width: '100%',
                  height: '100%',
                }
                }
               source={require('../wallpaper.png')}>
               <View style={{marginLeft: 50, marginTop: 50}}>
               <TextInput
                 placeholder='Name'
                 autoCapitalize="none"
                 placeholderTextColor='white'
                 onChangeText={val => this.onChangeText('name', val)}
               />
               <TextInput
                 placeholder='Address'
                 autoCapitalize="none"
                 placeholderTextColor='white'
                 onChangeText={val => this.onChangeText('addr', val)}
               />
               <TextInput
                 placeholder='Manager'
                 autoCapitalize="none"
                 placeholderTextColor='white'
                 onChangeText={val => this.onChangeText('mgr', val)}
               />
               <TextInput
                 placeholder='Mobile number'
                 autoCapitalize="none"
                 placeholderTextColor='white'
                keyboardType={'phone-pad'}
                maxLength = {10}
                 onChangeText={val => this.onChangeText('phn', val)}
               />
               <TextInput
                 placeholder='Password'
                 secureTextEntry={true}
                 autoCapitalize="none"
                 placeholderTextColor='white'
                 onChangeText={val => this.onChangeText('password', val)}
               />
               <TextInput
                 placeholder='Total Capacity'
                 autoCapitalize="none"
                 placeholderTextColor='white'
                keyboardType={'phone-pad'}
                maxLength = {5}
                 onChangeText={val => this.onChangeText('cap', val)}
               />


               <Button block rounded info
                 onPress={() => this.signUp()}
               >
               <Text>Submit</Text>
               </Button>
               </View>


                  </ImageBackground>
            )
    }
}
