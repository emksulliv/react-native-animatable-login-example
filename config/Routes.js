import React from 'react';
import {StackNavigator, SwitchNavigator, TabNabigator } from 'react-navigation';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from '../screens/LoginScreen';
import Dashboard from '.../screens/Dashboard';

export default class Routes extends React.Component {
    render() {
        return(
            <Router>
                <Stack key="root" hideNavBar={true}>
                    <Scene key="login" component={Login} title="Login" initial={true}/>
                    <Scene key="dashboard" component={Dashboard} />
                </Stack>
           </Router>
        )
        }
};