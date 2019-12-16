import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const colors = {
    placeholderText: '#95a5a6',
    backgroundColor: '#f1f1f1',
    highlight: 'orange',
    errorText: '#d9534f',
    tertiaryColor: '#8c92ac'
}

const commonStyles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 2,
        padding: 10,
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
    }
});

export default commonStyles;