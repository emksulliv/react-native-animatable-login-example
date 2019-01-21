import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {StackNavigator, createStackNavigator} from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen'
import Dashboard from './src/screens/Dashboard'
import {Font} from 'expo';


export default class App extends React.Component {

  state ={
    isFontLoaded: false,
  }

  componentDidMount() {
    Font.loadAsync({
      'font': require('./src/assets/fonts/font2.ttf'),
    }).then(() => {
      this.setState({
        isFontLoaded: true
      });
    })
  }

  render() {
    if(this.state.isFontLoaded)
      return <AppStackNavigator />
    else 
      return null;
    

    
  }
}

const AppStackNavigator = StackNavigator({
  loginScreen: LoginScreen,
  dashboard : Dashboard
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
