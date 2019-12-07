import React, { useCallback } from 'react'
import { View, Text } from 'react-native'
import { createNavigator, TabRouter, createAppContainer } from 'react-navigation'
import BottomNavigation, {
    FullTab
} from 'react-native-material-bottom-navigation'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import Feed from './Feed/Feed';
import Upload from './Upload/Upload';
import Profile from './Profile/Profile';

// Screens. Normally you would put these in separate files.
const FeedVariable = () => (
    <View>
        <Feed></Feed>
    </View>
)
const UploadVariable = () => (
    <View>
        <Upload></Upload>
    </View>
)
const ProfileVariable = () => (
    <View>
        <Profile></Profile>
    </View>
)

function AppTabView(props) {
    const tabs = [
        { key: 'Feed', label: 'Feed', barColor: '#00695C', icon: 'movie' },
        { key: 'Upload', label: 'Upload', barColor: '#6A1B9A', icon: 'music-note' },
        { key: 'Profile', label: 'Profile', barColor: '#1565C0', icon: 'book' }
    ]

    const { navigation, descriptors } = props
    const { routes, index } = navigation.state
    const activeScreenName = routes[index].key
    const descriptor = descriptors[activeScreenName]
    const ActiveScreen = descriptor.getComponent()

    const handleTabPress = useCallback(
        newTab => navigation.navigate(newTab.key),
        [navigation]
    )

    return (
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActiveScreen navigation={descriptor.navigation} />
            </View>

            <BottomNavigation
                tabs={tabs}
                activeTab={activeScreenName}
                onTabPress={handleTabPress}
                renderTab={({ tab, isActive }) => (
                    <FullTab
                        isActive={isActive}
                        key={tab.key}
                        label={tab.label}
                        renderIcon={() => <Icon name={tab.icon} size={24} color="white" />}
                    />
                )}
            />
        </View>
    )
}

const AppTabRouter = TabRouter({
    Feed: { screen: FeedVariable },
    Upload: { screen: UploadVariable },
    Profile: { screen: ProfileVariable }
})

const Navigator = createNavigator(AppTabView, AppTabRouter, {});
const ScreenLoggedIn = createAppContainer(Navigator);

export default ScreenLoggedIn;