import React, {Component} from 'react';
import { AppRegistry, StyleSheet,TextInput,Text,ScrollView,View,TouchableOpacity , Alert ,Button,Linking} from 'react-native';
import { TextField } from 'react-native-material-textfield';

import Icon from 'react-native-vector-icons/FontAwesome'
const myIcon = (<Icon name="facebook" size={25} style={{color: 'steelblue'}}/> )
const myIcon1 = (<Icon name="twitter" size={25} style={{color: 'turquoise'}}/> )
const myIcon2 = (<Icon name="google-plus" size={25} style={{color: 'red'}}/> )

import { RaisedTextButton } from 'react-native-material-buttons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';


console.disableYellowBox = true;
export default class UserLogin extends React.Component {
    
    constructor(props){
        super(props);
       
		this.onFocus = this.onFocus.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onChangeText = this.onChangeText.bind(this);
		this.onSubmitEmail = this.onSubmitEmail.bind(this);
      this.onSubmitPassword = this.onSubmitPassword.bind(this);
      this.onAccessoryPress = this.onAccessoryPress.bind(this);

      this.emailRef = this.updateRef.bind(this, 'email');
      this.passwordRef = this.updateRef.bind(this, 'password');

     this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

        this.state = {
            email:'',
            password:'',
            secureTextEntry: true,              
        };    
    }

    static navigationOptions = {
        title: 'Login Here',
        headerStyle: { backgroundColor: '#5f43a5' },
       headerTitleStyle: { color: '#ffffff' }
      };
     
      
      onSubmit = () =>{ 
        //alert("you have entered \n emailId : " + this.state.emailId + "\n password :" + this.state.password);
        //this.props.navigation.push('Category');
        let emailId = this.state.email;
        let password = this.state.password;
        if(emailId && password){
            fetch('https://jsonplaceholder.typicode.com/users')       
            .then(function(response) {  
            return response.json();
            })
            .then(function(data) {
               // console.log(JSON.stringify(data));
            let email = data.find(x =>x.email == emailId);
            let userName = data.find(x => x.username == password);
             if(email && userName){
				alert('ok');
                   // this.props.navigation.push('Categories')
            }else {
                 alert('please enter correct details');
                
             }
            });
            // if(password){
            //     this.props.navigation.push('Categories')
            //  }else{
            //     Alert.alert(
            //         'Please enter valid password'
            //     ) 
            //  }
        }else {
            Alert.alert(
                'Please enter email Id'
            );
        }
        }
    
    onFocus() {
        let { errors = {} } = this.state;
  
        for (let name in errors) {
          let ref = this[name];
  
          if (ref && ref.isFocused()) {
            delete errors[name];
          }
        }
  
        this.setState({ errors });
      }

      onChangeText(text) {
        ['email', 'password']
          .map((name) => ({ name, ref: this[name] }))
          .forEach(({ name, ref }) => {
            if (ref.isFocused()) {
              this.setState({ [name]: text });
            }
          });
      }

      onAccessoryPress() {
        this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
      }

      onSubmitEmail() {
        this.password.focus();
      }
  
      onSubmitPassword() {
        this.password.blur();
      }
    updateRef(name, ref) {
        this[name] = ref;
      }

      renderPasswordAccessory() {
        let { secureTextEntry } = this.state;
  
        let name = secureTextEntry?
          'visibility':
          'visibility-off';
  
        return (
          <MaterialIcon
            size={24}
            name={name}
            color={TextField.defaultProps.baseColor}
            onPress={this.onAccessoryPress}
            suppressHighlighting
          />
        );
      }

  render() { 
    let { errors = {}, secureTextEntry, ...data } = this.state;

    //  let defaultEmail = `foo@gmail.com`
    //  .replace(/\s+/g, '_')
    //  .toLowerCase();

    return (
        <ScrollView>
        <View style={styles.container}>
         <Text style={styles.title}>Login into your account </Text>
         <View style={styles.Formcontainer}>
         <TextField
         ref={this.emailRef}
         value={data.email}
        //  defaultValue={defaultEmail}
         keyboardType='email-address'
         autoCapitalize='none'
         autoCorrect={false}
         enablesReturnKeyAutomatically={true}
         onFocus={this.onFocus}
         onChangeText={this.onChangeText}
         onSubmitEditing={this.onSubmitEmail}
         returnKeyType='next'
         label='Email Address'
         error={errors.email}
      />
      <TextField
         ref={this.passwordRef}
         value={data.password}
         secureTextEntry={secureTextEntry}
         autoCapitalize='none'
         autoCorrect={false}
         enablesReturnKeyAutomatically={true}
         onFocus={this.onFocus}
         onChangeText={this.onChangeText}
         onSubmitEditing={this.onSubmitPassword}
         returnKeyType='done'
         label='Password'
         error={errors.password}
         //title='Choose wisely'
         maxLength={20}
         characterRestriction={10}
        renderAccessory={this.renderPasswordAccessory}
      />
         </View>
         <View style={styles.buttonContainer}>
         {/* <Button color="#5f43a5" onPress={this.login} title={'Login'}/> */}
         <RaisedTextButton onPress={this.onSubmit} title='LOGIN' color={TextField.defaultProps.tintColor} titleColor='white' />
         </View>
         <View style={styles.createContainer}> 
            <TouchableOpacity onPress={() => this.props.navigation.push('Register')} style={styles.create}> 
             <Text >Create an account?</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => this.props.navigation.push('Register')} style={styles.forgot}> 
            <Text>Forgot password?</Text>
            </TouchableOpacity>
        </View>
        <Button color="#5f43a5" onPress={() => this.props.navigation.push('QRCodeScanner')} title={'QR Code Scan'}/>
         <View>
         <Text style={styles.connect}>Or connect with</Text>
         </View>
        <View style={styles.site}>
        {myIcon}<Text onPress={() =>Linking.openURL('https://en-gb.facebook.com/login/')}>Facebook</Text>
        </View>
        <View style={styles.site1}>
         {myIcon1}<Text onPress={() =>Linking.openURL('https://twitter.com/login?lang=en')}>Twitter</Text>
         </View>
         <View style={styles.site2}>
         {myIcon2}<Text onPress={() =>Linking.openURL('https://plus.google.com/people')}>Google Plus</Text> 
        </View>
        </View> 
        </ScrollView>
    );

  }
}

const styles = StyleSheet.create({
    container: {
       flex:1, 
    },
    Formcontainer:{

        marginHorizontal:10
    },
    title:{

        paddingTop: 20,
        fontSize:28,
        marginLeft:10,
        fontWeight:'bold',
        // fontFamily:'Arial',
    },
    // inputContainer:{

    //     // height : 60,
    //    // paddingTop:20,
    //     paddingHorizontal:10,
    //     marginBottom:10,
    //     flex:1
    // },
    // input: {
    //     height:60,
    //     borderColor: 'grey',
    //     borderWidth: 1
    // },
    buttonContainer:{

       // backgroundColor:'orange',
        //alignSelf:'center',
       // alignItems:'center', 
       // padding:20,
       //width:300,
       //height:60,
       //borderColor:'black',
       //justifyContent:'center',
      marginHorizontal:10,
      marginVertical:20
    },
    createContainer:{

        flex: 1, 
        flexDirection: 'row',       
       //justifyContent: 'space-between',
        marginVertical: 20,
        marginHorizontal:20
     
    },
    // forgotContainer:{

    //     flex:1,
    //     flexDirection:'row',
    //     alignItems:'center',
    //     marginVertical: 20
    // },
    create:{

       alignSelf:'flex-start',
       flexDirection:'column',
      
    },
    forgot:
    { 
       flexDirection:'column',
       position:'absolute',
       right:0
    },
    connect:
    {
        flex:1, 
       fontSize:18,
        marginVertical:20,
        marginHorizontal:20,
    },
    site:
    { 
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        //textAlign:'center',
        // padding:10,
    },
    site1:
    { 
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        //textAlign:'center',
        // padding:10,
    },
    site2:
    { 
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        //textAlign:'center',
        // padding:10,
    },
    // button: {
    //     alignItems: 'center',
    //     padding: 15,
    //     color:'white',
      

    // },
}); 

AppRegistry.registerComponent('UserLogin',() => UserLogin);