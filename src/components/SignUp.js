import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  AsyncStorage
} from 'react-native'

export default class SignUp extends React.Component {
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
        try {
          fetch('https://us-central1-bloodpool-2dfd4.cloudfunctions.net/adduseree', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phn: this.state.phn,
        password: this.state.password,
        fcmid: this.state.fcmid,
        lat: this.state.lat,
        longt: this.state.longt,
        act: this.state.active,
        bgroup: this.state.bgroup,
        addr: this.state.addr
      }),
    }).then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
    });
        } catch (err) {
          console.log('error signing up: ', err)
        }
      },
      error => Alert.alert(error.message)
    );
  };
  signUp = async () => {
    const {phn, password , lat, longt, active, bgroup, addr } = this.state;
    const fcm = await AsyncStorage.getItem('fcmToken');
    this.setState({fcmid: fcm});
    await this.findCoordinates();


  }


  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Mobile number'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('phn', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Active-Donor'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('active', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Blood Group'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('bgroup', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Address'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('addr', val)}
        />
        <Button
          title='Sign Up'
          onPress={() => this.signUp()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
