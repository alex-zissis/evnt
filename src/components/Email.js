import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    TouchableHighlight,
    Dimensions,
    TouchableWithoutFeedback,
    KeyboardAvoidingView
} from 'react-native';

import commonStyles, { colors } from '../styles/common';

import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class Email extends React.Component {
    state = {
        email: '',
        validEmail: false
    }
    ref;

    componentWillMount() {
        this.ref = firebase.app('evnt').database().ref();
        console.log(firebase.app('evnt').auth().currentUser);
    }

    next() {
        const email = this.state.email;
        if (this.state.validEmail) {
            console.log(this.state.email)
            this.ref.child('users').orderByChild('email').equalTo(this.state.email).on("value", function (snapshot) {
                if (snapshot.val() !== null) {
                    const object = snapshot.val();
                    const userId = Object.keys(object)[0];
                    console.log(userId);
                    Actions.login({
                        userId: userId,
                        email: object[userId].email,
                        firstName: object[userId].firstName,
                        lastName: object[userId].lastName,
                    })
                } else {
                    console.log('asdas');
                    Actions.signup({ email: email });
                }
            }, err => console.log(err));
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={-250}>
                    <View style={{ flex: 16 }}>
                        <Text style={styles.title}>
                            enter your <Text style={{ color: colors.highlight }}>email</Text>
                        </Text>
                    </View>

                    <View style={styles.body}>
                        <TextInput
                            style={[styles.input, { borderBottomColor: this.state.validEmail ? '#5cb85c' : '#d9534f' }]}
                            onChangeText={(email) => this.validateEmail({ email })}
                            value={this.state.email}
                            autoCompleteType='email'
                            keyboardType='email-address'
                            textContentType='emailAddress'
                            autoCapitalize='none'
                            autoFocus={true}
                            placeholder='user@example.com'
                            placeholderTextColor={colors.placeholderText}
                        ></TextInput>

                        <TouchableWithoutFeedback
                            //style={[this.state.validEmail ? { opacity: 1 } : { opacity: .4 }]}
                            onPress={this.next}
                        >
                            <View style={[commonStyles.button, styles.nextButton]}>
                                <Text>next</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        {this.state.email.length > 3 && !this.state.validEmail &&
                            <Text style={styles.errorText}>
                                enter a valid email address
                        </Text>
                        }
                    </View>
                </KeyboardAvoidingView>

            </SafeAreaView >
        )
    }

    validateEmail(email) {
        console.log(email);
        email.email = email.email.trim();
        this.setState(email);
        const regex = /[^@]+@[^\.]+\..+/g

        this.setState({ 'validEmail': regex.test(email.email) });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor
    },
    body: {
        flex: 24,
        alignItems: 'center'
    },
    title: {
        marginTop: screenHeight / 8,
        paddingLeft: screenWidth * .05,
        paddingRight: screenWidth * .05,
        fontSize: 60,
        fontWeight: 'bold',
        color: '#00000f'
    },
    input: {
        fontSize: 25,
        width: screenWidth * .8,
        textAlign: 'center',
        color: 'black',
        borderBottomWidth: 2,
        borderBottomColor: "#d3d3d3",
    },
    instruction: {
        textAlign: 'center',
        marginTop: screenHeight / 32,
        fontSize: 20,
        color: colors.tertiaryColor,
    },
    errorText: {
        marginTop: screenHeight / 32,
        color: colors.errorText,
    },
    nextButton: {
        fontSize: 18,
        marginTop: screenHeight / 32
    }
});

export default Email;
export { styles };