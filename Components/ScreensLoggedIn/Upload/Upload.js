import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { f, database, auth, storage } from '../../../Config/Config';

class Upload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false
        }
    }

    componentDidMount = () => {
        var that = this;
        f.auth().onAuthStateChanged(function (user) {
            if (user) {
                //Logged in
                that.setState({
                    loggedIn: true
                });
            }
            else {
                //Not logged in
                that.setState({
                    loggedIn: false
                });
            }
        });
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {this.state.loggedIn == true ? (
                    <Text>Profile</Text>
                ) : (
                        <View>
                            <Text>You are not logged in!</Text>
                        </View>
                    )}
            </View>
        );
    }
}

export default Upload;