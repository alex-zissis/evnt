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
import { faCalendar, faClock, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { Grid, Row, Col } from 'react-native-easy-grid';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const highlight = 'orange';
const iconColor = '#8c92ac';


class Event extends React.Component {
    state = {

    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: this.props.item.coverPhoto }} style={styles.image}>

                    </Image>
                </View>

                <Text style={styles.title}>
                    {this.props.item.title}
                </Text>

                <Text style={[styles.subheading, styles.dateTimeHeading]}>Date/Time:</Text>
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

                <Text style={[styles.subheading, styles.locationHeading]}>Info:</Text>
                <View style={[styles.card, styles.infoCard]}>
                    <Text style={styles.iconInfo}>
                        {this.props.item.description}
                    </Text>
                    <Grid>
                        <Row>
                            <Col>

                            </Col>
                            <Col>

                            </Col>
                            <Col>

                            </Col>
                        </Row>
                    </Grid>
                </View>

                <Text style={[styles.subheading, styles.locationHeading]}>Location:</Text>
                <View style={[styles.card, styles.locationCard]}>
                    <View style={styles.row}>
                        <FontAwesomeIcon style={styles.icon} icon={faMapPin} />
                        <Text style={styles.iconInfo}>{this.props.item.location}</Text>
                    </View>
                </View>
            </SafeAreaView >
        );
    }
}

const styles = new StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center'
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
        marginTop: screenHeight / 32,
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'left',
        width: screenWidth,
        marginLeft: screenWidth * .1,
    },
    subheading: {
        marginTop: screenHeight / 32,
        width: screenWidth,
        textAlign: 'left',
        marginLeft: screenWidth * .2,
    },
    row: {
        flexDirection: 'row',
    },
    locationCard: {

    }
})

export default Event; 