import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableHighlight,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';
import firebase from 'react-native-firebase';

import commonStyles, { colors } from '../styles/common';

import { PulseIndicator } from 'react-native-indicators';
import { Actions } from 'react-native-router-flux';
import { styles } from './Email';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const highlight = 'orange';

class Login extends React.Component {
    state = {
        email: this.props.email,
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        userId: this.props.userId,
        password: '',
        spinnerVisible: true,
        user: null,
        valid: true
    }
    unsubscriber = null;

    componentWillUnmount() {
        if (this.unsubscriber) {
            this.unsubscriber();
        }
    }

    componentDidMount() {
        const parent = this;
        // setTimeout(() => {
        //     parent.setState({ 'spinnerVisible': false })
        // }, 2000);
        parent.setState({ 'spinnerVisible': false })
        this.unsubscriber = firebase.app('evnt').auth().onAuthStateChanged((user) => {
            this.setState({ user });
        });
    }

    login() {
        console.log(this.state)
        firebase.app('evnt').auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(user => {
            this.setState({ valid: true });
            Actions.home({
                user: {
                    userId: this.state.userId,
                    email: this.state.email,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName
                }
            });
        }).catch(err => {
            console.log(err)
            this.setState({ valid: false });
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.spinnerVisible == true && (
                    <View style={loadingStyles.container}>
                        <PulseIndicator color="white" size={150}></PulseIndicator>
                    </View>
                )}
                <SafeAreaView style={styles.container}>
                    <View>
                        <Text style={styles.title}>
                            welcome back <Text style={{ color: highlight }}>{this.props.firstName.toLowerCase()}</Text>
                        </Text>
                        <Text style={styles.instruction}>
                            enter your password
                            </Text>
                    </View>

                    <View style={[styles.body, { marginTop: screenHeight / 32 }]}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(password) => this.setState({ 'password': password })}
                            value={this.state.password}
                            autoCompleteType='password'
                            autoFocus={true}
                            textContentType='password'
                            autoCapitalize='none'
                            placeholder='password'
                            secureTextEntry={true}
                        ></TextInput>

                        <TouchableWithoutFeedback
                            style={this.state.password.length > 3 ? { opacity: 1 } : { opacity: .4 }}
                            onPress={() => {
                                if (this.state.password.length > 3) {
                                    this.login();
                                }
                            }}
                        >
                            <View style={[commonStyles.button, styles.nextButton]}>
                                <Text>login</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        {this.state.password.length <= 3 && this.state.password.length > 0 &&
                            <Text style={styles.errorText}>
                                enter a valid password
                            </Text>
                        }
                        {!this.state.valid &&
                            <Text style={styles.errorText}>
                                invalid password
                            </Text>
                        }
                    </View>
                </SafeAreaView >
            </View >
        )
    }
}

const loadingStyles = StyleSheet.create({
    container: {
        height: screenHeight,
        backgroundColor: highlight,
    }
})

export default Login;