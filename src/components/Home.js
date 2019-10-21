import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    FlatList,
    View,
    Text,
    StatusBar,
    TextInput,
    TouchableHighlight,
    Dimensions
} from 'react-native';

import EventCard from './modules/EventCard';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Halloween Party @ Revs Nightclub',
        type: 'party',
        date: '10/30/2019',
        location: '127 W 24th St, New York, NY',
        coverPhoto: 'https://media.timeout.com/images/103752936/630/472/image.jpg',
        price: 20
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
        location: '101 10th Ave, New York, NY'
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
        location: '31 N 6th St, Williamsburg, NY'
    },
];

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
                <FlatList
                    style={styles.cardContainer}
                    contentContainerStyle={styles.cardContent}
                    data={DATA}
                    renderItem={({ item }) => <EventCard title={item.title} location={item.location} type={item.type} date={item.date} price={item.price} image={item.image} marginTop="20" />}
                    keyExtractor={item => item.id}
                >
                </FlatList>
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
    },
    cardContainer: {
        flex: 1,
        width: screenWidth,
        marginTop: screenHeight / 64,
    },
    cardContent: {
        width: '90%',
        marginLeft: "5%",
    }
});

export default Home;