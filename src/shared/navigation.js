import {createStackNavigator} from 'react-navigation';
import LoginScreen from '.../screens/LoginScreen';
import Dashboard from '.../screens/Dashboard';

export default AppNavigation = (authenticated)=>createStackNavigator({
    login:{
        getScreen:()=>LoginScreen,
        navigationOptions:{
            title:'Login'
        }
    },
    dashboard:{
        getScreen:()=>Dashboard,
        navigationOptions:{
            title:'Dashboard'
        }
    }
}, {
    initialRouteName:authenticated?'dashboard' : 'login'
})