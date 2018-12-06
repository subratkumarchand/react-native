import React from 'react';
import {AppRegistry, StyleSheet, Text, View } from 'react-native';
import Navigator from './router'
export default class HomeScreen extends React.Component {
  render() {
    return (
     
      <Navigator />
      
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

AppRegistry.registerComponent('HomeScreen', () => HomeScreen);