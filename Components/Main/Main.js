import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenLoggedIn from '../ScreensLoggedIn/ScreenLoggedIn';

class Main extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ScreenLoggedIn />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch'
    }
});

export default Main;