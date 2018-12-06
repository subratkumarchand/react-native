import { createStackNavigator} from 'react-navigation';

import  CodeGenerate from './CodeGenerate';
import CodeReader  from './CodeReader';
import QRdata from './QRdata';
import UserLogin from './Login';
import Register from './Register';
import Categories from './Caterories';

const Navigator = createStackNavigator({
    InitialScreen: {
        screen: UserLogin
    },
    Register:{
        screen : Register
    },
    CodeGenerate:{
        screen: CodeGenerate
    },
     QRCodeScanner: {
         screen: CodeReader
     },
     QRCodedata:{
       screen : QRdata
     },
     Categories:{
         screen : Categories
     }
     
  
  }, {initialRouteName: 'InitialScreen'});
 
  export default Navigator;