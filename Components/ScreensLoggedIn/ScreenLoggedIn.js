import Feed from './Feed/Feed';
import Upload from './Upload/Upload';
import Profile from './Profile/Profile';
import UserProfile from './Profile/UserProfile';
import Comments from './Comments/Comments';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

const AppTabNavigator = createMaterialTopTabNavigator({
    Feed: {
        screen: Feed,
        navigationOptions: {
            tabBarLabel: 'Feed',
            tabBarIcon: ({ tintcolor }) => (
                <Icon name='ios-home' color={tintcolor} size={24} />
            )
        }
    },
    Upload: {
        screen: Upload,
        navigationOptions: {
            tabBarLabel: 'Upload',
            tabBarIcon: ({ tintcolor }) => (
                <Icon name='ios-home' color={tintcolor} size={24} />
            )
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintcolor }) => (
                <Icon name='ios-home' color={tintcolor} size={24} />
            )
        }
    }
}, {
        initialRouteName: 'Feed',
        //order: ['Feed', 'Upload', 'Profile'],
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: 'black',
            inactiveTintColor: 'black',
            style: {
                backgroundColor: 'white'
            },
            indicatorStyle: {
                height: 0
            }
        }
    })

const MainStack = createStackNavigator(
    {
        Home: { screen: AppTabNavigator },
        User: { screen: UserProfile },
        Comments: { screen: Comments }
    }, {
        initialRouteName: 'Home',
        mode: 'modal',
        headerMode: 'none'
    }
)
const AppContainer = createAppContainer(MainStack);

class ScreenLoggedIn extends React.Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <AppContainer />
            </SafeAreaView>
        );
    }
}
export default ScreenLoggedIn;