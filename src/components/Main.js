import React from "react";
import LoginPage from "./LoginIndex";
import HomePage from "./home/MainIndex";
import { isSignedIn } from "./auth";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentDidMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    else if(signedIn){
      return <HomePage onLogoutPress={() => this.setState({signedIn: false})} fcm={this.props.fcm}/>;
    }
    else{
      return <LoginPage onLoginPress={() => this.setState({signedIn: true})} fcm={this.props.fcm}/>;
    }
  }
}
