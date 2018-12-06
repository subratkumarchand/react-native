import React from 'react';
import {AppRegistry, StyleSheet, Text, View,ScrollView,SafeAreaView,Image } from 'react-native';
import {createDrawerNavigator,DrawerItems} from 'react-navigation';

import  CodeGenerate from './app/components/CodeGenerate';
import HomeScreen from './app/components/HomeScreen';
import UserLogin from './app/components/Login';
import Register from './app/components/Register';
import CodeReader from './app/components/CodeReader';
import Categories from './app/components/Caterories';

export default class App extends React.Component {
  render() {
    return (
     <AppDrawerNavigator />
    );
  }      
}
const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{flex:1}}>
  <View style={styles.container}>
    <Image style={styles.image} source={require('./app/assets/profile-icon.png')} />
  </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)
const AppDrawerNavigator = createDrawerNavigator({
  Home: HomeScreen,
  login: UserLogin,
  Register : Register,
  QRCodeGenerate: CodeGenerate,
  QRCodeScanner: CodeReader,
  Categories: Categories
},{  
  contentComponent:CustomDrawerComponent,
  contentOptions:{
    activeTintColor: '#5f43a5'
  }
})        
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5f43a5',
    alignItems: 'center',
    justifyContent: 'center',
    height:150,
    opacity:0.8
  },
  image:{
    width:120,
    height:120,
    borderRadius:60
  }
});


AppRegistry.registerComponent('App', () => App);