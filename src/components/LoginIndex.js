import React from "react";
import Login from "./Login";
import Signup from "./SignUp";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: true,
    };
  }

  render() {

    if(this.state.screen){
      return <Login onSignUp={() => this.setState({screen: false})} onLoginPress={this.props.onLoginPress} fcm={this.props.fcm}/>;
    }
    else{
      return <Signup onLoginPress={() => this.setState({screen: true})} fcm={this.props.fcm}/>;
    }
  }
}
