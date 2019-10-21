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
            flex: 1,
            width: "100%",
            height: 170,
            borderRadius: 10,
            // overflow: 'hidden',
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
            marginTop: 10,
            borderWidth: 1,
            borderColor: 'black'
        },
        row: {
            borderWidth: 1,
            borderColor: 'black',
            padding: 0,
        },
        col: {
            borderWidth: 1,
            borderColor: 'black'
        }
    });

    render() {
        console.log(this.props.coverPhoto)
        return (
            <View style={this.styles.container}>
                <View style={this.styles.imageContainer}>
                    <Image source={{ uri: this.props.coverPhoto }} style={this.styles.coverPhoto}></Image>
                </View>
                <View style={this.styles.textContainer}>
                    {/* <Text>
                        {this.props.title}{'\n'}
                        <Text>
                            {this.props.type}{'\n'}
                            {this.props.date}{'\n'}
                            {this.props.price}
                        </Text>
                    </Text> */}
                    <Text style={this.styles.title}>{this.props.title}</Text>
                    <Grid style={this.styles.grid}>
                        <Row style={this.styles.row}>
                            <Text style={this.styles.smallInfo}>{this.props.location}</Text>
                        </Row>
                        <Row style={this.styles.row}>
                            <Col style={this.styles.col}>
                                <Text>{this.props.date}</Text>
                            </Col>
                            <Col style={this.styles.col}>
                                <Text>{this.props.price}</Text>
                            </Col>
                        </Row>
                        <Row style={this.styles.row}>
                            <Col style={this.styles.col}>

                            </Col>
                            <Col style={this.styles.col}>

                            </Col>
                        </Row>
                    </Grid>
                </View>
            </View>
        )
    }
}



export default EventCard;