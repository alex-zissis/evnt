import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    StatusBar,
    TextInput,
    TouchableHighlight,
    Dimensions
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar, faClock, faMapPin, faUsers, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { whileStatement } from '@babel/types';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const highlight = 'orange';
const iconColor = '#8c92ac';


class Event extends React.Component {
    state = {
        attendees: this.props.item.attendees,
        going: this.props.item.going,
        interested: this.props.item.interested,
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: this.props.item.coverPhoto }} style={styles.image} />
                </View>

                <TouchableHighlight style={styles.button} onPress={() => Actions.home({ headers: this.props.headers })}>
                    <Text>back</Text>
                </TouchableHighlight>

                <ScrollView style={styles.scrollView} contentContainerStyle={{ alignItems: 'center' }}>
                    <Text style={styles.title}>
                        {this.props.item.title}
                    </Text>


                    <View style={styles.buttonContainer}>
                        <TouchableHighlight
                            style={[styles.rsvpButton, { opacity: this.state.going ? 1 : .5 }]}
                            onPress={() => {
                                this.setState(
                                    { 'going': !this.state.going },
                                    this.setState({ 'attendees': !this.state.going ? this.state.attendees + 1 : this.state.attendees - 1 })
                                );
                                if (this.state.interested && !this.state.going) {
                                    this.setState({ 'interested': false });
                                }
                            }}>
                            <Text>going</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={[styles.rsvpButton, { opacity: this.state.interested ? 1 : .5 }]}
                            onPress={() => {
                                this.setState({ 'interested': !this.state.interested })
                                if (this.state.going && !this.state.interested) {
                                    this.setState({ 'going': false });
                                    this.setState({ 'attendees': this.state.attendees - 1 })
                                }
                            }}>
                            <Text>interested</Text>
                        </TouchableHighlight>
                    </View>

                    <Text style={[styles.subheading, styles.dateTimeHeading]}>date/time:</Text>
                    <View style={[styles.card, styles.dateTimeCard]}>
                        <View style={styles.row}>
                            <FontAwesomeIcon style={styles.icon} icon={faCalendar} />
                            <Text style={styles.iconInfo}>{new Date(this.props.item.date).toDateString()}</Text>
                        </View>
                        <View style={styles.row}>
                            <FontAwesomeIcon style={styles.icon} icon={faClock} />
                            <Text style={styles.iconInfo}>{this.props.item.startTime}-{this.props.item.endTime}</Text>
                        </View>
                    </View>

                    <Text style={[styles.subheading, styles.locationHeading]}>info:</Text>
                    <View style={[styles.card, styles.infoCard]}>
                        <Text style={styles.description}>
                            {this.props.item.description}
                        </Text>
                        <Grid style={{ borderTopWidth: 1, borderTopColor: '#cfd2e3', borderTopLeftRadius: 5, borderTopRightRadius: 5, paddingTop: 4, alignItems: 'center' }}>
                            <Row style={{ flex: 1, width: "70%", justifyContent: 'space-between' }}>
                                <View style={styles.row}>
                                    <FontAwesomeIcon style={styles.icon} icon={faUsers} />
                                    <Text style={styles.iconInfo}>{this.state.attendees} attendees</Text>
                                </View>
                                <View style={styles.row}>
                                    <FontAwesomeIcon style={styles.icon} icon={faDollarSign} />
                                    <Text style={styles.iconInfo}>${this.props.item.price}</Text>
                                </View>
                            </Row>
                        </Grid>
                    </View>

                    <Text style={[styles.subheading, styles.locationHeading]}>location:</Text>
                    <View style={[styles.card, styles.locationCard]}>
                        <View style={styles.row}>
                            <FontAwesomeIcon style={styles.icon} icon={faMapPin} />
                            <Text style={styles.iconInfo}>{this.props.item.location}</Text>
                        </View>
                        <Image
                            style={styles.fakeMap} source={require('../assests/fakeMap.png')}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView >
        );
    }
}

const styles = new StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
    },
    imageContainer: {
        width: screenWidth,
        height: screenWidth / 2,
    },
    image: {
        resizeMode: 'cover',
        ...StyleSheet.absoluteFillObject,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        width: screenWidth * .8,
        padding: 10,
        marginTop: 5,
    },
    title: {
        marginTop: screenHeight / 64,
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'left',
        width: screenWidth * .9,
    },
    subheading: {
        fontSize: 18,
        color: highlight,
        marginTop: screenHeight / 32,
        width: screenWidth,
        textAlign: 'left',
        marginLeft: screenWidth * .2,
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row',
    },
    locationCard: {

    },
    fakeMap: {
        height: 200,
        width: "100%",
        marginTop: 5
    },
    scrollView: {
        flex: 1,
        width: screenWidth
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth / 6,
        paddingVertical: 5,
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
        marginTop: screenHeight / 64,
        marginLeft: screenWidth * .05
    },
    icon: {
        color: iconColor,
        marginRight: 7
    },
    description: {
        fontSize: 16,
        paddingBottom: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        width: screenWidth * .5,
        justifyContent: 'space-between',
        marginTop: screenHeight / 64
    },
    rsvpButton: {
        width: "45%",
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 2.5,
        paddingVertical: 5,
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
    }
})

export default Event; 