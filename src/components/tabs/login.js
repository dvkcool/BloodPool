import React, { Component } from 'react';
import {
  View,
    ScrollView,
    TextInput,
     Dimensions, PixelRatio,
    ImageBackground, Text, Alert
} from 'react-native';
import {Button } from 'native-base';
import firebase from 'react-native-firebase';
const { width, height } = Dimensions.get('window');
export default class login extends Component {
  state={
    uid: '',
    password: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  LoginPress = async () => {
    var uid = this.state.uid;
    var pwd = this.state.password;
    if(uid.trim()=="" || uid.length!=10){
      Alert.alert("Please enter Valid user id");
    }
    else{
      if(pwd.trim()==""){
        Alert.alert("Please enter valid password");
      }
      else{
        try {
          fetch('https://us-central1-bloodpool-2dfd4.cloudfunctions.net/checkLogin', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        phoneNumber: uid,
        password: pwd,
        }),
        }).then((response) => {
          console.log(response);
          this.props.onLoginPress();
        })
        .catch((error) => {
          console.error(error);
          Alert.alert("Invalid login");
        });
        } catch (err) {
          console.log('error signing up: ', err)
        }

      }
    }
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
               <View style={{paddingTop:'50%'}}>
                 <TextInput
                   placeholder='Mobile number'
                   autoCapitalize="none"
                   placeholderTextColor='white'
                  keyboardType={'phone-pad'}
                  maxLength = {10}
                   onChangeText={val => this.onChangeText('uid', val)}
                 />
                 <TextInput placeholder='Password' secureTextEntry={true}
                   onChangeText={val => this.onChangeText('paswword', val)/>
                 <View style={{marginTop:100}} />
                       <Button rounded block info onPress={() => this.LoginPress()}>
            <Text>Submit</Text>
          </Button>
               </View>

                  </ImageBackground>
            )
    }
}
