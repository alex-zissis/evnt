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
                        welcome to <Text style={{ color: highlight }}>evnt</Text>
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableHighlight>
                        <Text style={styles.button}>
                            Hello
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Text style={[styles.button, { backgroundColor: "lightgreen" }]}>
                            Hello
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Text style={[styles.button, { backgroundColor: "lightblue" }]}>
                            Hello
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Text style={[styles.button, { backgroundColor: "pink" }]}>
                            Hello
                        </Text>
                    </TouchableHighlight>
                </View>
            </SafeAreaView>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center'
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
        color: '#00000f',
    },
    input: {
        fontSize: 25,
        width: screenWidth * .8,
        textAlign: 'center'
    },
    button: {
        fontSize: 20,
        padding: 10,
        flex: 1,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 20,
        backgroundColor: highlight,
        overflow: 'hidden',
    },
    buttonContainer: {
        marginTop: 30,
        marginBottom: 8,
        flexDirection: "row",
        width: screenWidth * .85,
        height: screenHeight / 12,
        justifyContent: "space-between",
    }
});

export default Home;