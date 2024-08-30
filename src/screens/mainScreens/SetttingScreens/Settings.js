import {StyleSheet, View, Switch, Share} from 'react-native';
import React, {useState} from 'react';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppText from '../../../libComponents/AppText';
import AppContainer from '../../../libComponents/AppContainer';
import {AppColors, routes} from '../../../utils/constants';
import AppHeader from '../../../libComponents/AppHeader';
import AppIcon, {Icons} from '../../../libComponents/AppIcon';
import HomeCard from '../../../components/HomeCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import AppModal from '../../../libComponents/AppModal';

const TitleCard = ({title, iconType, IconName, IconSize, isDot}) => {
  return (
    <View
      style={{
        backgroundColor: '#f2f2f2',
        padding: 15,
        borderRadius: 6,
        marginBottom: 14,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={{width: 35}}>
        {isDot && (
          <View
            style={{
              position: 'absolute',
              height: 10,
              width: 10,
              borderRadius: 6,
              backgroundColor: AppColors.red,
              zIndex: 1,
              right: 12,
            }}></View>
        )}
        <AppIcon
          type={iconType}
          name={IconName}
          size={IconSize}
          color={AppColors.black}
        />
      </View>
      <AppText style={{fontSize: 17, fontWeight: '700', marginLeft: 8}}>
        {title}
      </AppText>
    </View>
  );
};

const Settings = () => {
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(true);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleLogout = async () => {
    AsyncStorage.clear();
    dispatch(setLoggedIn(false));
    setIsLogoutModalVisible(false);
  };
  const cardArr = [
    // {
    //   IconType: Icons.AntDesign,
    //   IconName: 'mobile1',
    //   label: 'Update Phone Number',
    //   backgroundColor: '#8dcd4e',
    //   ScreenName: routes.Update_Phone_Number,
    //   iconSize: 28,
    // },
    {
      IconType: Icons.FontAwesome,
      IconName: 'bank',
      label: 'Bank details',
      backgroundColor: '#b1036e',
      ScreenName: routes.Bank_Details,
      iconSize: 26,
    },
    {
      IconType: Icons.AntDesign,
      IconName: 'youtube',
      label: 'Training Reels',
      backgroundColor: 'red',
      ScreenName: routes.View_All_Training_Reels,
      iconSize: 29,
    },
    // {
    //   IconType: Icons.Ionicons,
    //   IconName: 'receipt',
    //   label: 'Pay Slip',
    //   backgroundColor: '#393939',
    //   ScreenName: routes.PaySlip,
    //   iconSize: 28,
    // },
    {
      IconType: Icons.MaterialIcons,
      IconName: 'support-agent',
      label: 'Help & Support',
      backgroundColor: '#393939',
      ScreenName: routes.HelpAndSupport,
      iconSize: 40,
    },
    {
      IconType: Icons.FontAwesome,
      IconName: 'share-alt',
      label: 'Refer',
      backgroundColor: '#fc8885',
      ScreenName: false,
      iconSize: 26,
      onPress: () => shareLink(),
    },
    {
      IconType: Icons.MaterialIcons,
      IconName: 'rule',
      label: 'Terms & Conditions',
      backgroundColor: '#f2980c',
      ScreenName: routes.Terms_And_Conditions,
      iconSize: 30,
    },
    {
      IconType: Icons.Entypo,
      IconName: 'shield',
      label: 'Privacy Policy',
      backgroundColor: '#8dcd4e',
      ScreenName: routes.PrivacyPolicy,
      iconSize: 28,
    },

    {
      IconType: Icons.MaterialCommunityIcons,
      IconName: 'logout',
      label: 'Logout',
      backgroundColor: '#c9dd02',
      ScreenName: false,
      iconSize: 30,
      onPress: () => setIsLogoutModalVisible(!isLogoutModalVisible),
    },
  ];

  const shareLink = async () => {
    const result = await Share.share({
      message: 'Check out this awesome app! URL:https://Jytish.com',
      url: 'https://Jytish.com',
      title: 'Jytis-Astrologer',
    });
  };

  return (
    <AppContainer>
      <AppHeader screen={'Settings'} />
      <View style={{paddingHorizontal: 15, backgroundColor: AppColors.white}}>
        {/* <View
          style={{
            backgroundColor: '#dddd',
            padding: 10,
            borderRadius: 6,
            marginBottom: 14,
            width: '100%',
            marginTop: 10,
          }}>
          <AppText style={{fontSize: 18, fontWeight: '700'}}>Privacy</AppText>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: 5,
            }}>
            <AppText style={{width: '80%'}}>
              Show my name in Review section of User profile.
            </AppText>
            <Switch
              trackColor={{false: AppColors.dark_gray, true: 'green'}}
              thumbColor={isEnabled ? AppColors.white : AppColors.white}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View> */}
        {/* <TitleCard
          iconType={Icons.FontAwesome6}
          IconName={'user-shield'}
          IconSize={21}
          title={'Manage Your Privacy'}
        />
        <TitleCard
          iconType={Icons.MaterialCommunityIcons}
          IconName={'bell'}
          IconSize={23}
          isDot={true}
          title={'Notifications'}
        />
        <TitleCard
          iconType={Icons.Ionicons}
          IconName={'document-text'}
          IconSize={23}
          title={'Terms and conditions'}
        />
        <TitleCard
          iconType={Icons.Entypo}
          IconName={'shield'}
          IconSize={23}
          title={'Privacy Policy'}
        />
        <TitleCard
          iconType={Icons.MaterialCommunityIcons}
          IconName={'logout'}
          IconSize={24}
          title={'Logout'}
        />

        <TitleCard
          iconType={Icons.FontAwesome6}
          IconName={'user-xmark'}
          IconSize={21}
          title={'Delete my account'}
          icon="delete"
        /> */}

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 5,
            paddingVertical: 10,
            justifyContent: 'space-between',
            marginBottom: 5,
            // marginTop: 5,
          }}>
          {cardArr.map((item, key) => (
            <HomeCard
              onPress={item?.onPress}
              data={item}
              isImage={item?.isImage}
              source={item.source}
            />
          ))}
        </View>
      </View>
      <AppModal
        titleLeftButton="Cancel"
        titileRightButton="Logout"
        heading="Are You sure you want to logout?"
        isModalVisible={isLogoutModalVisible}
        onleftButtonClick={() => setIsLogoutModalVisible(!isLogoutModalVisible)}
        onRightButtonCLick={() => handleLogout()}
        onRequestClose={() => setIsLogoutModalVisible(!isLogoutModalVisible)}
      />
    </AppContainer>
  );
};
export default Settings;

const styles = StyleSheet.create({});
