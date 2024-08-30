import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {AppColors, routes} from '../../utils/constants';
import Lagna from '../../screens/mainScreens/KundaliScreens/Lagna';
import Navamsa from '../../screens/mainScreens/KundaliScreens/Navamsa';
import Transit from '../../screens/mainScreens/KundaliScreens/Transit';
import Dasha from '../../screens/mainScreens/KundaliScreens/Dasha';
import Basic from '../../screens/mainScreens/KundaliScreens/Basic';
import AppHeader from '../../libComponents/AppHeader';
import UserChatScreen from '../../screens/mainScreens/ChatScreens/UserChatScreen';
import KundaliTopTabStack from './KundaliTopTabStack';
import CallWithUser from '../../screens/mainScreens/CallScreens/CallWithUser';

const TopTabArr = [
  {name: routes.Call_With_User, component: CallWithUser},
  {name: routes.Kundali_Top_Tab_Stack, component: KundaliTopTabStack},
];

const CallTabStack = ({navigation, route}) => {
  const user = route?.params?.user;
  const Tab = createMaterialTopTabNavigator();
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {display: 'none'},
          tabBarScrollEnabled: true,
          tabBarItemStyle: {width: 'auto'},
          tabBarLabelStyle: {
            fontSize: 15.5,
            textTransform: 'none',
            fontWeight: '800',
          },
          tabBarIndicatorStyle: {backgroundColor: AppColors.primary, height: 0},
        }}>
        {TopTabArr.map(({name, component}) => {
          return (
            <Tab.Screen
              name={name}
              component={component}
              initialParams={user}
            />
          );
        })}
      </Tab.Navigator>
    </>
  );
};
export default CallTabStack;
