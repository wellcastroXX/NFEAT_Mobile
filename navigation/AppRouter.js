import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator  } from "@react-navigation/native-stack";
import StartPage from "./screens/Start";
import LoginPage from "./authentication/Login";
import RegisterPage from "./authentication/Register";
import Step1Page from "./steps/step1";
import Step2Page from "./steps/step2";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Group>
                    <Stack.Screen name="Start" component={StartPage} />
                    <Stack.Screen name="Login" component={LoginPage} />
                    <Stack.Screen name="Register" component={RegisterPage} />
                    <Stack.Screen name="StepOne" component={Step1Page} />
                    <Stack.Screen name="StepTwo" component={Step2Page} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default StackNavigator;