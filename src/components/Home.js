import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    FlatList,
    View,
    Text,
    StatusBar,
    TextInput,
    TouchableHighlight,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';
import firebase from 'react-native-firebase';

import Swiper from 'react-native-swiper';

import EventCard from './modules/EventCard';
import FilterButton from './modules/FilterButton';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { PulseIndicator } from 'react-native-indicators';

Animatable.initializeRegistryWithDefinitions({
    mainMoveUp: {
        from: { translateY: 0 },
        to: { translateY: -270 }
    }
});

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const highlight = 'orange';

class Home extends Component {
    state = {
        email: '',
        validEmail: false,
        user: this.props.user,
        evnts: [],
        featured_evnts: [],
        data: [],
        types: ['club', 'sport', 'music', 'other'],
        headers: this.props.headers ? this.props.headers : true,
        spinnerVisible: true,
    }

    ref = null;
    mainRef = null;
    featureRef = null;

    mainRefOnPress = () => this.mainRef.mainMoveUp(200)

    featureRefOnPress = () => this.featureRef.fadeOut(200).then(this.setState({ headers: false }));

    handleMainRef = ref => {
        this.mainRef = ref;
    }

    handleFeatureRef = ref => {
        this.featureRef = ref;
    }

    componentWillMount() {
        this.ref = firebase.app('evnt').database().ref();
        this.ref.child('events').orderByKey().on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                const obj = snapshot.val();
                const events = Object.keys(obj).map(i => {
                    const event = obj[i];
                    event.id = i;
                    if (event.attendees === null || event.attendees === undefined) {
                        event.attendees = {};
                    }
                    return event;
                });
                this.setState({ data: events }, () => {
                    this.setState({ featured_evnts: [this.state.data[3], this.state.data[5]] }, () => this.setState({ spinnerVisible: false }))
                });
                this.filterTypes();
            }
        })
    }


    filterTypes() {
        let arr = this.state.data.slice();
        arr = arr.filter(evnt => this.state.types.includes(evnt.type));
        this.setState({
            evnts: arr,
        });
    }

    toggleType(inputType) {
        if (this.state.types.includes(inputType)) {
            const arr = this.state.types;
            arr.splice(arr.indexOf(inputType), 1);
            this.setState({
                types: arr,
            }, this.filterTypes())
        } else {
            const arr = this.state.types;
            arr.push(inputType);
            this.setState({
                types: arr,
            }, this.filterTypes())
        }
    }

    render() {
        const config = {
            velocityThreshold: 0.2,
            directionalOffsetThreshold: 60
        };

        return (
            <View style={{ flex: 1 }}>
                {this.state.spinnerVisible == true && (
                    <View style={loadingStyles.container}>
                        <PulseIndicator color="white" size={150}></PulseIndicator>
                    </View>
                )}
                <SafeAreaView style={styles.container}>
                    <View>
                        <Text style={styles.title}>
                            welcome to <Text style={{ color: highlight }}>evnt</Text>
                        </Text>
                    </View>
                    <Animatable.View ref={this.handleFeatureRef} style={styles.featuredContainer}>
                        <View style={styles.featuredTitleRow}>
                            <Text style={styles.featuredTitle}>featured <Text style={{ color: highlight }}>evnt</Text>s</Text>
                            <TouchableHighlight style={styles.button}
                                onPress={() => {
                                    this.featureRefOnPress();
                                    this.mainRefOnPress();
                                }}>
                                <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                            </TouchableHighlight>
                        </View>
                        <Swiper style={styles.wrapper} showsButtons={false}>
                            <View style={styles.slide}>
                                {this.state.featured_evnts[0] &&
                                    <TouchableHighlight style={styles.eventCardWrapper} onPress={() => {
                                        Actions.event({ item: this.state.featured_evnts[0], user: this.state.user, headers: this.state.headers });
                                    }}>
                                        <EventCard title={this.state.featured_evnts[0].title} price={this.state.featured_evnts[0].price} location={this.state.featured_evnts[0].location} coverPhoto={this.state.featured_evnts[0].coverPhoto} date={this.state.featured_evnts[0].date} type={this.state.featured_evnts[0].type} attendees={Object.keys(this.state.featured_evnts[0].attendees).length} />
                                    </TouchableHighlight>
                                }
                            </View>
                            <View style={styles.slide}>
                                {this.state.featured_evnts[1] &&

                                    <TouchableHighlight style={styles.eventCardWrapper} onPress={() => {
                                        Actions.event({ item: this.state.featured_evnts[1], user: this.state.user, headers: this.state.headers });
                                    }}>
                                        <EventCard title={this.state.featured_evnts[1].title} price={this.state.featured_evnts[1].price} location={this.state.featured_evnts[1].location} coverPhoto={this.state.featured_evnts[1].coverPhoto} date={this.state.featured_evnts[1].date} type={this.state.featured_evnts[1].type} attendees={Object.keys(this.state.featured_evnts[1].attendees).length} />
                                    </TouchableHighlight>
                                }
                            </View>
                        </Swiper>
                    </Animatable.View>
                    <Animatable.View style={[styles.main, { height: this.state.headers ? "100%" : "80%" }]} ref={this.handleMainRef}>
                        <Text style={styles.filterTitle}>i am interested in:</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableHighlight onPress={() => this.toggleType('club')} style={{ opacity: this.state.types.includes('club') ? 1 : .4 }}>
                                <FilterButton displayText="clubs" value="club" ></FilterButton>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => this.toggleType('sport')} style={{ opacity: this.state.types.includes('sport') ? 1 : .4 }}>
                                <FilterButton displayText="sports" value="sport"></FilterButton>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => this.toggleType('music')} style={{ opacity: this.state.types.includes('music') ? 1 : .4 }}>
                                <FilterButton displayText="music" value="music"></FilterButton>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => this.toggleType('other')} style={{ opacity: this.state.types.includes('other') ? 1 : .4 }}>
                                <FilterButton displayText="other" value="other"></FilterButton>
                            </TouchableHighlight>
                        </View>
                        <FlatList
                            style={styles.cardContainer}
                            contentContainerStyle={styles.cardContent}
                            data={this.state.evnts}
                            extraData={this.state}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableHighlight onPress={() => {
                                        Actions.event({ item: item, user: this.state.user, headers: this.state.headers });
                                    }}>
                                        <EventCard
                                            title={item.title}
                                            location={item.location}
                                            type={item.type}
                                            date={item.date}
                                            price={item.price}
                                            coverPhoto={item.coverPhoto}
                                            attendees={Object.keys(item.attendees).length}
                                            marginTop="20" />
                                    </TouchableHighlight>
                                );
                            }}
                            keyExtractor={item => item.id}
                        >
                        </FlatList>
                    </Animatable.View>
                </SafeAreaView >
            </View>
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
    buttonContainer: {
        marginBottom: 8,
        flexDirection: "row",
        width: screenWidth * .85,
        height: screenHeight / 18,
        justifyContent: "space-between",
    },
    cardContainer: {
        flex: 1,
        width: screenWidth,
    },
    cardContent: {
        width: '90%',
        marginLeft: "5%",
    },
    filterTitle: {
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 7,
        width: screenWidth * .85,
        textAlign: 'left',
        color: '#8c92ac'
    },
    featuredContainer: {
        height: 260,
        marginTop: 20,
    },
    wrapper: {

    },
    slide: {
        width: "95%",
        marginLeft: "2.5%",
        height: 170,
    },
    featuredTitle: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    featuredTitleRow: {
        flexDirection: 'row',
        marginLeft: "5%",
        marginRight: "5%",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 2,
        backgroundColor: 'white',
        borderColor: 'white',
        shadowColor: "#000",
        padding: 5,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    main: {
        // flex: 1,
        alignItems: 'center',
    },
    eventCardWrapper: {
        width: "100%",
        height: "100%"
    }
});

const loadingStyles = StyleSheet.create({
    container: {
        height: screenHeight,
        backgroundColor: highlight,
    }
})

export default Home;