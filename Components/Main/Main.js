import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenLoggedIn from '../ScreensLoggedIn/ScreenLoggedIn';
import { f, auth, database, storage } from '../../Config/Config';

class Main extends React.Component {

    login = async () => {
        try {
            let user = await auth.signInWithEmailAndPassword("megerpascal@gmail.com", "hsvxd007");
        }
        catch (error) {
            console.log(error);
        }
    }

    constructor(props) {
        super(props);
        this.login();
    }

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
        flex: 1
    }
});

export default Main;