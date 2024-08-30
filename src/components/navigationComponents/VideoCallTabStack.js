import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {AppColors, routes} from '../../utils/constants';
import Lagna from '../../screens/mainScreens/KundaliScreens/Lagna';
import Navamsa from '../../screens/mainScreens/KundaliScreens/Navamsa';
import Transit from '../../screens/mainScreens/KundaliScreens/Transit';
import Dasha from '../../screens/mainScreens/KundaliScreens/Dasha';
import Basic from '../../screens/mainScreens/KundaliScreens/Basic';
import KundaliTopTabStack from './KundaliTopTabStack';
import VideoCallScreen from '../../screens/mainScreens/CallScreens/VideoCallScreen';

const TopTabArr = [
  {name: routes.VideoCall_Screen, component: VideoCallScreen},
  {name: routes.Kundali_Top_Tab_Stack, component: KundaliTopTabStack},
];

const VideoCallTabStack = ({navigation, route}) => {
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
export default VideoCallTabStack;
