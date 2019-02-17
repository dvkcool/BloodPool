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
export default class Umess extends Component {
  state = {
    phoneNumber: '',
    bgroup: '',
    Location: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  sendMessages = async (bgroup) => {
        try {
          fetch('https://us-central1-joined-284fe.cloudfunctions.net/getfcmtoken', {
        method: 'GET',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        }).then((response) => response.json())
        .then((responseJson) => {
          for(var i = 0; i < responseJson.length; i++) {
            var obj = responseJson[i];
            if(obj.bloodgroup == bgroup){
              try {
                fetch('https://fcm.googleapis.com/fcm/send', {
              method: 'POST',
              headers: {
              'Authorization':'AAAAvaZx3DQ:APA91bEd6B13TbBTC9voXulF0R7PWGDQdAh8Kn3Rr81snt7ifhqiW0HJYFpZxi8TcM4PvjeDX6MtpztY214n1m-WPBW06phnQK67tQY76iSRtXhxRkb0OQNyZUozTNTYd2q5nvi2dEQ4',
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "to" : obj.tokenId,
               "data" : {
                  "message" : "Urgent Message",
                  "title" : "This is my data title",
                  "data_type": "direct_message"
              }
              }),
              }).then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.error(error);
              })
              } catch (err) {
                console.log('error signing up: ', err)
              }
            }
        }


        })
        .catch((error) => {
          console.error(error);
        });
        } catch (err) {
          console.log('error signing up: ', err)
        }
  };
  signUp = async (onLoginPress) => {
    const {phn, password , lat, longt, active, bgroup, addr } = this.state;
    const fcm = await AsyncStorage.getItem('fcmToken');
    this.setState({fcmid: fcm});
    await this.findCoordinates();
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
               </ImageBackground>
            )
    }
}
