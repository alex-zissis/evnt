import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableHighlight,
    Dimensions
} from 'react-native';
import firebase from 'react-native-firebase';

import { PulseIndicator } from 'react-native-indicators';
import { Actions } from 'react-native-router-flux';
import { styles } from './Email';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const highlight = 'orange';

class SignUp extends React.Component {
    state = {
        email: this.props.email,
        errors: [],
        firstName: '',
        lastName: '',
        password: '',
        valid: false
    }

    signUp() {
        firebase.app('evnt').auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(val => {
            console.log(val);
            firebase.app('evnt').database().ref().child('users').push({ email: this.state.email, firstName: this.state.firstName, lastName: this.state.lastName })
            Actions.login({ email: this.state.email, firstName: this.state.firstName });
        }).catch(err => {
            console.log(err);
        })
    }


    validate() {
        const array = [...this.state.errors];

        if (this.state.password.length <= 3) {
            if (!(array.includes('Invalid password')))
                array.push('Invalid password');
        } else {
            if (array.includes('Invalid password')) {
                array.splice(array.indexOf('Invalid password'), 1);
            }
        }

        if (this.state.firstName.trim().length <= 1) {
            if (!(array.includes('Invalid first name')))
                array.push('Invalid first name');
        } else {
            if (array.includes('Invalid first name')) {
                array.splice(array.indexOf('Invalid first name'), 1);
            }
        }

        if (this.state.lastName.trim().length <= 1) {
            if (!(array.includes('Invalid last name')))
                array.push('Invalid last name');
        } else {
            if (array.includes('Invalid last name')) {
                array.splice(array.indexOf('Invalid last name'), 1);
            }
        }

        console.log(array);
        this.setState({ valid: array.length > 0 ? false : true, errors: array });
        return array.length > 0 ? false : true;
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.title}>
                        Sign Up
                    </Text>
                    <Text style={styles.instruction}>
                        enter your details
                    </Text>
                </View>

                <View style={[styles.body, { marginTop: screenHeight / 32 }]}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(firstName) => this.setState({ 'firstName': firstName }, () => this.validate())}
                        value={this.state.firstName}
                        autoFocus={true}
                        autoCapitalize='none'
                        placeholder='first name'
                    ></TextInput>

                    <TextInput
                        style={styles.input}
                        onChangeText={(lastName) => this.setState({ 'lastName': lastName }, () => this.validate())}
                        value={this.state.lastName}
                        autoFocus={true}
                        autoCapitalize='none'
                        placeholder='last name'
                    ></TextInput>

                    <TextInput
                        style={styles.input}
                        onChangeText={(password) => this.setState({ 'password': password }, () => this.validate())}
                        value={this.state.password}
                        autoCompleteType='password'
                        autoFocus={true}
                        textContentType='password'
                        autoCapitalize='none'
                        placeholder='password'
                        secureTextEntry={true}
                    ></TextInput>

                    <TouchableHighlight
                        style={this.state.valid ? { opacity: 1 } : { opacity: .4 }}
                        onPress={() => {
                            if (this.validate()) {
                                this.signUp();
                            }
                        }}
                    >
                        <Text style={styles.button}>Sign Up</Text>
                    </TouchableHighlight>

                    {this.state.errors.length > 0 &&
                        <Text style={styles.errorText}>
                            {this.state.errors.join('\n')}
                        </Text>
                    }
                </View>
            </SafeAreaView >
        )
    }
}

export default SignUp;