import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Icons} from '../../../libComponents/AppIcon';
import {routes} from '../../../utils/constants';
import HomeCard from '../../../components/HomeCard';
import AppStatusBar from '../../../libComponents/AppStatusBar';
import AppHeader from '../../../libComponents/AppHeader';
import AppContainer from '../../../libComponents/AppContainer';

const More = () => {
  const cardArr = [
    // {
    //   IconType: Icons.Feather,
    //   IconName: 'phone-call',
    //   label: 'Call',
    //   backgroundColor: '#8dcd4e',
    //   ScreenName: routes.Call_History,
    //   iconSize: 26,
    // },
    {
      IconType: Icons.AntDesign,
      IconName: 'gift',
      label: 'Pooja',
      backgroundColor: '#b1036e',
      ScreenName: routes.Pooja_Screen,
      iconSize: 30,
      isImage: true,
      source: require('../../../assets/Images/pooja.png'),
    },
    {
      IconType: Icons.MaterialCommunityIcons,
      IconName: 'file-document-edit-outline',
      label: 'Blog',
      backgroundColor: '#c9dd02',
      ScreenName: routes.Blog_Screen,
      iconSize: 31,
      // isImage: false,
    },
    // {
    //   IconType: Icons.Ionicons,
    //   IconName: 'wallet-outline',
    //   label: 'Wallet',
    //   backgroundColor: '#fc8885',
    //   ScreenName: routes.WalletBottomTab,
    //   iconSize: 29,
    // },
    // {
    //   IconType: Icons.FontAwesome5,
    //   IconName: 'clipboard-list',
    //   label: 'Waitlist',
    //   backgroundColor: '#3a261d',
    //   ScreenName: routes.WaitList,
    //   iconSize: 29,
    // },

    // {
    //   IconType: Icons.AntDesign,
    //   IconName: 'gift',
    //   label: 'Offers',
    //   backgroundColor: '#b1036e',
    //   ScreenName: routes.Offer,
    //   iconSize: 30,
    // },
    // {
    //   IconType: Icons.Entypo,
    //   IconName: 'star-outlined',
    //   label: 'My Reviews',
    //   backgroundColor: '#c9dd02',
    //   ScreenName: routes.MyReviews,
    //   iconSize: 30,
    // },
    // {
    //   IconType: Icons.Foundation,
    //   IconName: 'graph-bar',
    //   label: 'Performance',
    //   backgroundColor: '#f2980c',
    //   ScreenName: routes.Performance_Screens,
    //   iconSize: 30,
    // },
    // {
    //   IconType: Icons.Ionicons,
    //   IconName: 'settings-outline',
    //   label: 'Settings',
    //   backgroundColor: '#000000',
    //   ScreenName: routes.Settings,
    //   iconSize: 29,
    //   // isImage: false,
    // },
    // {
    //   IconType: Icons.AntDesign,
    //   IconName: 'youtube',
    //   label: 'Training Reels',
    //   backgroundColor: 'red',
    //   ScreenName: routes.View_All_Training_Reels,
    //   iconSize: 29,
    // },
    // {
    //   IconType: Icons.Ionicons,
    //   IconName: 'person-outline',
    //   label: 'Profile',
    //   backgroundColor: '#f2980c',
    //   ScreenName: routes.Profile,
    //   iconSize: 28,
    // },
    // {
    //   IconType: Icons.SimpleLineIcons,
    //   IconName: 'user-following',
    //   label: 'My Followers',
    //   backgroundColor: '#393939',
    //   ScreenName: routes.Followers,
    //   iconSize: 27,
    // },
    // {
    //   IconType: Icons.Entypo,
    //   IconName: 'star-outlined',
    //   label: 'My Reviews',
    //   backgroundColor: '#c9dd02',
    //   ScreenName: routes.MyReviews,
    //   iconSize: 30,
    // },
    {
      IconType: Icons.MaterialCommunityIcons,
      IconName: 'chat-plus',
      // label: 'Support Chat',
      label: 'Quick Chat',
      backgroundColor: '#fc8885',
      ScreenName: routes.Quick_Chat,
      iconSize: 29,
    },
    {
      IconType: Icons.MaterialCommunityIcons,
      IconName: 'star-shooting',
      // label: 'Support Chat',
      label: 'Top Astrologer',
      backgroundColor: 'gold',
      ScreenName: routes.Top_Astrologers,
      iconSize: 32,
    },
  ];

  return (
    <AppContainer>
      <AppStatusBar />
      <AppHeader isDrawer={false} screen={'Back'} />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 5,
          paddingVertical: 10,
          justifyContent: 'space-between',
          marginBottom: 5,
          paddingHorizontal: 8,
          // marginTop: 5,
        }}>
        {cardArr.map((item, key) => (
          <HomeCard data={item} isImage={item?.isImage} source={item.source} />
        ))}
      </View>
    </AppContainer>
  );
};

export default More;
const styles = StyleSheet.create({});
