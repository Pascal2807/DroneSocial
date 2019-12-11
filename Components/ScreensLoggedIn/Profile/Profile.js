import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { f, auth, database, storage } from '../../../Config/Config';


class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false
        }
        this.moveToUpload = this.moveToUpload.bind(this);
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

    moveToUpload = () => {
        this.props.moveToUpload();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.loggedIn == true ? (
                    <View style={{ flex: 1 }}>
                        <View style={styles.header}>
                            <Text>Profile</Text>
                        </View>
                        <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', paddingVertical: 10 }}>
                            <Image source={{ uri: 'https://api.adorable.io/avatars/285' }} style={{ marginLeft: 10, width: 100, height: 100, borderRadius: 50 }} />
                            <View style={{ marginRight: 10 }}>
                                <Text>Name</Text>
                                <Text>@Username</Text>
                            </View>
                        </View>
                        <View style={{ paddingBottom: 20, borderBottomWidth: 1 }}>
                            <TouchableOpacity style={{ marginTop: 10, marginHorizontal: 40, paddingVertical: 15, borderRadius: 20, borderColor: 'grey', borderWidth: 1.5 }}><Text style={{ textAlign: 'center', color: 'grey' }}>Logout</Text></TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: 10, marginHorizontal: 40, paddingVertical: 15, borderRadius: 20, borderColor: 'grey', borderWidth: 1.5 }}><Text style={{ textAlign: 'center', color: 'grey' }}>Edit Profile</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Upload') }} style={{ backgroundColor: 'grey', marginTop: 10, marginHorizontal: 40, paddingVertical: 35, borderRadius: 20, borderColor: 'grey', borderWidth: 1.5 }}><Text style={{ textAlign: 'center', color: 'white' }}>Upload Profil Picutre</Text></TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green' }}>
                        </View>
                    </View>
                ) : (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>You are not logged in!</Text>
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

export default Profile;