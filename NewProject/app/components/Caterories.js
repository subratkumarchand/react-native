import React, {Component} from 'react';
import {AppRegistry, StyleSheet,FlatList, Text, View, Image,ScrollView,Platform,TouchableOpacity} from 'react-native';
import {Card,CardImage, CardTitle, CardContent, CardAction} from 'react-native-card-view';
import Button from 'react-native-button';

import Icon from 'react-native-vector-icons/FontAwesome'; // 5.0.0
const plus=(<Icon name="plus-circle" size={80} color="orange" />);

import Modal from 'react-native-modal'; // 2.4.0

export default class Categories extends Component {

  state = {
    visibleModal: null,
  }

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text >{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderModalContent = (item,modal) => (
    <View onPress={modal}>
    <View style={styles.modalContent}>
      <Text>{item} </Text>
      {this._renderButton('Close', () => this.setState({ visibleModal: null }))}
    </View>
    </View>
  );


  constructor(props) {
    super(props);
    this.state = {
      GridViewItems: []
    }
  }

componentWillMount(){
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(json => {this.setState({GridViewItems:json})})
}

GetGridViewItem (item) {
  
 Alert.alert(item);
 
 }


 static navigationOptions = {
  title: 'UserList',
  headerStyle: { backgroundColor: '#5f43a5' },
 headerTitleStyle: { color: '#ffffff' }
};


  
  render() {
   // let images = this.state.data.map(function (item) {
      return (
       
        <ScrollView>
      <View>
         <Text style={styles.title}>Popular Selling </Text>
      
        <View style={styles.MainContainer}>

      <FlatList
       data={ this.state.GridViewItems }

         renderItem={({item}) =>
       <Card style={styles.GridViewBlockStyle}>
        <CardImage key={item.url}>
        <TouchableOpacity >
          <Image 
          style={styles.imagewrap}
          source={{uri: "https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg"}} 
        />
        </TouchableOpacity>
        </CardImage>
        <CardTitle  key={item.username}> 
         <View><Text>{item.username}</Text></View>
          {/* <View>{this._renderButton("ViewMore", () => this.setState({ visibleModal: 1 }))}</View> */}
        </CardTitle>
        <CardContent key={item.name}>
          <View>
            <Text>Name: {item.name}</Text>
            <Text>Email: {item.email}</Text>
          </View>
        </CardContent>
        <CardAction key={item.id}>
        <Button
            style={styles.button} onPress={this._renderModalContent(item,  () => this.setState({ visibleModal: 1 }))}>
            <Text>ViewMore</Text>
          </Button>
        </CardAction>
      </Card>
         }
         numColumns={2}

        />
         
        <Modal isVisible={this.state.visibleModal === 1}>
          {this._renderModalContent()}
        </Modal>

        <TouchableOpacity onPress={()=> alert('Add new products')}>
        {plus}
        </TouchableOpacity>
</View>
</View>
      </ScrollView> 
      );
   
    // return (
    //   <ScrollView>
    //   <View>
    //      <Text style={styles.title}>Popular Selling </Text>
    //      {images}
    //      {plus} 
    //   </View>
    //   </ScrollView> 
    // );
  }
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  flexDirection: 'column',
  flexWrap: 'wrap',
  backgroundColor: '#eee',
    
  },
  title: {
    paddingTop: 30,
    fontSize: 30,
    marginLeft:10,
    flexDirection:'row'   
  },
  image:{
    flex:1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    flexWrap:'wrap'
  },
  imagewrap: {
   // margin: 2,
    //padding: 20,
   // paddingVertical: 10,
    height: 150,
    width: 150
   // backgroundColor: '#fff',
  },
  MainContainer :{

    justifyContent: 'center',
    flex:1,
    margin: 10,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0
    
    },
    
    GridViewBlockStyle: {
    
      //justifyContent: 'center',
      flex:1,
      textDecorationLine: 'underline'
     // alignItems: 'center',
      //height: 175,
      //margin: 5
     
    
    },
    GridViewInsideTextItemStyle: {
    
       color: '#fff',
       padding: 10,
       fontSize: 18,
       justifyContent: 'center',
       
     },
     modalContent: {
      backgroundColor: 'white',
      padding: 12,
      justifyContent: 'center',
      alignItems: 'center',
      // borderRadius: 2,
      // borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    button: {
      backgroundColor: '#5f43a5',
      padding: 15,
      color: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 16,
    },
});
AppRegistry.registerComponent('Categories',() => Categories); 