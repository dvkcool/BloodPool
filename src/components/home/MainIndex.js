import React from "react";
import BNear from "../bankNearMe/BNear";
import Main from "./Main";

export default class MainIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: true,
    };
  }

  render() {

    if(this.state.screen){
      return <Main onLogoutPress= {this.props.onLogoutPress} onBank={() => {
        this.setState({screen: false})
    console.log("Hi")
  }} onCard={() => this.setState({screen: 4})} onEvent={() => this.setState({screen: 2})} onUrgent={() => this.setState({screen: 3})}/>;
    }
    else{
      return <BNear onLogoutPress= {this.props.onLogoutPress} onMain={() => this.setState({screen: 0})} onBank={() => this.setState({screen: 1})} onCard={() => this.setState({screen: 4})} onEvent={() => this.setState({screen: 2})} onUrgent={() => this.setState({screen: 3})}/>;
    }
  }
}
