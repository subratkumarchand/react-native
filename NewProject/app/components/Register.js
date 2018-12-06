import React, {Component} from 'react';
import { AppRegistry, StyleSheet,TextInput,Text,ScrollView,View,TouchableOpacity , Alert ,Picker,Button,Linking} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { RaisedTextButton } from 'react-native-material-buttons';
import { KeyboardAvoidingView } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';

console.disableYellowBox = true;
export default class Register extends React.Component {
    
    constructor(props){
        super(props);
       
        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitFirstName=this.onSubmitFirstName.bind(this);
        this.onSubmitLastName=this.onSubmitLastName.bind(this);
        this.onSubmitEmail = this.onSubmitEmail.bind(this);
      this.onSubmitPassword = this.onSubmitPassword.bind(this);
      this.onSubmitShopName=this.onSubmitShopName.bind(this);
      this.onSubmitAddress=this.onSubmitAddress.bind(this);
      this.onAccessoryPress = this.onAccessoryPress.bind(this);

      this.firstnameRef = this.updateRef.bind(this, 'firstname');
      this.lastnameRef = this.updateRef.bind(this, 'lastname');
      this.emailRef = this.updateRef.bind(this, 'email');
      this.passwordRef = this.updateRef.bind(this, 'password');
      this.shopnameRef = this.updateRef.bind(this, 'shopname');
      this.addressRef = this.updateRef.bind(this, 'address');

     this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password:'',
            shopname:'',
            address:'',
            secureTextEntry: true,           
        };    
    }

    static navigationOptions = {
        title: 'Register Here',
        headerStyle: { backgroundColor: '#5f43a5' },
       headerTitleStyle: { color: '#ffffff' }
      };
     

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
        ['firstname','lastname','email', 'password','shopname','address']
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

      onSubmitFirstName() {
        this.lastname.focus();
      }
      onSubmitLastName() {
        this.email.focus();
      }
      onSubmitEmail() {
        this.password.focus();
      }
      onSubmitPassword() {
        this.password.blur();
      }
      onSubmitShopName() {
        this.shopname.blur();
      }
      onSubmitAddress() {
        this.address.blur();
      }
    
      onSubmit() {
        let errors = {};
        let re=/^[A-Za-z]+$/;
        let mailre=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let count=0;
        ['firstname','lastname','email', 'password','shopname','address']
          .forEach((name) => {
            let value = this[name].value();
            if (value) {
                if(!('password'==name) && !('email'==name))
                {
                        if(!re.test(value))
                        {
                        errors[name]='enter only alphabets';
                        }
                        else
                        {
                          count=count+1;
                        }
                }
                else if ('password' === name) {
                  if(value.length < 6)
                    errors[name] = 'Too short';
                  else
                    count=count+1;
                  }
                 else if ('email' === name) {  
                    if(!(mailre.test(value)))
                    {
                  errors[name]='enter valid email';
                  
                    }
                    else{
                      count=count+1;
                    }
                  }
            } 
            else {
              errors[name] = 'Should not be empty';
            }
          });
          if(count==6){
			fetch('http://192.168.0.188/api/user.php', {
		  method: 'POST',
		  headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
				FirstName:this.state.firstname,
				LastName: this.state.lastname,
				Email: this.state.email,
				Password: this.state.password,
				ShopName: this.state.shopname,
				ShopType: "dummy",
				Address: this.state.address,
				Profile: "dummy"
			   }),
			}).then((response) => response.json())
		.then((data) => {

		  //alert("registered successfully");
		 //console.log(JSON.stringify(data));
		 //this.props.navigation.push('login')
		 alert(data.status_message);
		 
		})
		.catch((error) => {
		  console.error(error);
		});
				
				
				}
				this.setState({ errors });
				
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

    return (
      

<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView>
        <View style={styles.container}>
         <Text style={styles.title}>Register into your account </Text>
         <View style={styles.Formcontainer}>
         <TextField
         ref={this.firstnameRef}
         value={data.firstname}
        //  defaultValue={defaultEmail}
         keyboardType='firstname'
         autoCapitalize='none'
         autoCorrect={false}
         enablesReturnKeyAutomatically={true}
         onFocus={this.onFocus}
         onChangeText={this.onChangeText}
         onSubmitEditing={this.onSubmitFirstName}
        // returnKeyType='next'
         label='First Name'
         error={errors.firstname}
      />
      <TextField
         ref={this.lastnameRef}
         value={data.lastname}
        //  defaultValue={defaultEmail}
         keyboardType='lastname'
         autoCapitalize='none'
         autoCorrect={false}
         enablesReturnKeyAutomatically={true}
         onFocus={this.onFocus}
         onChangeText={this.onChangeText}
         onSubmitEditing={this.onSubmitLastName}
         returnKeyType='next'
         label='Last Name'
         error={errors.lastname}
      />
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
         placeholder='example@gmail.com'
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
         clearTextOnFocus={true}
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
       <Text>I am a</Text> 
        <View style={styles.regForm}>
          <RadioGroup>
          <RadioButton value={'ShopKeeper'} >
            <Text>ShopKeeper</Text>
          </RadioButton>
          <RadioButton value={'Customer'}>
            <Text>Customer</Text>
          </RadioButton>
          </RadioGroup>
       </View> 
       <TextField
         ref={this.shopnameRef}
         value={data.shopname}
        //  defaultValue={defaultEmail}
         keyboardType='shopname'
         autoCapitalize='none'
         autoCorrect={false}
         enablesReturnKeyAutomatically={true}
         onFocus={this.onFocus}
         onChangeText={this.onChangeText}
         onSubmitEditing={this.onSubmitLastName}
         returnKeyType='next'
         label='Shop Name'
         error={errors.shopname}
      />
      <Picker
          style={styles.testInput}
          label="ShopType"
          underlineColorAndroid="transparent"
          selectedValue={this.state.PickerValue}
          onValueChange={(itemValue,itemIndex)=>this.setState({PickerValue:itemValue})}>
          <Picker.Item label="Html" value="Html"/>
          <Picker.Item label="javascript" value="javascript"/>
      </Picker>

       <TextField
         ref={this.addressRef}
         value={data.address}
        //  defaultValue={defaultEmail}
         keyboardType='address'
         autoCapitalize='none'
         autoCorrect={false}
         enablesReturnKeyAutomatically={true}
         onFocus={this.onFocus}
         onChangeText={this.onChangeText}
         onSubmitEditing={this.onSubmitAddress}
         returnKeyType='next'
         label='Address'
         error={errors.address}
      />
         </View>
         <View style={styles.buttonContainer}>
         {/* <Button color="#5f43a5" onPress={this.login} title={'Login'}/> */}
         <RaisedTextButton onPress={this.onSubmit} title='SUBMIT' color={TextField.defaultProps.tintColor} titleColor='white' />
         </View>
        </View> 
        </ScrollView>
        </KeyboardAvoidingView>
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
    buttonContainer:{
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
    regForm: {
      alignSelf:'stretch',
      padding:10,
      flexDirection:'column',
      },
    
}); 

AppRegistry.registerComponent('Register',() => Register);