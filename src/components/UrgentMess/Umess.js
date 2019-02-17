import React, { Component } from 'react';
import {
  View,
    ScrollView,
    TextInput,
     Dimensions, PixelRatio,
    ImageBackground, Text, AsyncStorage, Alert
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
  sendMessages = async () => {
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
            console.log(obj);
            if(obj.bloodgroup === this.state.bgroup){
              console.log("Yes");
              try {
                fetch('https://fcm.googleapis.com/fcm/send', {
              method: 'POST',
              headers: {
              'Authorization':'key=AAAAvaZx3DQ:APA91bEd6B13TbBTC9voXulF0R7PWGDQdAh8Kn3Rr81snt7ifhqiW0HJYFpZxi8TcM4PvjeDX6MtpztY214n1m-WPBW06phnQK67tQY76iSRtXhxRkb0OQNyZUozTNTYd2q5nvi2dEQ4',
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "to":obj.tokenId,
                "notification":
                {"title":"urgent Blood requirement","body":this.state.phoneNumber},"priority":"high"}),
              }).then((response) => {
                console.log(response);
                Alert.alert("Notification Done");
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
                 onChangeText={val => this.onChangeText('phoneNumber', val)}
               />
               <TextInput
                 placeholder='Blood group'
                 autoCapitalize="none"
                 placeholderTextColor='white'
                 onChangeText={val => this.onChangeText('bgroup', val)}
               />

               <Button block rounded info
                 onPress={() => this.sendMessages()}
               >
               <Text>Submit</Text>
               </Button>
               </View>
               </ImageBackground>
            )
    }
}
