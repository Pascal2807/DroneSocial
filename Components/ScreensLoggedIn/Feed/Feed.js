import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { f, database, auth, storage } from '../../../Config/Config';

class Feed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            photo_feed: [],
            refresh: false,
            loading: true
        }
    }

    componentDidMount = () => {
        this.loadFeed();
    }

    pluralCheck = (s) => {
        if (s == 1) {
            return 'ago';
        }
        else {
            return 's ago';
        }
    }

    timeConverter = (timestamp) => {
        var a = new Date(timestamp * 1000);
        var seconds = Math.floor((new Date() - a) / 1000);
        var interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
            return interval + ' year' + this.pluralCheck(interval);
        }
        var interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + ' month' + this.pluralCheck(interval);
        }
        var interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + ' day' + this.pluralCheck(interval);
        }
        var interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + ' hour' + this.pluralCheck(interval);
        }
        var interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + ' minute' + this.pluralCheck(interval);
        }
        return Math.floor(seconds) + ' second' + this.pluralCheck(interval);
    }

    loadFeed = () => {
        this.setState({
            refresh: true,
            photo_feed: []
        })

        var that = this;

        database.ref('photos').orderByChild('posted').once('value').then(function (snapshot) {
            const exists = (snapshot.val() !== null);
            if (exists) data = snapshot.val();
            var photo_feed = that.state.photo_feed;

            for (var photo in data) {
                var photoObj = data[photo];
                database.ref('users').child(photoObj.author).child('username').once('value').then(function (snapshot) {
                    const exists = (snapshot.val() !== null);
                    if (exists) data = snapshot.val();
                    photo_feed.push({
                        id: photo,
                        url: photoObj.url,
                        caption: photoObj.caption,
                        posted: that.timeConverter(photoObj.posted),
                        author: data
                    });
                    that.setState({
                        refresh: false,
                        loading: false
                    })
                }).catch(error => console.log(error, '1. Problem'));
            }
        }).catch(error => console.log(error, '2. Problem'));
    }

    loadNew = () => {
        this.loadFeed();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Text>Feed</Text>
                </View>

                {this.state.loading == true ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Loading...</Text></View>
                ) : (
                        <FlatList refreshing={this.state.refresh} onRefresh={this.loadNew} data={this.state.photo_feed} keyExtractor={(item, index) => index.toString()} style={{ flex: 1, backgroundColor: '#eee' }}
                            renderItem={({ item, index }) => (
                                <View key={index} style={{ width: '100%', overflow: 'hidden', marginBottom: 5, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'grey' }}>
                                    <View style={{ padding: 5, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text>{item.posted}</Text>
                                        <Text>{item.author}</Text>
                                    </View>
                                    <View>
                                        <Image source={{ uri: item.url }} style={{ resizeMode: 'cover', width: '100%', height: 275 }} />
                                    </View>
                                    <View style={{ padding: 5 }}>
                                        <Text>{item.caption}</Text>
                                        <Text style={{ marginTop: 10, textAlign: 'center' }}>View Comments...</Text>
                                    </View>
                                </View>
                            )} />
                    )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 70,
        paddingTop: 30,
        backgroundColor: 'white',
        borderColor: 'lightgrey',
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',


    }
});

export default Feed;