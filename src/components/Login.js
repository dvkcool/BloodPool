import React, { Component } from 'react';
import {
  View,
    ScrollView,
    Text,
    TextInput,
    Button
} from 'react-native';
import firebase from 'react-native-firebase';
export default class Login extends Component {

    render() {
        return (
            <View style={{
              paddingTop: 20,
              width: 200
            }}>
                <Text
                    style={{fontSize: 27}}>
                    Login with Mobile Number
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
            )
    }
}
