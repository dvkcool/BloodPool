import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert, ListView, Image, ScrollView, TouchableOpacity } from 'react-native'
import QRCode from 'react-native-qrcode-svg';
var user = require('./user.json');
import { Container, Header, Content, Tab, Tabs,
Left, Right, Title, Body, Button} from 'native-base';
class Listcharges extends Component{
  ListViewItemSeparator = () => {
  return (
    <View
      style={{
        height: 2,
        width: "100%",
        backgroundColor: "#000",
      }}
    />
  );
  }
  render(){
    if(this.props.press){
      return(
        <View>
        <ScrollView>
            <ListView
          dataSource={this.props.data}
          style={{paddingRight: 10,}}
          renderSeparator= {this.ListViewItemSeparator}
          renderRow={(rowData) =>
            <View style={{borderColor: '#DAFF7F', backgroundColor:'#FFFFFF', padding: 5, paddingTop: 5, paddingLeft: 5}}>
            <View><Text> Date:  </Text></View><View><Text style={{color: '#F73131'}}>{rowData.date}</Text></View>
            <View><Text> Location:  </Text></View><View><Text style={{color: '#F73131'}}>{rowData.location}</Text></View>

            </View>
          }
          />
          </ScrollView>
          </View>
      );
    }
    else{
      return(
        <View>
        <Text> </Text>
        </View>
      );
    }
  }

}
export default class Donorcard extends Component {
  state={
    dataSource: ''
  }
  componentWillMount(){
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({ loading: false,
       dataSource: ds.cloneWithRows(user.donations),});
     this.setState({ buttonclk: true });

  }
  render(){
    return(
      <View style={{width:'100%', height:'100%'}}>
        <Header>
      <Left>
      <Image
        source={require('../Blood.png')}
        style={{width: 50, height: 50}}
      />
      </Left>
      <Body>
        <Title>Blood Pool</Title>
      </Body>
      <Right>
      <Button block rounded info
                  onPress={this.props.onMain}
              >
              <Text>Back</Text>
            </Button>
            </Right>
    </Header>
    <View style={{width: '100%', height: 200, borderColor: 'black', flexDirection: 'row', borderWidth: 5, marginTop: 50}}>
      <View style={{width: '60%', marginTop: 20}}>
        <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Donor Card</Text>
        <Text> Name : {user.name}</Text>
        <Text> Blood Group: {user.bgroup} </Text>
        <Text> Donations: {user.dn} </Text>
        </View>
        <View style={{width: '30%',  marginTop: 20}}>
        <QRCode
       value={user.phn}/>
       </View>
       </View>
       <Listcharges press={true} data ={this.state.dataSource}/>
      </View>
    );
  }
}
