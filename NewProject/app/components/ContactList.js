import React from 'react';
import {AppRegistry, StyleSheet, Text, View } from 'react-native';
import Contacts from 'react-native-contacts';
export default class ContactList extends React.Component {
    
    
  render() {
    return (
        <View style={styles.container}>
            <Text>ContactList</Text>
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

AppRegistry.registerComponent('ContactList', () => ContactList);