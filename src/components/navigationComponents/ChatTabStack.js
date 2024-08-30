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
const TopTabArr = [
  {name: routes.User_Chat_Screen, component: UserChatScreen},
  {name: routes.Kundali_Top_Tab_Stack, component: KundaliTopTabStack},
];
const ChatTabStack = ({Navigation, route}) => {
  const user = route?.params?.user;
  console.log('tab stack routes------------------', user);
  const Tab = createMaterialTopTabNavigator();
  // return null;
  return (
    <>
      {/* <AppHeader isDrawer={false} screen={'Kundali'} /> */}
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {display: 'none'}, // This hides the tab bar
          // tabBarShowLabel: false,
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
export default ChatTabStack;
