import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TextInput,
    TouchableHighlight,
    Dimensions
} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const highlight = 'orange';

class FilterButton extends React.Component {
    state = {
        selected: true,
        value: this.props.value
    }

    styles = StyleSheet.create({
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            height: "100%",
            width: screenWidth / 6,
            borderRadius: 10,
            borderWidth: 2,
            backgroundColor: 'white',
            borderColor: 'white',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.00,
            elevation: 1,
        },
    });

    render() {
        return (
            <View style={[this.styles.button,]} onPress={() => {
                this.setState({ selected: !this.state.selected })
            }}>
                <Text style={this.styles.text}>
                    {this.props.displayText}
                </Text>
            </View>
        )
    }
}

export default FilterButton;