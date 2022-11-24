import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

//screen
import DashboardPage from '../navigation/screens/Dashboard';
import ExplorePage from '../navigation/screens/Explore';
import NewPage from '../navigation/screens/New';
import NFEATPage from '../navigation/screens/NFEAT';
import ProfilePage from '../navigation/screens/Profile';
import StackNavigator from './AppRouter';
const dash = 'Dashboard';
const explore = 'Explore';
const newArt = 'New';
const nfeat = 'NFEAT';
const profile = 'Profile';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return (
        <NavigationContainer>
            <StackNavigator/>
            <Tab.Navigator
            initialRouteName={dash}
            screenOptions={({ route }) => ({
                tabBarStyle: { height: 82 },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if(rn === dash) {
                        iconName = focused ? 'home' : 'home';
                    } else if (rn === explore) {
                        iconName = focused ? '' : '';
                    } else if (rn === newArt) {
                        iconName = focused ? '' : '';
                    } else if (rn === nfeat) {
                        iconName = focused ? '' : '';
                    } else if (rn === profile) {
                        iconName = focused ? '' : '';
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
                },})}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'grey',
                    labelStyle: {paddingBottom: 10, fontSize: 10}
                }}
                >
                
                <Tab.Screen name={dash} component={DashboardPage} />
                <Tab.Screen name={explore} component={ExplorePage} />
                <Tab.Screen name={newArt} component={NewPage} />
                <Tab.Screen name={nfeat} component={NFEATPage} />
                <Tab.Screen name={profile} component={ProfilePage} />

            </Tab.Navigator>
        </NavigationContainer>
    )
}