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


import Swiper from 'react-native-swiper';

import EventCard from './modules/EventCard';
import FilterButton from './modules/FilterButton';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

Animatable.initializeRegistryWithDefinitions({
    mainMoveUp: {
        from: { translateY: 0 },
        to: { translateY: -270 }
    }
});


const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Halloween Party @ Revs Nightclub',
        type: 'club',
        date: '10/31/19',
        location: '127 W 24th St, New York, NY',
        coverPhoto: 'https://media.timeout.com/images/103752936/630/472/image.jpg',
        price: 20,
        attendees: 201,
        startTime: "8:00",
        endTime: "3:00am",
        description: "Bring in spooky season with a bang, at the Rev's Halloween Party. The party will get underway at 8pm.",
        going: false,
        interested: false
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'MLB: Yankees vs Mets',
        location: 'Yankee Stadium, The Bronx, NY',
        type: 'sport',
        date: '10/23/19',
        price: 40,
        attendees: 401,
        coverPhoto: 'https://www.ballparksofbaseball.com/wp-content/uploads/2016/04/yankee16_topv2.jpg',
        going: false,
        interested: false,
        startTime: "8:00",
        endTime: "10:00pm",
        description: "Come out to Yankee Stadium to watch the Yankees take on their cross-town rivals, the Mets.",
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Friday Nights @ PHD',
        date: '10/25/19',
        price: 30,
        attendees: 120,
        coverPhoto: 'https://www.therooftopguide.com/rooftop-bars-in-new-york/Bilder/PHDRooftopLounge_4_slide.jpg',
        location: '355 W 16th St, New York, NY',
        type: 'club',
        going: false,
        interested: false,
        startTime: "8:00",
        endTime: "4:00am",
        description: "Friday Nights @ PHD are always a great time with live DJ sets, $8 cocktails and great city views.",
    },
    {
        id: '58694a0f-3da1-471f-bd96-145531e29d72',
        title: 'Kyle\'s 21st',
        location: '31 N 6th St, Williamsburg, NY',
        type: 'other',
        date: '10/28/19',
        attendees: 27,
        coverPhoto: 'https://www.rjccevents.com/images/brag-box/_654x355/stretch-marquee-21st-party-hampshire.jpg',
        price: 0,
        going: false,
        interested: false,
        startTime: "8:00",
        endTime: "12:00am",
        description: "Hey guys, \n I'm turning 21 this weekend and would love if you could make it out.",
    },
    {
        id: '58694a0f-3da1-471f-sd96-14f531e29d72',
        title: 'Frank Ocean @ Baby\'s All Right',
        location: 'Baby\'s All Right, Williamsburg, NY',
        date: '10/29/19',
        type: 'music',
        price: 80,
        attendees: 413,
        coverPhoto: 'https://www.grammy.com/sites/com/files/styles/image_landscape_hero/public/frankocean-hero-142871483.jpg?itok=HeyjIY-4',
        going: false,
        interested: false,
        startTime: "8:00",
        endTime: "10:00pm",
        description: "Frank Ocean is touring for the first time in 2019, see his show at Baby's All Right in Brooklyn.",
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53asb28ba',
        title: 'NFL: Jets vs Giants',
        type: 'sport',
        date: '10/27/19',
        location: 'Metlife Stadium, East Rutherford, NJ',
        coverPhoto: 'https://static.clubs.nfl.com/image/private/t_editorial_landscape_12_desktop/giants/u8hfqj9wqaqodrc48ppk',
        price: 80,
        attendees: 462,
        going: false,
        interested: false,
        startTime: "8:00",
        endTime: "10:00pm",
        description: "Come out to Metlife Stadium to watch the Jets take on their cross-town rivals, the Giants.",
    },
    {
        id: '3ac68afc-c605-4sd3-a4f8-fbf91aa97f63',
        title: 'Post Malone @ MSG',
        location: 'Madison Square Garden, New York, NY',
        type: 'music',
        date: '10/25/19',
        price: 72,
        attendees: 542,
        coverPhoto: 'https://ksassets.timeincuk.net/wp/uploads/sites/55/2019/09/post-malone-saint-tropez-music-video@2000x1270-920x584.jpg',
        going: false,
        interested: false,
        startTime: "8:00",
        endTime: "10:00pm",
        description: "Do not miss the new Post Malone tour, coming to MSG pm 10/25/2019.",
    },
];

const FEATURED_EVENTS = [DATA[5], DATA[6]]

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const highlight = 'orange';

class Home extends Component {
    state = {
        email: '',
        validEmail: false,
        evnts: [],
        types: ['club', 'sport', 'music', 'other'],
        headers: this.props.headers ? this.props.headers : true
    }

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

    componentDidMount() {
        this.filterTypes();
    }

    filterTypes() {
        let arr = DATA.slice();
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
                            <TouchableHighlight style={styles.eventCardWrapper} onPress={() => {
                                Actions.event({ item: FEATURED_EVENTS[0], headers: this.state.headers });
                            }}>
                                <EventCard title={FEATURED_EVENTS[0].title} price={FEATURED_EVENTS[0].price} location={FEATURED_EVENTS[0].location} coverPhoto={FEATURED_EVENTS[0].coverPhoto} date={FEATURED_EVENTS[0].date} type={FEATURED_EVENTS[0].type} attendees={FEATURED_EVENTS[0].attendees} />
                            </TouchableHighlight>
                        </View>
                        <View style={styles.slide}>
                            <TouchableHighlight style={styles.eventCardWrapper} onPress={() => {
                                Actions.event({ item: FEATURED_EVENTS[1], headers: this.state.headers });
                            }}>
                                <EventCard title={FEATURED_EVENTS[1].title} price={FEATURED_EVENTS[1].price} location={FEATURED_EVENTS[1].location} coverPhoto={FEATURED_EVENTS[1].coverPhoto} date={FEATURED_EVENTS[1].date} type={FEATURED_EVENTS[1].type} attendees={FEATURED_EVENTS[1].attendees} />
                            </TouchableHighlight>
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
                                    Actions.event({ item: item, headers: this.state.headers });
                                }}>
                                    <EventCard
                                        title={item.title}
                                        location={item.location}
                                        type={item.type}
                                        date={item.date}
                                        price={item.price}
                                        coverPhoto={item.coverPhoto}
                                        attendees={item.attendees}
                                        marginTop="20" />
                                </TouchableHighlight>
                            );
                        }}
                        keyExtractor={item => item.id}
                    >
                    </FlatList>
                </Animatable.View>
            </SafeAreaView >
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

export default Home;