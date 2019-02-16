import React, { Component } from 'react';
import {
  View,
    ScrollView,
    TextInput,
     Dimensions, PixelRatio,
    ImageBackground
} from 'react-native';
import {
  Container,
  Header,
  Button,
  Text,
  Body,
  Form,
  Item as FormItem,
  Input,
  Label,
  Title,
} from 'native-base';
import firebase from 'react-native-firebase';
const { width, height } = Dimensions.get('window');
export default class Login extends Component {

    render() {
        return (
            <ImageBackground
              style={{
                  width: '100%',
                  height: '100%',
                  flex: 1
                }
                }
               source={require('./wallpaper.png')}>
               <View style={{paddingTop:'50%'}}>
                 <Text
                     style={{fontSize: 27}}>
                     Login
                 </Text>
                 <TextInput placeholder='Username' />
                 <TextInput placeholder='Password' />
                 <View style={{margin:7}} />
                 <Button
                           onPress={this.props.onLoginPress}
                           title="Submit"
                       />
                       <Button
                                 onPress={this.props.onSignUp}
                                 title="SignUp"
                             />
               </View>

                  </ImageBackground>
            )
    }
}
