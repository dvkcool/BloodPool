import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Alert, ListView, Image, ScrollView, TouchableOpacity, Button } from 'react-native'
import getDirections from 'react-native-google-maps-directions'
var responsejson = require('./responsejson.json');

export default class BNear extends PureComponent {
  static title = 'Last 10 transactions'
  state = {
    loading: false,
    buttonclk: false,
    dataSource: '',
  }

  handleCardPayPress = async () => {
                      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                      this.setState({ loading: false,
                       dataSource: ds.cloneWithRows(responsejson.data),});
                     this.setState({ buttonclk: true });
  }

  render() {
    const { loading, token } = this.state

    return (
      <View style={styles.container}>
        <Button
          title="Click to get nearest Blood Banks"
          onPress={this.handleCardPayPress}
        />
     <Listcharges press={this.state.buttonclk} data ={this.state.dataSource}/>
      </View>
    )
  }
}

class Listcharges extends PureComponent{
  findCoordinates = async (rowData) => {
    console.log(rowData);
    var stlat= '';
    var stlongt= '';
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
                  stlat= position.coords.latitude;
                  stlongt=  position.coords.longitude;
                  const data = {
                     source: {
                      latitude: stlat,
                      longitude: stlongt,
                    },
                    destination: {
                      latitude: rowData.lat,
                      longitude: rowData.longt
                    },
                    params: [
                      {
                        key: "travelmode",
                        value: "driving"        // may be "walking", "bicycling" or "transit" as well
                      },
                      {
                        key: "dir_action",
                        value: "navigate"       // this instantly initializes navigation using the given travel mode
                      }
                    ]
                  }
                  console.log(data);
                  getDirections(data)

      },
      error => Alert.alert(error.message)
    );
  };
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
	<Text> Click on any Blood bank to know more</Text>
        <ScrollView>
            <ListView
          dataSource={this.props.data}
          style={{paddingRight: 10,}}
          renderSeparator= {this.ListViewItemSeparator}
          renderRow={(rowData) =>
            <TouchableOpacity onPress={() => this.findCoordinates(rowData)}>
            <View style={{borderColor: '#DAFF7F', backgroundColor:'#FFFFFF', padding: 5, paddingTop: 5, paddingLeft: 5}}>
            <View><Text> Name:  </Text></View><View><Text style={{color: '#F73131'}}>{rowData.name}</Text></View>
            <View><Text> Location:  </Text></View><View><Text style={{color: '#F73131'}}>{rowData.loc} {rowData.distance}</Text></View>

            <Text> Capacity:  {rowData.capacity} </Text>
            </View>
            </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})
