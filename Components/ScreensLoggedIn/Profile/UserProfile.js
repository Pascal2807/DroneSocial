import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { f, auth, database, storage } from '../../../Config/Config';


class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            username: '',
            name: '',
            avatar: ''
        }
    }

    checkParams = () => {
        var params = this.props.navigation.state.params;
        if (params) {
            if (params.userId) {
                this.setState({
                    userId: params.userId
                });
                this.fetchUserInfo(params.userId);
            }
        }
    }

    fetchUserInfo = (userId) => {
        var that = this;
        database.ref('users').child(userId).child('username').once('value').then(function (snapshot) {
            const exists = (snapshot.val() !== null);
            if (exists) data = snapshot.val();
            that.setState({ username: data });
        }).catch(error => console.log(error));

        database.ref('users').child(userId).child('name').once('value').then(function (snapshot) {
            const exists = (snapshot.val() !== null);
            if (exists) data = snapshot.val();
            that.setState({ name: data });
        }).catch(error => console.log(error));

        database.ref('users').child(userId).child('avatar').once('value').then(function (snapshot) {
            const exists = (snapshot.val() !== null);
            if (exists) data = snapshot.val();
            that.setState({
                avatar: data,
                loaded: true
            });
        }).catch(error => console.log(error));
    }

    componentDidMount = () => {
        this.checkParams();
    }

    moveToUpload = () => {
        this.props.moveToUpload();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.loaded == false ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Loading...</Text>
                    </View>
                ) : (
                        <View style={{ flex: 1 }}>
                            <View style={styles.header}>
                                <Text>Profile</Text>
                            </View>
                            <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', paddingVertical: 10 }}>
                                <Image source={{ uri: this.state.avatar }} style={{ marginLeft: 10, width: 100, height: 100, borderRadius: 50 }} />
                                <View style={{ marginRight: 10 }}>
                                    <Text>{this.state.name}</Text>
                                    <Text>{this.state.username}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green' }}>
                            </View>
                        </View>
                    )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 45,
        paddingTop: 10,
        backgroundColor: 'white',
        borderColor: 'lightgrey',
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',


    }
});

export default UserProfile;