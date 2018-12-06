import React, { Component } from 'react';
import {AppRegistry, Text, View, StyleSheet, Alert } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';

export default class CodeReader extends Component {
  constructor(props){
    super(props)
    this.state = {
      hasCameraPermission: null
    };
  }
  

  static navigationOptions = {
    title: 'QRCode Reader',
    headerStyle: { backgroundColor: '#5f43a5' },
   headerTitleStyle: { color: '#ffffff' }
  };
  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = data => {
   // Alert.alert(
     // 'Scan successful!',
     // JSON.stringify(data) 
    //);
    this.props.navigation.push('QRCodedata',data);
    
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null ?
          <Text>Requesting for camera permission</Text> :
          this.state.hasCameraPermission === false ?
            <Text>Camera permission is not granted</Text> :
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={{ height: 400, width: 350 }}
            />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  }
});

AppRegistry.registerComponent('CodeReader', ()=> CodeReader);