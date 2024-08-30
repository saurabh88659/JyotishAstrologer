import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AppColors, routes} from '../utils/constants';
import Home from '../screens/mainScreens/HomeScreens/Home';
import Wallet from '../screens/mainScreens/WalletScreens/Wallet';
import WaitList from '../screens/mainScreens/OrdersScreens/WaitList';
import Offer from '../screens/mainScreens/Offers/Offer';
import Settings from '../screens/mainScreens/SetttingScreens/Settings';
import Profile from '../screens/mainScreens/ProfileScreens/Profile';
import CustomDrawerContent from '../components/navigationComponents/CustomDrawerContent';
import AppIcon, {Icons} from '../libComponents/AppIcon';
import {View} from 'react-native-animatable';
import Notice from '../screens/mainScreens/NoticeScreens/Notice';
import More from '../screens/mainScreens/MoreScreens/More';

const drawerData = [
  {
    name: routes.Home,
    component: Home,
    drawerLabel: 'Home',
    iconType: Icons.Foundation,
    iconName: 'home',
    iconSize: 24,
  },
  // {
  //   name: routes.Orders,
  //   component: Orders,
  //   drawerLabel: 'Orders',
  //   iconType: Icons.FontAwesome,
  //   iconName: 'history',
  //   iconSize: 22,
  // },
  {
    name: routes.WaitList,
    component: WaitList,
    drawerLabel: 'Waitlist',
    iconType: Icons.FontAwesome,
    iconName: 'history',
    iconSize: 22,
  },
  //   {
  //     name: routes.MainCall,
  //     component: MainCall,
  //     drawerLabel: 'Call',
  //     iconType: Icons.FontAwesome6,
  //     iconName: 'phone-volume',
  //     iconSize: 18,
  //   },
  //   {
  //     name: routes.MainChat,
  //     component: MainChat,
  //     drawerLabel: 'Chat',
  //     iconType: Icons.Ionicons,
  //     iconName: 'chatbubbles-sharp',
  //     iconSize: 22,
  //   },
  {
    name: routes.Wallet,
    component: Wallet,
    drawerLabel: 'Wallet',
    iconType: Icons.Entypo,
    iconName: 'wallet',
    iconSize: 23,
  },

  // {
  //   name: routes.WaitList,
  //   component: WaitList,
  //   drawerLabel: 'Waitlist',
  //   iconType: Icons.FontAwesome,
  //   iconName: 'history',
  //   iconSize: 22,
  // },

  // {
  //   name: routes.Performance_Screens,
  //   component: PerformanceScreens,
  //   drawerLabel: 'Performance',
  //   iconType: Icons.Foundation,
  //   iconName: 'graph-bar',
  //   iconSize: 23,
  // },
  {
    name: routes.Offer,
    component: Offer,
    drawerLabel: 'Offer',
    iconType: Icons.FontAwesome5,
    iconName: 'gift',
    iconSize: 21,
  },
  {
    name: routes.Notice,
    component: Notice,
    drawerLabel: 'Notice',
    iconType: Icons.Ionicons,
    iconName: 'mail',
    iconSize: 22,
  },
  // {
  //   name: routes.Followers,
  //   component: Followers,
  //   drawerLabel: 'Followers',
  //   iconType: Icons.Fontisto,
  //   iconName: 'persons',
  //   iconSize: 20,
  // },
  // {
  //   name: routes.MyReviews,
  //   component: MyReviews,
  //   drawerLabel: 'My Reviews',
  //   iconType: Icons.AntDesign,
  //   iconName: 'star',
  //   iconSize: 21,
  // },
  {
    name: routes.Profile,
    component: Profile,
    drawerLabel: 'Profile',
    iconType: Icons.Ionicons,
    iconName: 'person-sharp',
    iconSize: 23,
  },
  {
    name: routes.Settings,
    component: Settings,
    drawerLabel: 'Settings',
    iconType: Icons.Ionicons,
    iconName: 'settings',
    iconSize: 22,
  },
  {
    name: routes.More,
    component: More,
    drawerLabel: 'More',
    iconType: Icons.MaterialCommunityIcons,
    iconName: 'view-grid-plus',
    iconSize: 24,
  },
];

const DrawerStack = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        lazy: true,
        headerShown: false,
        drawerActiveBackgroundColor: AppColors.white,
        drawerActiveTintColor: AppColors.primary,
        drawerInactiveTintColor: AppColors.black,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {/* these screen only render when pass DrawerItemList in CustomDrawerContent  */}
      {drawerData &&
        drawerData.map((item, index) => {
          return (
            <Drawer.Screen
              key={index}
              name={item.name}
              component={item.component}
              options={{
                swipeEdgeWidth: 30,
                drawerType: 'back',
                drawerLabelStyle: {marginBottom: 0, fontWeight: 'bold'},
                drawerLabel: item.drawerLabel,
                drawerIcon: ({color}) => {
                  return (
                    <View style={{width: 25, marginRight: -18}}>
                      <AppIcon
                        type={item.iconType}
                        name={item.iconName}
                        size={item.iconSize}
                        color={color}
                      />
                    </View>
                  );
                },
              }}
            />
          );
        })}
    </Drawer.Navigator>
  );
};
export default DrawerStack;
