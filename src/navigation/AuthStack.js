import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routes} from '../utils/constants';
import SignUp from '../screens/authScreens/SignUp';
import Splash from '../screens/authScreens/Splash';
import Login from '../screens/authScreens/Login';
import OtpVerification from '../screens/authScreens/OtpVerification';
import CreateProfile from '../screens/authScreens/CreateProfile';
import UnderReviewScreen from '../screens/authScreens/UnderReviewScreen';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  const AuthScreensArr = [
    {name: routes.Splash, component: Splash},
    {name: routes.login, component: Login},
    {name: routes.SignUp, component: SignUp},
    {name: routes.Create_Profile, component: CreateProfile},
    {name: routes.UnderReview_Screen, component: UnderReviewScreen},
    {name: routes.Otp_Verification, component: OtpVerification},
  ];
  return (
    <Stack.Navigator
      initialRouteName={routes.Splash}
      screenOptions={{headerShown: false}}>
      {AuthScreensArr.map(({name, component}) => {
        return <Stack.Screen name={name} component={component} />;
      })}
    </Stack.Navigator>
  );
};
export default AuthStack;
