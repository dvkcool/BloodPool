import React, { Component } from 'react';
import {
  View,
    ScrollView,
    TextInput,
     Dimensions, PixelRatio,
    ImageBackground, Text
} from 'react-native';
import {Button } from 'native-base';
import firebase from 'react-native-firebase';
const { width, height } = Dimensions.get('window');
export default class login extends Component {

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
                 <TextInput placeholder='Username' />
                 <TextInput placeholder='Password' secureTextEntry={true} />
                 <View style={{marginTop:100}} />
                       <Button rounded block info onPress={() => this.props.onLoginPress()}>
            <Text>Submit</Text>
          </Button>
               </View>

                  </ImageBackground>
            )
    }
}
