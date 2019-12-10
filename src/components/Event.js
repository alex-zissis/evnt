import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    FlatList,
    StatusBar,
    TextInput,
    TouchableHighlight,
    Dimensions
} from 'react-native';

import firebase from 'react-native-firebase';

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
        attendees: Object.keys(this.props.item.attendees).length,
        attendeesObj: this.props.item.attendees,
        attendeesArr: [],
        going: this.props.item.going,
        interested: this.props.item.interested,
        showAttendees: false,
    };
    ref = null;

    componentWillMount() {
        console.log(this.props.user)
        console.log(this.props.item.attendees)

        if (this.props.item.attendees[this.props.user.userId] !== undefined) {
            this.setState({ going: true })
        }
        this.ref = firebase.app('evnt').database().ref();
        this.updateAttendees();
    }

    updateAttendees() {
        this.ref.child('events').child(this.props.item.id).child('attendees').on('value', snapshot => {
            if (snapshot != null) {
                const original = snapshot.val();
                console.log(original)
                try {
                    const array = Object.keys(original).map(key => {
                        return { userId: key, name: original[key] }
                    });
                    this.setState({ attendeesObj: original, attendeesArr: array });
                } catch (e) {
                    this.setState({ attendeesObj: {}, attendeesArr: [] });
                }
            } else {
                this.setState({ attendeesObj: {}, attendeesArr: [] });
            }
        });
    }

    removeAttendee() {
        this.ref.child('events').child(this.props.item.id).child('attendees').child(this.props.user.userId).remove();
        this.updateAttendees();
    }

    addAttendee() {
        this.ref.child('events').child(this.props.item.id).child('attendees').child(this.props.user.userId).set(`${this.props.user.firstName} ${this.props.user.lastName}`);
        this.updateAttendees();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: this.props.item.coverPhoto }} style={styles.image} />
                </View>

                <TouchableHighlight style={styles.button} onPress={() => Actions.home({ headers: this.props.headers, user: this.props.user })}>
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
                                if (this.state.going) {
                                    // remove the atendee record
                                    console.log(`events/${this.props.item.id}/attendees/${this.props.user.userId}`)
                                    this.removeAttendee();
                                } else {
                                    this.addAttendee();
                                }
                                // this.ref.child('events').child(this.props.item.id).child('attendees').push()
                                // }
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
                                    this.removeAttendee();
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
                                <TouchableHighlight style={styles.row} onPress={() => this.setState({ showAttendees: !this.state.showAttendees })}>
                                    <View style={styles.row}>
                                        <FontAwesomeIcon style={styles.icon} icon={faUsers} />
                                        <Text style={styles.iconInfo}>{this.state.attendees} attendees</Text>
                                    </View>
                                </TouchableHighlight>
                                <View style={styles.row}>
                                    <FontAwesomeIcon style={styles.icon} icon={faDollarSign} />
                                    <Text style={styles.iconInfo}>${this.props.item.price}</Text>
                                </View>
                            </Row>
                        </Grid>
                    </View>

                    {this.state.showAttendees &&
                        <View style={styles.card}>
                            <Text style={styles.attendeesHeading}>Attendees</Text>
                            <FlatList
                                data={this.state.attendeesArr}
                                extraData={this.state}
                                renderItem={({ item }) => {
                                    return (
                                        <View styles={styles.attendeesList}>
                                            <Text>{item.name}</Text>
                                        </View>
                                    );
                                }}
                                keyExtractor={item => item.userId}
                            >
                            </FlatList>
                        </View>
                    }

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
    attendeesHeading: {
        fontSize: 20,
        marginBottom: 5
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