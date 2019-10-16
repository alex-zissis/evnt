import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    TouchableHighlight
} from 'react-native';

class Login extends React.Component {
    state = {
        email: '',
        validEmail: false
    }

    render() {
        return (
            <SafeAreaView>
                <View>
                    <Text>What is your email?</Text>
                </View>

                <View>
                    <TextInput
                        onChangeText={(email) => this.validateEmail({ email })}
                        value={this.state.email}
                        autoCompleteType='email'
                        autoFocus={true}
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        autoCapitalize='none'
                    ></TextInput>
                    <Text>
                        {this.state.validEmail === true && this.state.email !== '' ? '' : 'Enter a valid email address'}
                    </Text>
                    <TouchableHighlight
                        style={this.state.validEmail ? { opacity: 1 } : { opacity: .2 }}
                        onPress={() => {
                            if (this.state.validEmail) {
                                console.log('move on');
                            }
                        }}
                    >
                        <Text>Click Time</Text>
                    </TouchableHighlight>
                </View>
            </SafeAreaView>
        )
    }

    validateEmail(email) {
        this.setState(email);
        let regex = /[^@]+@[^\.]+\..+/g

        if (regex.test(email.email)) {
            this.setState({ 'validEmail': true });
        } else {
            this.setState({ 'validEmail': false });
        }

        console.log(this.state.validEmail);
    }
}

const styles = StyleSheet.create({

});

export default Login;