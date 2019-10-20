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

import { PulseIndicator } from 'react-native-indicators';
import { Actions } from 'react-native-router-flux';
import { styles } from './Email';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const highlight = 'orange';

class Login extends React.Component {
    state = {
        email: '',
        firstName: '',
        password: '',
        spinnerVisible: true,
    }


    componentDidMount() {
        const parent = this;
        setTimeout(() => {
            parent.setState({ 'spinnerVisible': false })
        }, 2000)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.spinnerVisible == true && (
                    <View style={loadingStyles.container}>
                        <PulseIndicator color="white" size={150}>asd</PulseIndicator>
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

                        <TouchableHighlight
                            style={this.state.password.length > 3 ? { opacity: 1 } : { opacity: .4 }}
                            onPress={() => {
                                if (this.state.password.length > 3) {
                                    Actions.home({ email: this.state.email, firstName: "Alex" });
                                }
                            }}
                        >
                            <Text style={styles.button}>login</Text>
                        </TouchableHighlight>

                        {this.state.password.length <= 3 && this.state.password.length > 0 &&
                            < Text style={styles.errorText}>
                                enter a valid password
                                </Text>
                        }
                    </View>
                </SafeAreaView >
            </View>
        )
    }
}

const loadingStyles = StyleSheet.create({
    container: {
        height: screenHeight,
        backgroundColor: highlight
    }
})

export default Login;