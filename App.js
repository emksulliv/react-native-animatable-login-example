import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {StackNavigator} from 'react-navigation';
import LoginScreen from './screens/LoginScreen'
import {Font} from 'expo';

// import Login from './src/components/Login/Login.js';

export default class App extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      'font': require('./assets/fonts/font1.ttf'),
    });
  }

  render() {
    return (
      <AppStackNavigator />
      // <Login />
    );
  }
}

const AppStackNavigator = StackNavigator({
  LoginScreen: { screen: LoginScreen}
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
