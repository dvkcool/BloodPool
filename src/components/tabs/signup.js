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
    addr: '',
    age: '',
    name: ''
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
        try {
          fetch('https://us-central1-joined-284fe.cloudfunctions.net/testingadduser', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        name: this.state.name,
        phoneNumber: this.state.phn,
        password: this.state.password,
        fcmId: this.state.fcmid,
        latitude: this.state.lat,
        longitude: this.state.longt,
        active: this.state.active,
        bloodGroup: this.state.bgroup,
        address: this.state.addr,
        age: this.state.age
        }),
        }).then((response) => {
          console.log(response);
          this.props.onLoginPress();
        })
        .catch((error) => {
          console.error(error);
        })
        } catch (err) {
          console.log('error signing up: ', err)
        }
      },
      error => Alert.alert(error.message)
    );
  };
  signUp = async (onLoginPress) => {
    const {phn, password , lat, longt, active, bgroup, addr } = this.state;
    const fcm = await AsyncStorage.getItem('fcmToken');
    this.setState({fcmid: fcm});
    await this.findCoordinates();
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
             <ScrollView>

               <View style={{marginLeft: 50, marginTop: 50, paddingBottom: 50}}>
                 <TextInput
                   placeholder='Name'
                   autoCapitalize="none"
                   placeholderTextColor='white'
                   onChangeText={val => this.onChangeText('name', val)}
                 />
                 <TextInput
                   placeholder='Age'
                   autoCapitalize="none"
                   placeholderTextColor='white'
                  keyboardType={'phone-pad'}
                  maxLength = {3}
                   onChangeText={val => this.onChangeText('age', val)}
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
               <Text>Active-Donor</Text>
               <Picker
                mode="dropdown"
                style={{ width: '80%' }}
                placeholder="Active Donor"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="Willing Donor" value="Willing" />
                <Picker.Item label="Not Willing" value="Not" />
              </Picker>
              <Text>Blood Group</Text>
              <Picker
               mode="dropdown"
               style={{ width: '80%' }}
               placeholder="Blood Group"
               placeholderStyle={{ color: "#bfc6ea" }}
               placeholderIconColor="#007aff"
               onValueChange={this.onValueChange3.bind(this)}
             >
               <Picker.Item label="AB+ve" value="AB+ve" />
               <Picker.Item label="A+ve" value="A+ve" />
               <Picker.Item label="B+ve" value="B+ve" />
               <Picker.Item label="O+ve" value="O+ve" />
               <Picker.Item label="AB-ve" value="AB-ve" />
               <Picker.Item label="A-ve" value="A-ve" />
               <Picker.Item label="B-ve" value="B-ve" />
               <Picker.Item label="O-ve" value="O-ve" />
             </Picker>
               <TextInput
                 placeholder='Address'
                 autoCapitalize="none"
                 placeholderTextColor='white'
                 onChangeText={val => this.onChangeText('addr', val)}
               />
               <Button block rounded info
                 onPress={() => this.signUp()}
               >
               <Text>Submit</Text>
               </Button>
               </View>
               </ScrollView>
               </ImageBackground>
            )
    }
}
