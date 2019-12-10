// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import firebase from 'react-native-firebase';

import { Scene, Router, Stack } from 'react-native-router-flux';

import Home from './src/components/Home';
import Event from './src/components/Event';
import Email from './src/components/Email';
import SignUp from './src/components/SignUp';
import Login from './src/components/Login';

export default class App extends React.Component {
  componentWillMount() {
    const iosConfig = {
      clientId: '786413911892-8v8qcgr3k5cnqbdva3agdovno8t4nne6.apps.googleusercontent.com',
      appId: '1:786413911892:ios:f301fcfb0b03f779c712c1',
      apiKey: 'AIzaSyBwP9XDjYXejHdCvJJgT-DW42Uzyk6i95s',
      databaseURL: 'https://evnt-55158.firebaseio.com',
      storageBucket: 'evnt-55158.appspot.com',
      messagingSenderId: '786413911892',
      projectId: 'evnt-55158',

      // enable persistence by adding the below flag
      persistence: true,
    };

    const evntApp = firebase.initializeApp(iosConfig, 'evnt');
    evntApp.onReady().then((app) => console.log(app));
  }

  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar="true" duration={0}>
          <Scene key="email" component={Email} />
          <Scene key="signup" component={SignUp} />
          <Scene key="login" component={Login} />
          <Scene key="home" component={Home} />
          <Scene key="event" component={Event} />
        </Stack>
      </Router>
    );
  }
}