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
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: '',
      codeInput: '',
      phoneNumber: '',//'+91',
      confirmResult: null,
    };
  }

  componentDidMount() {
    // debugger;
    console.log('test')
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.toJSON() });
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          message: '',
          codeInput: '',
          phoneNumber:'' ,//'+91',
          confirmResult: null,
        });
      }
    });
  }
  signIn = () => {
  this.setState({ message: 'Sending code ...' });
  console.log('signInWithPhoneNumber');
  var phno=this.state.phoneNumber.toString();
  console.log(phno);
  console.log('ph:'+phno);


   firebase.auth().verifyPhoneNumber(phno,60, true) //'com.login_demo_2'
    .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
    .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
};
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
                <TextInput
                  autoFocus
                  style={{ height: 40, marginTop: 15, marginBottom: 15 }}
                  value={this.state.phoneNumber}
                  onChangeText={value => this.setState({ phoneNumber: value })}
                  placeholder={'Phone number ... '}

                    />
                    <Button title="Sign In" color="green" onPress={this.signIn} />
                <Button
                          onPress={this.props.onLoginPress}
                          title="Submit"
                      />
                  </View>
            )
    }
}
