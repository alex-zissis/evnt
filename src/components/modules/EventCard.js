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

import { Col, Row, Grid } from "react-native-easy-grid";
import { Actions } from 'react-native-router-flux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMapPin, faCalendar, faDollarSign, faUsers } from '@fortawesome/free-solid-svg-icons'

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const highlight = 'orange';
const iconColor = '#8c92ac';

class EventCard extends React.Component {
    state = {
        email: '',
        validEmail: false
    }

    styles = StyleSheet.create({
        container: {
            flex: 1,
            width: "100%",
            height: 170,
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

            flexDirection: 'row',
            marginTop: this.props.marginTop ? Number(this.props.marginTop) : 0,
        },
        textContainer: {
            flex: 4,
            borderBottomRightRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: 'white',
            padding: 5
        },
        imageContainer: {
            flex: 3,
            borderLeftWidth: 6,
            borderBottomWidth: 6,
            borderTopWidth: 6,
            borderColor: 'white',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
        },
        coverPhoto: {
            resizeMode: 'cover',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            ...StyleSheet.absoluteFillObject,
        },
        title: {
            fontSize: 22
        },
        grid: {
            marginTop: 15,

        },
        row: {
            // padding: 0,

        },
        col: {
            flexDirection: 'row',
        },
        infoScroll: {
            alignSelf: 'flex-start',
        },
        evntButtonContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        evntButton: {
            padding: 5,
            borderWidth: 2,
            overflow: 'hidden',
            borderRadius: 5
        }
    });

    render() {
        return (
            <View style={this.styles.container}>
                <View style={this.styles.imageContainer}>
                    <Image source={{ uri: this.props.coverPhoto }} style={this.styles.coverPhoto}></Image>
                </View>
                <View style={this.styles.textContainer}>
                    <Text style={this.styles.title}>{this.props.title}</Text>
                    <Grid style={this.styles.grid}>
                        <Row style={[this.styles.row,]}>
                            <ScrollView horizontal={true} directionalLockEnabled={true} showsHorizontalScrollIndicator={false}>
                                <FontAwesomeIcon icon={faMapPin} color={iconColor} /><Text style={this.styles.smallInfo}>{this.props.location}</Text>
                            </ScrollView>
                        </Row>
                        <Row style={[this.styles.row,]}>
                            <ScrollView horizontal={true} directionalLockEnabled={true} showsHorizontalScrollIndicator={false} contentContainerStyle={this.styles.infoScroll}>
                                <View style={this.styles.col}>
                                    <FontAwesomeIcon icon={faCalendar} color={iconColor} /><Text> {this.props.date}</Text>
                                </View>
                                {this.props.price > 0 &&
                                    < View style={[this.styles.col, { marginLeft: 7 }]}>
                                        <FontAwesomeIcon icon={faDollarSign} color={iconColor} /><Text> {this.props.price}</Text>
                                    </View>
                                }
                                <View style={[this.styles.col, { marginLeft: 7 }]}>
                                    <FontAwesomeIcon icon={faUsers} color={iconColor} /><Text> {this.props.attendees}</Text>
                                </View>
                            </ScrollView>
                        </Row>
                        <Row style={this.styles.row}>
                            <View style={this.styles.evntButtonContainer}>
                                <TouchableHighlight style={{ marginRight: 5 }}>
                                    <Text style={this.styles.evntButton}>Going</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={{ marginLeft: 5 }}>
                                    <Text style={this.styles.evntButton}>Interested</Text>
                                </TouchableHighlight>
                            </View>

                        </Row>
                    </Grid>
                </View>
            </View >
        )
    }
}



export default EventCard;