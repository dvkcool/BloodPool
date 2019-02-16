import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

import SignUser from './signup';
import BankReg from './bankreg';

class Screendis extends Component{
  render(){
    if(this.props.screen){
      return(<BankReg onLoginPress={this.props.onLoginPress}/>);
    }
    else{
      return(<SignUser onLoginPress={this.props.onLoginPress}/>);
    }
  }
}
export default class SignUpIndex extends Component {
  constructor(){
    super()
    this.state = {
        screen: 0
    }
    this.onSelect = this.onSelect.bind(this)
}

onSelect(index, value){
    this.setState({
    screen: index
    })
}
  render(){

    return(
      <View>
                <RadioGroup
                    onSelect = {(index, value) => this.onSelect(index, value)}
                >
                    <RadioButton value={'Individual Registration'} >
                        <Text>Individual Registration</Text>
                    </RadioButton>

                    <RadioButton value={'Blood bank registration'}>
                        <Text>Blood bank registration</Text>
                    </RadioButton>

                </RadioGroup>
                <Screendis screen={this.state.screen} onLoginPress={this.props.onLoginPress}/>
</View>
    );
  }
}
