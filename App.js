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

import { Scene, Router, Stack } from 'react-native-router-flux';

import Home from './src/components/Home';
import Event from './src/components/Event';
import Email from './src/components/Email';
import Login from './src/components/Login';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar="true" duration={0}>
          {/* <Scene key="email" component={Email} />
          <Scene key="login" component={Login} /> */}
          <Scene key="home" component={Home} />
          <Scene key="event" component={Event} />
        </Stack>
      </Router>
    );
  }
}