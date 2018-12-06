import React from 'react';
import {AppRegistry, StyleSheet, Text, View,TextInput,TouchableOpacity,ScrollView} from 'react-native';
import QRCode from 'react-native-qrcode';
export default class CodeGenerate extends React.Component {

  constructor(props){
    super(props);
    this.state={
      Text_Holder_1 : '',
      Text_Holder_2 : 'Hello world'
    }
  }

  static navigationOptions = {
    title: 'QRCode Generator',
    headerStyle: { backgroundColor: '#5f43a5' },
   headerTitleStyle: { color: '#ffffff' }
  };

  getTextInputValue=()=>{
    this.setState({Text_Holder_2 : this.state.Text_Holder_1});
    this.setState({ Text_Holder_1 : ''});

  }
  QRreader = () => {
    this.props.navigation.navigation('QRCodeScanner');   
  }
  render() {
    return (
      <ScrollView>
      <View style={styles.MainContainer}>
        <TextInput
          style={styles.TextInputStyle}
          value={this.state.Text_Holder_1}
          onChangeText={(text) => this.setState({Text_Holder_1: text})}
          underlineColorAndroid = "transparent" 
          placeholder="Enter Value to Generate QR Code"
        />
        <TouchableOpacity onPress={this.getTextInputValue} activeOpacity={0.7} style={styles.button} >
        <Text style={styles.TextStyle}>Generate QR Code </Text>
        </TouchableOpacity>
        <QRCode
          value={this.state.Text_Holder_2}
          size={250}
          bgColor='#000'
          fgColor='#fff'/>

        {/* <TouchableOpacity onPress={this.QRreader} activeOpacity={0.7} style={styles.QRCode} >
        <Text style={styles.TextStyle}>QRCode Reader</Text>
        </TouchableOpacity> */}
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {

    flex: 1,
    margin: 10,
    alignItems: 'center',
    paddingTop: 20
  
  },
  QRCode : {
    marginTop: 30,
    width: '100%',
    paddingTop:8,
    paddingBottom:8,
    backgroundColor: '#5f43a5',
    borderRadius:7
  },
  TextInputStyle: {

    width: '100%',
    height: 40,
     marginBottom: 10,
     borderWidth: 1,
     borderColor: '#5f43a5',
    // textAlign: 'center'
    padding:10
    
  },

  button: {
    
    width: '100%',
    paddingTop:8,
    paddingBottom:8,
    backgroundColor: '#5f43a5',
    borderRadius:7,
    marginBottom: 20
  },

  TextStyle:{
    color:'#fff',
    textAlign:'center',
    fontSize: 18
}
  
});


AppRegistry.registerComponent('CodeGenerate', () => CodeGenerate);