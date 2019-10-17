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
    Dimensions
} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const highlight = 'orange';

class Login extends React.Component {
    state = {
        email: '',
        validEmail: false
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.title}>
                        Enter your <Text style={{ color: highlight }}>email</Text>
                    </Text>
                </View>

                <View style={styles.body}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(email) => this.validateEmail({ email })}
                        value={this.state.email}
                        autoCompleteType='email'
                        autoFocus={true}
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        autoCapitalize='none'
                        placeholder='user@example.com'
                    ></TextInput>

                    <TouchableHighlight
                        style={this.state.validEmail ? { opacity: 1 } : { opacity: .4 }}
                        onPress={() => {
                            if (this.state.validEmail) {
                                console.log('move on');
                            }
                        }}
                    >
                        <Text style={styles.button}>Done</Text>
                    </TouchableHighlight>

                    <Text>
                        {this.state.validEmail === true && this.state.email !== '' ? '' : 'Enter a valid email address'}
                    </Text>
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
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    },
    body: {
        paddingTop: screenHeight / 16,
        flex: 1,
        // justifyContent: 'center',
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
        borderColor: '#e3e3e3',
        borderWidth: 2,
        borderRadius: 10
    },
    button: {
        display: 'flex',
        marginTop: 15,
        padding: 10,
        fontSize: 20,
        backgroundColor: highlight,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    }
});

export default Login;