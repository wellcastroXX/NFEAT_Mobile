import "./navigation/ignoreWarnings";
import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { Badge } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator  } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import StartPage from './navigation/screens/Start';
import LoginPage from './navigation/authentication/Login';
import RegisterPage from './navigation/authentication/Register';
import Step1Page from './navigation/steps/step1';
import Step2Page from './navigation/steps/step2';
import Step3Page from './navigation/steps/step3';
import DetailsPage from './navigation/screens/details';
//screen
import DashboardPage from './navigation/screens/Dashboard';
import ExplorePage from './navigation/screens/Explore';
import NewPage from './navigation/screens/New';
import NFEATPage from './navigation/screens/NFEAT';
import ProfilePage from './navigation/screens/Profile';
import AccountPage from './navigation/screens/account';
import { Alert } from "react-native";
const dash = 'Dashboard';
const explore = 'Explore';
const newArt = 'New';
const nfeat = 'NFEAT';
const profile = 'Profile';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

//Send Notification to APP
//APP-ID: 43d93473-a371-4d83-8b59-14503c0905dc


function MainContainer() {
  const [notif, setNotif] = useState(false);
  const Token = AsyncStorage.getItem('NewNotification').then((response) => {
    console.log(response);
    if(response === '1'){
     const notif = true;
     setNotif(notif)
    }else{
      const notif = false;
      setNotif(notif)
    }
  });
  return(
    //Hight tabbar on iOS: height: 82, icons: width: 42, height: 42, top: 12
    <Tab.Navigator
        initialRouteName={dash}
        screenOptions={({ route }) => ({
        headerShown: false,
        /* headerStyle: { backgroundColor: '#000', height: 0, shadowColor: "transparent", }, */
        tabBarStyle: { 
          height: 54,
          backgroundColor: '#141414', 
          position: 'absolute', borderTopWidth: 0,
          borderColor: '#141414', left: 20, right: 20, bottom: 25,
          borderRadius: 20,
          elevation: 0,
        },
        tabBarItemStyle:{
          borderRadius:20,
        },
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if(rn === dash) {
              return <><Image source={require('./assets/imgs/white/png/gallery.png')} style={{ width: 38, height: 38, top: 24}} />{notif && <Badge style={{position: 'absolute'}}>1</Badge>}</>
            } else if (rn === explore) {
              return <Image source={require('./assets/imgs/white/png/search.png')} style={{width: 38, height: 38, top: 24}}/>
                //iconName = focused ? 'Picture-outline' : 'Picture-outline';
            } else if (rn === newArt) {
              return <Image source={require('./assets/imgs/outros/Add.png')} style={{width: 56, height: 56, top: -26, borderRadius: 100, position: 'absolute'}}/>
                //iconName = focused ? 'pluscircle-outline' : 'pluscircle-outline';
            } else if (rn === nfeat) {
              return <Image source={require('./assets/imgs/white/png/nfeat-project.png')} style={{width: 38, height: 38, top: 24}}/>
                //iconName = focused ? '' : '';
            } else if (rn === profile) {
              return <Image source={require('./assets/imgs/white/png/user.png')} style={{width: 38, height: 38, top: 24}}/>
                //iconName = focused ? '' : '';
            }

            /* return <Ion name={iconName} size={size} color={color}/> */
        },})}
        tabBarOptions={{
            activeTintColor: 'transparent',
            inactiveTintColor: 'transparent',
            labelStyle: {paddingBottom: 10, fontSize: 10},
            activeBackgroundColor: '#141414', borderRadius: 20,
            inactiveBackgroundColor: '#141414',
            style: {
              backgroundColor: '#141414',
              paddingBottom: 0,
            }
        }}
        >
        
        <Tab.Screen name={dash} component={DashboardPage} />
        <Tab.Screen name={explore} component={ExplorePage} />
        <Tab.Screen name={newArt} component={NewPage} />
        <Tab.Screen name={nfeat} component={NFEATPage} />
        <Tab.Screen name={profile} component={ProfilePage} />

    </Tab.Navigator>
  )
}

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    /* messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    })

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log(remoteMessage);
    });
    return unsubscribe; */
  }, []);
  
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start' screenOptions={{headerShown: false}}>
        <Stack.Group>       
            <Stack.Screen name="Start" component={StartPage} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={RegisterPage} />
            <Stack.Screen name="StepOne" component={Step1Page} />
            <Stack.Screen name="StepTwo" component={Step2Page} />
            <Stack.Screen name="StepThree" component={Step3Page} />
            <Stack.Screen name="Details" component={DetailsPage} />
            <Stack.Screen name="Account" component={AccountPage}/>
            <Stack.Screen
              name="MainContainer"
              component={MainContainer}
              options={{ headerShown: false }}
            />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App