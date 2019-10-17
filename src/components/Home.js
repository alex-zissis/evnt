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

class Home extends React.Component {
    state = {
        email: '',
        validEmail: false
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.title}>
                        Welcome to <Text style={{ color: highlight }}>Evnt</Text>
                    </Text>
                </View>
            </SafeAreaView>
        )
    }
};

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
        marginTop: 20,
        paddingLeft: screenWidth * .05,
        paddingRight: screenWidth * .05,
        fontSize: 60,
        fontWeight: 'bold',
        color: '#00000f'
    },
    input: {
        fontSize: 25,
        width: screenWidth * .8,
        textAlign: 'center'
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

    export default Home;