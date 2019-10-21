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
import { Actions } from 'react-native-router-flux';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const highlight = 'orange';

class EventCard extends React.Component {
    state = {
        email: '',
        validEmail: false
    }

    styles = StyleSheet.create({
        container: {
            width: "100%",
            height: 170,
            backgroundColor: 'white',
            borderRadius: 5,
            // overflow: 'hidden',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.00,

            elevation: 1,
            marginTop: this.props.marginTop ? Number(this.props.marginTop) : 0,
        }
    });

    render() {
        return (
            <View style={this.styles.container}>
                <Text>
                    {this.props.title}{'\n'}
                    {this.props.location}{'\n'}
                    {this.props.type}{'\n'}
                    {this.props.date}
                </Text>
            </View>
        )
    }
}



export default EventCard;