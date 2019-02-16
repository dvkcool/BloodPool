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
  componentDidMount() {
   navigator.geolocation.getCurrentPosition(
     (position) => {
       this.setState({
         lat: position.coords.latitude,
         longt: position.coords.longitude,
         error: null,
       });
     },
     (error) => this.setState({ error: error.message }),
     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
   );
}

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  findCoordinates = async () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
                  lat: position.coords.latitude,
                  longt: position.coords.longitude,
                  error: null,
        });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
  signUp = async () => {
    const {phn, password , lat, longt, active, bgroup, addr } = this.state;
    const fcm = await AsyncStorage.getItem('fcmToken');
    await findCoordinates();
    try {
      fetch('https://us-central1-bloodpool-2dfd4.cloudfunctions.net/adduseree', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    phn: phn,
    password: password,
    fcmid: fcm,
    lat: lat,
    longt: longt,
    act: active,
    bgroup: bgroup,
    addr: addr
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
