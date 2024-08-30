import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/mainScreens/HomeScreens/Home';
import Order from '../../screens/mainScreens/OrdersScreens/Orders';
import Wallet from '../../screens/mainScreens/WalletScreens/Wallet';
import Notice from '../../screens/mainScreens/NoticeScreens/Notice';
import Profile from '../../screens/mainScreens/ProfileScreens/Profile';
import {routes} from '../../utils/constants';
import AppIcon, {Icons} from '../../libComponents/AppIcon';
import WaitList from '../../screens/mainScreens/OrdersScreens/WaitList';

const BottomTabStack = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: {
          height: 65,
          paddingBottom: 5,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontWeight: '600',
        },
      }}>
      <Tab.Screen
        name={routes.HomeBottomTab}
        component={Home}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <AppIcon
              type={Icons.Entypo}
              name="home"
              size={size ? size : 22}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name={routes.WaitList}
        component={WaitList}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <AppIcon
              type={Icons.FontAwesome5}
              name="history"
              size={size ? size : 22}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name={routes.WalletBottomTab}
        component={Wallet}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <AppIcon
              type={Icons.Entypo}
              name="wallet"
              size={size ? size : 22}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name={routes.NoticeBottomTab}
        component={Notice}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <AppIcon
              type={Icons.AntDesign}
              name="pushpin"
              size={size ? size : 22}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name={routes.ProfileBottomTab}
        component={Profile}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <AppIcon
              type={Icons.Ionicons}
              name="person"
              size={size ? size : 22}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabStack;
