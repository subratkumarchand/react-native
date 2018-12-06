import React from 'react';
import {AppRegistry, StyleSheet, Text, View } from 'react-native';
//import { createStackNavigator} from 'react-navigation';

export default class QRdata extends React.Component {
    static navigationOptions = {
        title: 'QRCode Data',
        headerStyle: { backgroundColor: '#5f43a5' },
       headerTitleStyle: { color: '#ffffff' }
      };
        
  render() {
    return (
       <View style={styles.container}>
           <Text style={{fontSize:20}}>
           {this.props.navigation.state.params.data}
           </Text>
       </View>
    );
  }      
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('QRdata', () => QRdata);